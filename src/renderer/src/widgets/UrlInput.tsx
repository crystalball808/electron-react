import { sendUrl } from "@renderer/services/ipc"
import { FC, FormEventHandler, useState } from 'react'

export const UrlInput: FC = () => {
  const [url, setUrl] = useState<string>('')

  const handleChangeUrl: FormEventHandler<HTMLFormElement> = event => {
    event.nativeEvent.preventDefault()

    sendUrl(url)
  }

  return (
    <form className="url-input" onSubmit={handleChangeUrl}>
      <input
        type="text"
        value={url}
        onChange={event => {
          setUrl(event.target.value)
        }}
      />
      <button type="submit">GO</button>
    </form>
  )
}
