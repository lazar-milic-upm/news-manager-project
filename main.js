const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

let mainWindow;

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

    ipcMain.on('notify', (event, { title, body, action }) => {
        showNotification(title, body, action);
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

function showNotification(title, body, action = null) {
    const notification = new Notification({
        title: title,
        body: body,
    });

    if (action) {
        notification.on('click', () => {
            mainWindow.webContents.send('notification-click', action);
        });
    }

    notification.show();
}



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('notify', (event, { title, body, action }) => {
    showNotification(title, body, action);
});