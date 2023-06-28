import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      setUrl: (url: string) => void
      onSelectHighlight: (callback) => void
    }
  }
}
