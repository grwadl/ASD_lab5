import promptApi from 'prompt-sync'
import { ConsoleMessages, MenuMessages } from './enums'
import { convertToMFO, inputMainArrayManually, printTable, stringToArrNumber } from './helpers'
import type { MFO } from './types'
const prompt = promptApi({ sigint: true })
const fs = require('fs')
const path = require('path')
const PATH_TO_FILE = path.join('input.json')

const inputFromFile = (): void => {
  const rawData = fs.readFileSync(PATH_TO_FILE)
  const { main, additional }: MFO = JSON.parse(rawData)
  printTable(main)
  printTable(additional, ConsoleMessages.ADDITIONAL_ARRAY)
  convertToMFO({ main, additional })
}

const inputManually = (): void => {
  const count = Number(prompt(MenuMessages.QUANTITY))
  const res: MFO = { main: [], additional: [] }
  inputMainArrayManually(res, count)
  printTable(res.main)
  res.additional = stringToArrNumber(prompt(MenuMessages.ADDITIONAL_ARRAY))
  printTable(res.additional, ConsoleMessages.ADDITIONAL_ARRAY)
  convertToMFO(res)
}

prompt(MenuMessages.MANUALLY_OR_AUTO) === 'm' ? inputManually() : inputFromFile()
