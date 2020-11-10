const { create } = require('domain')
const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: { nodeIntegration: true },
        titleBarStyle: 'default'
    })

    win.loadURL('http://contacts.google.com/', { userAgent: 'Chrome' })

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
})