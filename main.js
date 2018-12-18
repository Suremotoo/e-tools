const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const glob = require('glob')

const debug = /--debug/.test(process.argv[2])
const autoUpdater = require('./auto-updater')


// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let mainWindow

// App 启动初始化 
function initialize() {
    var shouldQuit = makeSingleInstance()
    if (shouldQuit) return app.quit()

    loadMainJS()

    // 创建启动主页面窗口
    function createWindow() {
        var windowOptions = {
            width: 1188,
            minWidth: 880,
            height: 650,
            minHeight: 450,
            title: app.getName()
        }

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
        }


        mainWindow = new BrowserWindow(windowOptions);

        // 然后加载应用的 index.html。
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))


        // Launch fullscreen with DevTools open, usage: npm run debug
        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }


        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        mainWindow.on('closed', function() {
            mainWindow = null
        })

        mainWindow.on('resize', updateReply);

        function updateReply() {
            // const message = `大小: ${mainWindow.getSize()} - 位置: ${mainWindow.getPosition()}`
            // console.log("mainWindow：" + message);
        }
    }


    // Electron 会在初始化后并准备
    // 创建浏览器窗口时，调用这个函数。
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('ready', function() {
        createWindow()
        autoUpdater.initialize()
    })

    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
        // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        // 在macOS上，当单击dock图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (mainWindow === null) {
            createWindow()
        }
    })

}

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
// 

// Require each JS file in the main-process dir
function loadMainJS() {
    var files = glob.sync(path.join(__dirname, 'main-process/*.js'))
    files.forEach(function(file) {
        require(file)
    })
    autoUpdater.updateMenu()
}


// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return false

    return app.makeSingleInstance(function() {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}


// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
    case '--squirrel-install':
        autoUpdater.createShortcut(function() { app.quit() })
        break
    case '--squirrel-uninstall':
        autoUpdater.removeShortcut(function() { app.quit() })
        break
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit()
        break
    default:
        initialize()
}