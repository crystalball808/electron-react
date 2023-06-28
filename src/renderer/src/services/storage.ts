
export type Highlight = {
  id: number
  text: string
  title: string
  url: string
}

function setHighlights(highlights: Highlight[]) {
  window.api.store.set('highlights', highlights)
}
function getHighlights(): Highlight[] {
  return window.api.store.get('highlights') ?? []
}

function generateIdForNewHighlight() {
  const id = window.api.store.get('id') ?? 1

  window.api.store.set('id', id + 1)

  return id
}

export const storage = {
  setHighlights,
  getHighlights,
  generateIdForNewHighlight
}
