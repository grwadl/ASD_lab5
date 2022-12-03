import { Vertex } from './vertex'
import promptApi from 'prompt-sync'
import { MFO, VertexType } from './types'
import { VertexList } from './vertex-list'
import { El } from './element'
import { MAX_LINK_COUNT, MAX_VERTEX_COUNT, MenuMessages, VERTEX_LINK_DIFFERENCE } from './enums'
const prompt = promptApi({ sigint: true })

const stringToArrNumber = (s?: string): number[] => (s === '' ? [] : (s?.split(' ').map((el) => Number(el)) as number[]))

const createVertex = (vertexInput: VertexType): Vertex => {
  const parentVertex = new Vertex(vertexInput.vertex)
  addChild(parentVertex, vertexInput.linked)
  return parentVertex
}

const isCorrectInputs = ({ G, P }: MFO, genLinks: number): boolean =>
  genLinks - P.length === VERTEX_LINK_DIFFERENCE && genLinks < MAX_LINK_COUNT && P.length < MAX_VERTEX_COUNT

const addChild = (parent: Vertex, names: number[]): Vertex | undefined => {
  return (function setNext(previous?: Vertex) {
    if (!previous) return
    if (!names.length) return (previous.left = previous.name === parent.name ? undefined : parent)
    previous.addNext(new Vertex(names[0]))
    names.shift()
    setNext(previous.left as Vertex)
  })(parent)
}

const printAllInputs = ({ G }: Partial<MFO>): ((p: Partial<MFO>) => void) => {
  console.warn('INPUTS ====>')
  console.table(G)
  return ({ P }: Partial<MFO>) => console.table(P)
}

const addVertex = ({ G, P }: MFO): void => {
  const graph: VertexList = new VertexList()
  const generalLinked = G.map(({ linked }) => linked).flat()
  if (!isCorrectInputs({ G, P }, generalLinked.length)) throw new Error('invalid input!!')

  for (let i = 0, k = 0; k < P.length; ++i, ++k) {
    if (i + 1 !== G[i].vertex) k = G[i].vertex - 1
    if (G[i].linked.at(-1) !== generalLinked[P[k] - 1])
      throw new Error(`wrong P array at index ${i}; elements ${(G[i].linked.at(-1), generalLinked[P[k] - 1])}`)
    const newElement = new El(createVertex(G[i]))
    graph.list.at(-1)?.addNext(newElement)
    graph.Add(newElement)
  }
  graph.list.at(-1)?.addNext(graph.list[0])
  graph.ToInnerStringOutput()
}

const inputGManually = (res: MFO, count: number) => {
  for (let vertex = 1; vertex <= count; vertex++) {
    const linked: number[] = stringToArrNumber(prompt(`${MenuMessages.NAME_OF_VERTEX} ${vertex}: `)!)
    const newVertex: VertexType = { vertex, linked }
    if (linked.length > 0) res.G.push(newVertex)
  }
}

export { addVertex, printAllInputs, stringToArrNumber, inputGManually }
