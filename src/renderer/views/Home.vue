<template>
  <div id="home">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>您好：【{{ userInfo.name }}】，欢迎使用公卫监测系统</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="signOut"
          >退出</el-button
        >
      </div>
      <el-row>
        <div class="status">
          <span>监测状态：{{ socketIO === null ? "未监测" : "监测中" }}</span>
        </div>
        <el-button
          type="primary"
          @click="openMonitor"
          :disabled="socketIO !== null"
          >启动监测</el-button
        >
        <el-button @click="closeMonitor" :disabled="socketIO === null"
          >停止监测</el-button
        >
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Socket from 'socket.io-client';
import { Sleep } from '../utils/common';
const { BrowserWindow, screen } = require("electron").remote;
export default {
  data() {
    return {
      userInfo: {
        name: "",
        orgName: ""
      },
      //socket实例
      socketIO: null,
      //预警提醒弹框列表
      warningNotifyList: []
    };
  },
  methods: {
    openMonitor() {
      if (!this.socketIO) {
        this.createSocket();
      }
    },
    closeMonitor() {
      if (this.socketIO) {
        this.socketIO.disconnect();
        this.socketIO = null;
      }
    },
    signOut() {
      this.$confirm("确定退出本系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //关闭消息连接
          if (this.socketIO) {
            this.socketIO.disconnect();
          }
          if (this.warningNotifyList.length > 0) {
            this.warningNotifyList.forEach((item) => {
              if (item) {
                item.close();
              }
            });
          }
          this.$store.dispatch("setSignOut");
          this.$router.replace("/login");
        })
        .catch(() => {
          console.log("cancel logout");
        });
    },
    //建立消息通信
    createSocket() {
      this.socketIO = Socket.io(process.env.VUE_APP_URL, {
        forceNew: true,
        reconnectionAttempts: 100,
        timeout: 10000,
        transports: ['websocket'],
        query: {
          token: this.$store.state.token,
          userId: this.$store.state.userInfo.id,
          type: 0
        },
      });


      this.socketIO.on('connect', () => {
        console.log('---已创建消息通信连接，sokect id:' + this.socketIO.id);
      });
      this.socketIO.on('disconnect', () => {
        console.log('---已断开消息通信连接，socket connected:' + this.socketIO.connected);
      });
      this.socketIO.on('message', async function (message) {
        console.log('---已收到服务器消息：', message);
      });

      this.socketIO.on('warningCards', async (message) => {
        console.log('---已收到服务器预警消息---');
        console.log(message);
        const that = this;
        for (const item of message) {
          await Sleep(500);

          const screenSize = screen.getPrimaryDisplay().workAreaSize;
          const win = new BrowserWindow({
            width: 400,
            height: 315,
            autoHideMenuBar: true,
            resizable: true,
            title: "预警消息通知",
            x: screenSize.width - 400,
            y: screenSize.height - 315
          });
          const windowsHref = window.location.href;
          const locationURL = windowsHref.substring(0, windowsHref.indexOf("#") + 1);
          win.loadURL(locationURL + "/warning?card=" + JSON.stringify(item));
        }
      });
    }
  },
  created() {
    this.userInfo.name = this.$store.state.userInfo.realname;
    this.createSocket();
  }
};
</script>
<style lang="scss" scoped>
#home {
  height: 100%;
  width: 100%;
  background-color: $bg-content;
  padding: 10px 0;

  .box-card {
    margin: 0 10px;
  }
  .status {
    margin: 0 0 15px 0;
  }
  .org {
    font-size: $font-size;
  }
}
</style>
