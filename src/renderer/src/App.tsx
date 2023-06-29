import { useEffect } from 'react'
import './styles.css'
import { UrlInput } from './widgets/UrlInput'
import { subscribeToHighlightSelection } from './services/ipc'
import { usePersistedHighlights } from './logic/usePersistedHighlights'
import { HighlightItem } from './widgets/HighlightItem'

function App(): JSX.Element {
  const { highlights, addHighlight, clearHighlights } = usePersistedHighlights()
  useEffect(() => {
    subscribeToHighlightSelection((_, dto) => {
      addHighlight({
        text: dto.text,
        title: dto.title,
        url: dto.url
      })
    })
  }, [addHighlight])

  return (
    <div className="container">
      <div>
        <div className="header">Your highlights, {highlights.length} <button onClick={clearHighlights}>Clear</button></div>
        <div className="list">
          {highlights.map(highlight => (
            <HighlightItem key={highlight.id} highlight={highlight} />
          ))}
          {highlights.length === 0 ? <div className="title">No highlights yet!</div> : null}
        </div>
      </div>
      <UrlInput />
    </div>
  )
}

export default App
