<template>
  <div id="home">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>您好：【{{userInfo.name}}】，欢迎使用公卫监测系统</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="signOut">退出</el-button>
      </div>
      <el-row>
        <div class="status">
          <span>监测状态：监测中</span>
        </div>
        <el-button type="primary">启动监测</el-button>
        <el-button>停止监测</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        orgName: ""
      }
    };
  },
  methods: {
    signOut() {
      this.$confirm("确定退出本系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("setSignOut");
          this.$router.replace("/login");
        })
        .catch(() => {
          console.log("cancel logout");
        });
    }
  },
  created() {
    this.userInfo.name = this.$store.state.userInfo.realname;
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
