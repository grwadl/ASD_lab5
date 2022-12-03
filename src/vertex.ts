class Vertex {
  name
  left?: Vertex
  constructor(name: number) {
    this.name = name
  }

  addNext(vertex: Vertex) {
    this.left = vertex
  }
}

export { Vertex }
