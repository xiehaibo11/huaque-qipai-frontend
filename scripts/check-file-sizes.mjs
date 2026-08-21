#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const WARNING_LINE_LIMIT = 300
const HARD_LINE_LIMIT = 500
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue'])

function parseArguments(argv) {
  const argumentsByName = new Map()
  for (let index = 0; index < argv.length; index += 2) {
    const name = argv[index]
    const value = argv[index + 1]
    if (!name?.startsWith('--') || value === undefined) {
      throw new Error(`Invalid argument: ${name ?? ''}`)
    }
    argumentsByName.set(name, value)
  }
  return argumentsByName
}

function countLines(text) {
  if (text.length === 0) {
    return 0
  }
  const lineCount = text.split(/\r\n|\r|\n/).length
  return /(?:\r\n|\r|\n)$/.test(text) ? lineCount - 1 : lineCount
}

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(absolutePath)))
    } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(absolutePath)
    }
  }
  return files
}

async function loadBaseline(baselinePath) {
  if (!baselinePath) {
    return {}
  }
  return JSON.parse(await readFile(baselinePath, 'utf8'))
}

async function main() {
  const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
  const frontendRoot = path.resolve(scriptDirectory, '..')
  const argumentsByName = parseArguments(process.argv.slice(2))
  const root = path.resolve(argumentsByName.get('--root') ?? frontendRoot)
  const baseline = await loadBaseline(argumentsByName.get('--baseline'))
  const sourceRoot = path.join(root, 'src')
  const sourceFiles = await collectSourceFiles(sourceRoot)
  const warnings = []
  const baselineFiles = []
  const errors = []

  for (const absolutePath of sourceFiles.sort()) {
    const relativePath = path.relative(root, absolutePath).split(path.sep).join('/')
    const lineCount = countLines(await readFile(absolutePath, 'utf8'))
    if (lineCount > HARD_LINE_LIMIT) {
      const acceptedLineCount = baseline[relativePath]
      if (acceptedLineCount === undefined) {
        errors.push(`${relativePath}: ${lineCount} lines exceeds hard limit ${HARD_LINE_LIMIT}`)
      } else if (lineCount > acceptedLineCount) {
        errors.push(
          `${relativePath}: ${lineCount} lines grew beyond baseline ${acceptedLineCount}`,
        )
      } else {
        baselineFiles.push(
          `${relativePath}: ${lineCount} lines (hard limit ${HARD_LINE_LIMIT})`,
        )
      }
    } else if (lineCount > WARNING_LINE_LIMIT) {
      warnings.push(`${relativePath}: ${lineCount} lines`)
    }
  }

  for (const message of warnings) {
    console.log(`WARNING ${message}`)
  }
  for (const message of baselineFiles) {
    console.log(`BASELINE ${message}`)
  }
  for (const message of errors) {
    console.error(`ERROR ${message}`)
  }
  console.log(
    `Source file size check: ${sourceFiles.length} files, ` +
      `${warnings.length} warning(s), ${baselineFiles.length} baseline file(s), ` +
      `${errors.length} error(s)`,
  )
  return errors.length === 0 ? 0 : 1
}

try {
  process.exitCode = await main()
} catch (error) {
  console.error(`ERROR ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
}
