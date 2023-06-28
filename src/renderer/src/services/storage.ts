import Store from 'electron-store'

export type Highlight = {
  id: number
  text: string
  title: string
  url: string
}

const store = new Store<{ highlights: Highlight[]; id: number }>()

function setHighlights(highlights: Highlight[]) {
  store.set('highlights', highlights)
}
function getHighlights(): Highlight[] {
  return store.get('highlights')
}

function generateIdForNewHighlight() {
  const id = store.get('id') ?? 1

  store.set('id', id + 1)

  return id
}

export const storage = {
  setHighlights,
  getHighlights,
  generateIdForNewHighlight
}
