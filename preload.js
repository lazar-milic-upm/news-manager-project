const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    notify: (title, body, action) => ipcRenderer.send('notify', { title, body, action }),
    onNotificationClick: (callback) => ipcRenderer.on('notification-click', (_, action) => callback(action)),
});

contextBridge.exposeInMainWorld('electronAPI', {
    notify: (title, body, action) => ipcRenderer.send('notify', { title, body, action }),
    onNotificationClick: (callback) => ipcRenderer.on('notification-click', (_, action) => callback(action)),
    saveToken: (token) => ipcRenderer.invoke('save-token', token),
    getToken: () => ipcRenderer.invoke('get-token'),
});
