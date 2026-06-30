const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // This loads your local React server into your native desktop window
  // --- REPLACE YOUR CURRENT win.loadURL LINE WITH THIS ---
if (process.env.VITE_DEV_SERVER_URL) {
  // Point Electron to your brand new custom local domain name
  win.loadURL('http://my-assignment-helper.local');
} else {
  // Keeps your production build working perfectly when packaged
  win.loadFile(path.join(__dirname, 'dist/index.html')); 
};
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});