const { app, BrowserWindow, Notification, ipcMain } = require('electron')

let win // 防止垃圾回收
app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // node 环境开启
      contextIsolation: false // 解决require错误
    }
  })

  win.loadFile('index.html')
  handleIPC()
})

function handleIPC() {
  ipcMain.handle('work-notification',
    async function () {
      let res = await new Promise((reslove, reject) => {
        let noctifcation = new Notification({
          title: '任务结束',
          body: '是否开始休息',
          actions: [{ text: '开始休息', type: 'button' }],
          closeButton: '继续工作'
        })
        noctifcation.show()
        noctifcation.on('action', () => {
          reslove('rest')
        })
        noctifcation.on('close', () => {
          reslove('work')
        })
      })
      return res
    })
}