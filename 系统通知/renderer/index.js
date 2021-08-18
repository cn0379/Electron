const { ipcRenderer } = require('electron')
const Timer = require('timer.js')

function startWork(ms) {
  let workTimer = new Timer({
    ontick: (ms) => {
      updateTime(ms)
    },
    onend: () => {
      notification(ms)
    }
  })
  workTimer.start(10)
}

function updateTime(ms) {
  let timerContainer = document.getElementById('timer-container')
  console.log(ms);
  timerContainer.innerText = ms
}

async function notification(ms) {
  console.log(ms);
  let res = await ipcRenderer.invoke('work-notification')
  if (res === 'rest') {
    setTimeout(() => {
      alert('sleep')
    }, 5 * 1000)
  } else if (res === 'work') {
    startWork()
  }
}

startWork()