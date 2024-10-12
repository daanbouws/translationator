import path from 'path'
import ts from 'typescript'
import { existsSync, readdirSync, statSync } from "fs";
const pwd = process.cwd()
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
import tsPlugin from 'acorn-typescript'
import fsExtraPackage from 'fs-extra'

const { mkdirSync, writeFileSync, removeSync } = fsExtraPackage
const excludeDirectories = ['translator', 'utils']
const excludeFileTypes = ['.test.ts']

const results: any = {}

await scanForTranslations()

export async function scanForTranslations() {
  const componentsDirectory = path.join(pwd, 'src')

  await searchFilesForTranslatorNodes(componentsDirectory)
  await writeTranslationFiles(pwd)
}

async function searchFilesForTranslatorNodes(directory: string) {
  const items = readdirSync(directory)
  for (const item of items) {
    const itemPath = path.join(directory, item)
    let ignore_item = false
    for (const excludeDirectory of excludeDirectories) {
      if (itemPath.includes(excludeDirectory)) {
        ignore_item = true
      }
    }

    if (statSync(itemPath).isDirectory() && !ignore_item) {
      const filesInFolder = readdirSync(itemPath)

      for (const file of filesInFolder) {
        if (file.endsWith('.ts') && !excludeFileTypes.some(type => file.includes(type))) {
          extractTranslations(path.join(itemPath, file))
        }
      }

      await searchFilesForTranslatorNodes(itemPath)
    }
  }
}

function extractTranslations(filePath: string) {
  const content = ts.sys.readFile(filePath)

  if (content === undefined) {
    throw Error(`File ${filePath} not found.`)
  }

  // @ts-ignore
  const acornTypescript = tsPlugin()
  const ast = acorn.Parser.extend(acornTypescript).parse(
    content,
    {
      sourceType: 'module',
      ecmaVersion: 'latest',
      locations: true
    }
  )

  walk.simple(ast, {
    NewExpression(node) {
      if (node.callee.type === 'Identifier' && node.callee.name === 'Translator') {
        // @ts-ignore
        results[node.arguments[0]?.value] = {
          value: '',
          // @ts-ignore
          defaultValue: node.arguments[1].properties.find(prop => prop.key.name === 'defaultValue')?.value?.value
        }

        // @ts-ignore
        if (node.arguments[1].properties.find(prop => prop.key.name === 'count')) {
          // @ts-ignore
          results[`${node.arguments[0]?.value}_plural`] = {
            value: '',
            // @ts-ignore
            defaultValue: node.arguments[1].properties.find(prop => prop.key.name === 'defaultPlural')?.value?.value
          }
        }
      }
    },
  })
}

async function writeTranslationFiles(directory: string) {
  const translationPackageDirectory = path.join(directory, 'gen_translation_template')

  await cleanup(translationPackageDirectory)
  await createDirectory(translationPackageDirectory)

  writeFileSync(
    `${translationPackageDirectory}/translation.json`,
    JSON.stringify(results)
  )
}

async function cleanup(directory: string) {
  const directoryExists = existsSync(directory)

  if (!directoryExists) {
    console.log(`Directory does not exist: ${directory}`)
    return
  }

  if (directoryExists) {
    console.log(`Removing directory: ${directory}`)

    try {
      removeSync(directory)
    } catch (err) {
      console.error(err)
    }
  }
}

async function createDirectory(directory: string) {
  console.log(`Create clean directory: ${directory}`)
  try {
    mkdirSync(directory)
  } catch (err) {
    console.error(err)
  }
}
