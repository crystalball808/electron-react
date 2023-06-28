import { FC, FormEventHandler, useState } from 'react'

export const UrlInput: FC = () => {
  const [url, setUrl] = useState<string>('')

  const handleChangeUrl: FormEventHandler<HTMLFormElement> = event => {
    event.nativeEvent.preventDefault()

    // @ts-expect-error renderer doesn't know about electronAPI
    window.electronAPI.setUrl(url)
  }

  return (
    <form onSubmit={handleChangeUrl}>
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
