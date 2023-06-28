import { Highlight } from '@renderer/services/storage'
import { useState } from 'react'
import { storage } from '@renderer/services/storage'

export const usePersistedHighlights = () => {
  const [highlights, setHighlights] = useState<Highlight[]>(() => storage.getHighlights())

  const addHighlight = (highlight: Omit<Highlight, 'id'>) => {
    const id = storage.generateIdForNewHighlight()

    const highlightDto: Highlight = {
      ...highlight,
      id
    }

    const newHighlights = [...highlights, highlightDto]
    setHighlights(newHighlights)
    storage.setHighlights(newHighlights)
  }

  return {
    highlights,
    addHighlight
  }
}
