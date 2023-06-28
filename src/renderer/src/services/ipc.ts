const HTTPS_PREFIX = 'https://'
function addHttpsToUrl(url: string) {
  return url.includes(HTTPS_PREFIX) ? HTTPS_PREFIX : HTTPS_PREFIX + url
}

export function sendUrl(url: string) {
  window.api.setUrl(addHttpsToUrl(url))
}

type CallbackDto = {
  text: string
  x: number
  y: number
  title: string
  url: string
}
type Callback = (event: any, dto: CallbackDto) => void

export function subscribeToHighlightSelection(callback: Callback) {
  window.api.onSelectHighlight(callback)
}
