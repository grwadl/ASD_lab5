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
  addLinkedVertex(parentVertex, vertexInput.linked)
  return parentVertex
}

const isCorrectInputs = ({ additional }: MFO, genLinks: number): boolean =>
  genLinks - additional.length === VERTEX_LINK_DIFFERENCE && genLinks < MAX_LINK_COUNT && additional.length < MAX_VERTEX_COUNT

const addLinkedVertex = (parent: Vertex, names: number[]): Vertex | undefined => {
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

const fillGap = ({ main }: MFO) => {
  for (let i = 1; i < main.length; i++)
    if (main[i].vertex - main[i - 1].vertex !== 1) main.splice(i, 0, { linked: [], vertex: main[i - 1].vertex + 1 })
}

const convertToMFO = ({ main, additional }: MFO): void => {
  const generalLinked = main.map(({ linked }) => linked).flat()
  if (!isCorrectInputs({ main, additional }, generalLinked.length)) throw new Error('invalid input!!!')
  if (additional.length !== main.length) fillGap({ main, additional })
  fillVertexList({ main, additional }, generalLinked)
}

const fillVertexList = ({ main, additional }: MFO, generalLinked: number[]) => {
  const graph: VertexList = new VertexList()
  for (let i = 0; i < additional.length; ++i) {
    const isWrongLinked: boolean = !!(
      main[i].linked.length && main[i].linked.sort((a, b) => a - b).at(-1) !== generalLinked[additional[i] - 1]
    )
    if (isWrongLinked) throw new Error(`wrong P array at index ${i}; elements ${main[i].linked.at(-1)} ${generalLinked[additional[i] - 1]}`)
    const newElement = new El(createVertex(main[i]))
    graph.list.at(-1)?.addNext(newElement)
    graph.Add(newElement)
  }
  graph.list.at(-1)?.addNext(graph.list[0])
  graph.ToInnerStringOutput()
}

const inputMainArrayManually = (res: MFO, count: number) => {
  for (let vertex = 1; vertex <= count; vertex++) {
    const linked: number[] = stringToArrNumber(prompt(`${MenuMessages.NAME_OF_VERTEX} ${vertex}: `)!)
    const newVertex: VertexType = { vertex, linked }
    res.main.push(newVertex)
  }
}

export { convertToMFO, printTable, stringToArrNumber, inputMainArrayManually }
