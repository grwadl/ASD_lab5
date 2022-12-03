import promptApi from 'prompt-sync'
import { MenuMessages } from './enums'
import { addVertex, inputGManually, printAllInputs, stringToArrNumber } from './helpers'
import type { MFO } from './types'
const prompt = promptApi({ sigint: true })
const fs = require('fs')
const path = require('path')
const PATH_TO_FILE = path.join('input.json')

const readInputFromFile = (): void => {
  const rawData = fs.readFileSync(PATH_TO_FILE)
  const { G, P }: MFO = JSON.parse(rawData)
  printAllInputs({ G })({ P })
  addVertex({ G, P })
}

const inputManually = (): void => {
  const count = Number(prompt(MenuMessages.QUANTITY))
  const res: MFO = { G: [], P: [] }
  inputGManually(res, count)
  const printP = printAllInputs(res)
  res.P = stringToArrNumber(prompt(MenuMessages.P_ARAY))
  printP(res)
  addVertex(res)
}

prompt(MenuMessages.MANUALLY_OR_AUTO) === 'm' ? inputManually() : readInputFromFile()
