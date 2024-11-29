const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const Store = require('electron-store');

let mainWindow;
const userStore = new Store();

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadURL('http://localhost:4200');

    ipcMain.handle('save-token', (event, token) => {
        userStore.set('userToken', token);
        console.log('Token saved:', token);
    });

    ipcMain.handle('get-token', () => {
        const token = userStore.get('userToken');
        console.log('Token retrieved:', token);
        return token;
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
