import { Vertex } from './vertex'
import promptApi from 'prompt-sync'
import { MFO, VertexType } from './types'
import { VertexList } from './vertex-list'
import { El } from './element'
import { ConsoleMessages, MAX_LINK_COUNT, MAX_VERTEX_COUNT, MenuMessages, VERTEX_LINK_DIFFERENCE } from './enums'
const prompt = promptApi({ sigint: true })

const stringToArrNumber = (s?: string): number[] => (s === '' ? [] : (s?.split(' ').map((el) => Number(el)) as number[]))

const createVertex = (vertexInput: VertexType): Vertex => {
  const parentVertex = new Vertex(vertexInput.vertex)
  addChild(parentVertex, vertexInput.linked)
  return parentVertex
}

const isCorrectInputs = ({ P }: MFO, genLinks: number): boolean =>
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

const printTable = <T extends object | any[]>(res: T, msg = ConsoleMessages.G_ARRAY): void => {
  console.log(msg)
  console.table(res)
}

const fillGap = ({ G }: MFO) => {
  for (let i = 1; i < G.length; i++) if (G[i].vertex - G[i - 1].vertex !== 1) G.splice(i, 0, { linked: [], vertex: G[i - 1].vertex + 1 })
}

const addVertex = ({ G, P }: MFO): void => {
  const generalLinked = G.map(({ linked }) => linked).flat()
  if (!isCorrectInputs({ G, P }, generalLinked.length)) throw new Error('invalid input!!!')
  if (P.length !== G.length) fillGap({ G, P })
  fillGraph({ G, P }, generalLinked)
}

const fillGraph = ({ G, P }: MFO, generalLinked: number[]) => {
  const graph: VertexList = new VertexList()
  for (let i = 0; i < P.length; ++i) {
    const isWrongLinked: boolean = !!(G[i].linked.length && G[i].linked.sort((a, b) => a - b).at(-1) !== generalLinked[P[i] - 1])
    if (isWrongLinked) throw new Error(`wrong P array at index ${i}; elements ${G[i].linked.at(-1)} ${generalLinked[P[i] - 1]}`)
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
    res.G.push(newVertex)
  }
}

export { addVertex, printTable, stringToArrNumber, inputGManually }
