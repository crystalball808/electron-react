import { app, shell, BrowserWindow, BrowserView, ipcMain, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Store from 'electron-store'
import { BROWSER_VIEW_WIDTH, BROWSER_VIEW_Y_OFFSET } from "./constants"

const store = new Store()

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.maximize()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const window = createWindow()

  const view = new BrowserView()
  window.setBrowserView(view)

  const windowBounds = window.getContentBounds()
  const browserViewHeight = windowBounds.height - BROWSER_VIEW_Y_OFFSET
  const browserViewX = windowBounds.width - BROWSER_VIEW_WIDTH
  view.setBounds({ x: browserViewX, y: BROWSER_VIEW_Y_OFFSET, width: BROWSER_VIEW_WIDTH, height: browserViewHeight })
  view.webContents.loadURL('https://google.com')

  view.webContents.on('context-menu', (_, params) => {
    if (!params.selectionText) return
  
    const menu = Menu.buildFromTemplate([
      {
        label: 'Save highlight',
        click: () => {
          window.webContents.send('select-highlight', {
            text: params.selectionText,
            x: params.x,
            y: params.y,
            url: params.pageURL,
            title: view.webContents.getTitle()
          })
        }
      }
    ])
    menu.popup({
      x: params.x + browserViewX,
      y: params.y + BROWSER_VIEW_Y_OFFSET,
    })
  })
  view.setAutoResize({
    width: true,
    height: true,
    horizontal: true,
    vertical: true
  })

  ipcMain.on('set-browser-view-url', (_, url) => {
    view.webContents.loadURL(url)
  })
  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val)
  })
  ipcMain.on('electron-store-set', async (_, key, val) => {
    store.set(key, val)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
