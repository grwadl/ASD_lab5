import { El } from './element'
import { ConsoleMessages } from './enums'
import { printTable } from './helpers'

class VertexList {
  list: El[] = []

  Add(el: El): void {
    this.list.push(el)
  }

  ToInnerStringOutput(): void {
    const toOutput = this.list.map((el) => el.toString())
    printTable(toOutput, ConsoleMessages.RESULT)
  }
}

export { VertexList }
