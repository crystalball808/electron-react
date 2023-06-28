const HTTPS_PREFIX = 'https://'
function addHttpsToUrl(url: string) {
  return url.includes(HTTPS_PREFIX) ? HTTPS_PREFIX : HTTPS_PREFIX + url
}

export function sendUrl(url: string) {
  // @ts-expect-error renderer doesn't know about electronAPI
  window.electronAPI.setUrl(addHttpsToUrl(url))
}

type CallbackDto = {
  text: string
  x: number
  y: number
}
type Callback = (event: any, dto: CallbackDto) => void

let subscribed = false
export function subscribeToQuoteSelection(callback: Callback) {
  if (!subscribed) {
    // @ts-expect-error renderer doesn't know about electronAPI
    window.electronAPI.onSelectQuote(callback)
    subscribed = true
  }
}
