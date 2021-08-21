const {
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev') //  区分开发还是生产环境
const path = require('path')
let win

function create() {
    win = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // 解决require错误
        }
    })
    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        win.loadFile(path.resolve(__dirname, '../renderer/pages/main/index.html'))
    }
}

function send(channel,...args) {
    // 主进程和渲染进程通信需要拿到webContents 然后调用send方法
    win.webContents.send(channel,...args)
}

module.exports = {
    create,
    send
}