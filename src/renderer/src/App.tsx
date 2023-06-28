import { useEffect } from "react"
import './styles.css'
import { UrlInput } from './widgets/UrlInput'
import { subscribeToQuoteSelection } from "./services/ipc"

function App(): JSX.Element {
  useEffect(() => {
   subscribeToQuoteSelection((_, dto) => {
    console.log(dto)
   }) 
  }, [])
  return (
    <div className="container">
      <UrlInput />
    </div>
  )
}

export default App
