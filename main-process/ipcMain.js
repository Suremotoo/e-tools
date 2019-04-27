const { ipcMain, app} = require('electron');
const Store = require('electron-store');
const store = new Store();

ipcMain.on('ipc-change-language', function (event, arg) {
  let let_quickchange = store.get('quickchangeStore');
  if (let_quickchange == false) {
     app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
     app.exit(0)
  }
})
