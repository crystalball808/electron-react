import { useEffect } from 'react'
import './styles.css'
import { UrlInput } from './widgets/UrlInput'
import { subscribeToHighlightSelection } from './services/ipc'
import { usePersistedHighlights } from './logic/usePersistedHighlights'

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
          <div key={highlight.id}>{highlight.title}</div>
        ))}
      </div>
      <UrlInput />
    </div>
  )
}

export default App
