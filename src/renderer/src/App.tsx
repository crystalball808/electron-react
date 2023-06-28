import { useEffect } from 'react'
import './styles.css'
import { UrlInput } from './widgets/UrlInput'
import { subscribeToHighlightSelection } from './services/ipc'

function App(): JSX.Element {
  useEffect(() => {
    subscribeToHighlightSelection((_, dto) => {
      console.log(dto)
    })
  }, [])

  return (
    <div className="container">
      <div></div>
      <UrlInput />
    </div>
  )
}

export default App
