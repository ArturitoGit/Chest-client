// preload with contextIsolation enabled
const { contextBridge, ipcRenderer } = require('electron')
const { get, post } = require('./fetchAgent')

contextBridge.exposeInMainWorld('myAPI', {
    ipcRenderer
})