const { app, BrowserWindow, session, nativeTheme, Menu } = require('electron')

let win

function createWindow() {

    defaultUserAgent('Chrome')

    win = new BrowserWindow({
        width: 800, height: 600, show: false,
        webPreferences: { nodeIntegration: true },
        titleBarStyle: 'default'
    })

    win.once('ready-to-show', () => win.show())

    // win.loadURL('http://contacts.google.com/', { userAgent: 'Chrome' })
    win.loadURL('http://contacts.google.com/')

}

function defaultUserAgent(userAgent) {

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = userAgent
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.setAboutPanelOptions({
    applicationName: app.getName(),
    version: app.getVersion(),

    copyright: 'Jens Schumacher',
    authors: ['Jens Schumacher'],
    iconPath: 'assets/app-logo.png',
})

const isMac = process.platform === 'darwin'

Menu.setApplicationMenu(
    Menu.buildFromTemplate(
        [
            {
                label: 'about',
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'close' },
                    { role: 'quit' }
                ]
            }
        ]
    )
)