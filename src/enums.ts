enum MenuMessages {
  QUANTITY = 'how many vertex you wanna add? ',
  WANT_MORE = 'do you wanna add more child vertex? ',
  NAME_OF_VERTEX = 'type the name of linked vertexes to',
  ADDITIONAL_ARRAY = 'type your additional array: ',
  MANUALLY_OR_AUTO = 'do you wanna input data manually or from file?(m/f) '
}

enum ConsoleMessages {
  G_ARRAY = "\n\n\nhere's your main array =========================>\n\n\n",
  ADDITIONAL_ARRAY = "\n\n\nhere's your additional array =========================>\n\n\n",
  RESULT = "\n\n\nhere's your result list =========================>\n\n\n"
}

const VERTEX_LINK_DIFFERENCE = 2

const MAX_VERTEX_COUNT = 20

const MAX_LINK_COUNT = 50

export { ConsoleMessages, MenuMessages, VERTEX_LINK_DIFFERENCE, MAX_LINK_COUNT, MAX_VERTEX_COUNT }
