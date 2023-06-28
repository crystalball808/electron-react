import { useEffect } from 'react'
import './styles.css'
import { UrlInput } from './widgets/UrlInput'
import { subscribeToHighlightSelection } from './services/ipc'
import { usePersistedHighlights } from './logic/usePersistedHighlights'
import { HighlightItem } from './widgets/HighlightItem'

function App(): JSX.Element {
  const { highlights, addHighlight } = usePersistedHighlights()
  useEffect(() => {
    subscribeToHighlightSelection((_, dto) => {
      addHighlight({
        text: dto.text,
        title: dto.title,
        url: dto.url
      })
    })
  }, [])

  return (
    <div className="container">
      <div>
        {highlights.map(highlight => (
          <HighlightItem key={highlight.id} highlight={highlight} />
        ))}
      </div>
      <UrlInput />
    </div>
  )
}

export default App
