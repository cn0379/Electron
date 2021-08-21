const {
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev') //  区分开发还是生产环境
const path = require('path')
let win

function create() {
    win = new BrowserWindow({
        width: 1000,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // 解决require错误
        }
    })

    win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
}

module.exports = {
    create
}