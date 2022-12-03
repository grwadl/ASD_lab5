import { El } from './element'

class VertexList {
  list: El[] = []

  Add(el: El): void {
    this.list.push(el)
  }

  ToInnerStringOutput(): void {
    return this.list.forEach((el) => console.table(el.toString()))
  }
}

export { VertexList }
