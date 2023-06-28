import { Highlight } from '@renderer/services/storage'
import { FC } from 'react'

export const HighlightItem: FC<{ highlight: Highlight }> = ({ highlight }) => {
  return (
    <div>
      <div>{highlight.title}</div>
      <div>{highlight.url}</div>
      <div>{highlight.text}</div>
    </div>
  )
}