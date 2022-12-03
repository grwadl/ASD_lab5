import { ResultOutput } from './types'
import { Vertex } from './vertex'

class El {
  #next!: El

  vertex: Vertex

  constructor(vertex: Vertex) {
    this.vertex = vertex
  }

  addNext(el: El) {
    this.#next = el
  }

  getNext() {
    return this.#next
  }

  toString() {
    let current = this.vertex.left
    const res: ResultOutput = { vertex: this.vertex.name, childLinkedSubList: [current?.name as number] }
    while (current?.left && current.name !== this.vertex.name) {
      res.childLinkedSubList.push(current.left.name)
      current = current.left
    }
    return { ...res, childLinkedSubList: res.childLinkedSubList.join('=>'), next: this.#next.vertex.name }
  }
}

export { El }
