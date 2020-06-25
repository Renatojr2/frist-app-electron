const {app, BrowserWindow, ipcMain} = require('electron')
const {promisify} = require('util')

const sizeOf = promisify(require('image-size'))

let win;

function createWindow(){
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

ipcMain.on('imageSize', (event, path)=>{
  sizeOf(path)
    .then(dimensions => {
      win.webContents.send('imageSize', dimensions)
    })
    .catch(e => console.log(e))
})