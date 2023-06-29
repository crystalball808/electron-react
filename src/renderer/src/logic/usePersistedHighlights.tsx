import { Highlight } from '@renderer/services/storage'
import { useState } from 'react'
import { storage } from '@renderer/services/storage'

export const usePersistedHighlights = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  const addHighlight =(newHighlight: Omit<Highlight, 'id'>) => {
    const id = storage.generateIdForNewHighlight()

    const highlightDto: Highlight = {
      ...newHighlight,
      id
    }

    const newHighlights = [...highlights, highlightDto]
    setHighlights(newHighlights)
    storage.setHighlights(newHighlights)
  }

  const clearHighlights = () => {
    storage.setHighlights([])
    setHighlights([])
  }

  return {
    highlights,
    addHighlight,
    clearHighlights
  }
}
