const { app, BrowserWindow, ipcMain, clipboard, shell } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 520,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.setMenu(null)
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Give access to get and post functions, from fetchAgent file and to renderer files
const fetchAgent = require(path.join(__dirname,'fetchAgent.js'))

var password = null ;

ipcMain.handle("get", (event, args) => fetchAgent.get(args.address))
ipcMain.handle("post", (event, args) => fetchAgent.post(args.address, args.params))

// Getter and setter of the password
ipcMain.handle("getGlobalPassword", (event, args) => password)
ipcMain.handle("setGlobalPassword", (event, args) => password = args.password || null)

// Clipboard
ipcMain.handle("setClipboard", (event, args) => clipboard.writeText(args.content))

// Open in browser
ipcMain.handle("openLink", (event, args) => shell.openExternal(args.link))