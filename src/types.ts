interface VertexType {
  vertex: number
  linked: number[]
}

type MFO = {
  G: VertexType[]
  P: number[]
}

type ResultOutput = {
  vertex: number
  childLinkedSubList: number[]
}

export { MFO, VertexType, ResultOutput }
