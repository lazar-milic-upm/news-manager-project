const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadURL('http://localhost:4200');

    // mainWindow.loadFile(path.join(__dirname, 'dist/news-manager-project/browser/index.html'));

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

    mainWindow.loadFile(path.join(__dirname, 'dist/news-manager-project/index.html'));

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