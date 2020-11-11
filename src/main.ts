import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.loadURL("https://contacts.google.com", { userAgent: "Chrome" })

    // mainWindow.webContents.openDevTools()

}

app.on("ready", () => {
    createWindow();
    app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
    app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit() })
})