import {
  app,
  BrowserWindow,
  Tray,
  Menu
} from 'electron'
import path from 'path';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  app.setAppUserModelId("com.dc.win");

  //系统托盘右键菜单
  var trayMenuTemplate = [{
    label: "主界面",
    click: function () {
      mainWindow.show();
    }
  }, {
    label: "关闭监测",
    click: function () {
      // mainWindow = null;
      app.isQuiting = true;
      app.quit();
    }
  }];

  //系统托盘图标目录
  // var trayIcon = path.join(__dirname, "../../static");
  var appTray = new Tray(path.join(__static, "app.ico"));
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //设置此托盘图标的悬停提示内容
  appTray.setToolTip("公卫监测预警工具");
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);

  // //系统托盘图标闪烁
  // var count = 0;
  // var timer = null;
  // timer = setInterval(function () {
  //   count++;
  //   if (count % 2 == 0) {
  //     appTray.setImage(path.join(trayIcon, 'app.ico'))
  //   } else {
  //     appTray.setImage(path.join(trayIcon, 'appb.ico'))
  //   }
  // }, 600);

  //单点击 1.主窗口显示隐藏切换 2.清除闪烁
  appTray.on("click", function () {
    mainWindow.show();
    // clearInterval(timer);
    // // if (timer) {
    //   appTray.setImage(path.join(trayIcon, 'app.ico'))
    //   //主窗口显示隐藏切换
    //   mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    // // }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */