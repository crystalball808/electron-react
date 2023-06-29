import { Highlight } from '@renderer/services/storage'
import { FC } from 'react'

export const HighlightItem: FC<{ highlight: Highlight }> = ({ highlight }) => {
  return (
    <div className="list-item">
      <span className="title">{highlight.title}</span>
      <div
        style={{
          marginBottom: 8
        }}
      >
        <a href={highlight.url} target="_blank">
          {highlight.url}
        </a>
      </div>
      <div>{highlight.text}</div>
    </div>
  )
}
