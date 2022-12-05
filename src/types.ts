interface VertexType {
  vertex: number
  linked: number[]
}

type MFO = {
  main: VertexType[]
  additional: number[]
}

type ResultOutput = {
  vertex: number
  childLinkedSubList: number[]
}

export { MFO, VertexType, ResultOutput }
