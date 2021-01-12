<template>
  <div id="warning">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>【{{ warning.ViewCard.deptName }}】</span>
        <span class="fr">{{ warning.ViewCard.viewTime }}</span>
      </div>
      <el-row>
        <el-form size="small" label-width="80px">
          <el-form-item prop="name" label="患者姓名">
            <el-input type="text" v-model="warning.ViewCard.name" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item prop="idcard" label="证件号码">
            <el-input type="text" v-model="warning.ViewCard.idCard" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="患者诊断">
            <el-input type="text" v-model="warning.ViewCard.diaName" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item size="medium" class="bt-form">
            <el-button type="primary" @click="openCard">填写报卡</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
const { shell } = require("electron").remote;
export default {
  data() {
    return {
      warning: {
      }
    };
  },
  methods: {
    openCard() {
      //待报消息
      let url = process.env.APP_WEB_URL;
      switch (this.warning.ViewCard.cardType) {
        case 0:
          url += 'idinfectiousviewsave?viewId=';
          break;
        case 1:
          url += 'cdapoplexyviewsave?viewId=';
          break;
        case 2:
          url += 'cdcoronaryviewsave?viewId=';
          break;
        case 3:
          url += 'cdtumourviewsave?viewId=';
          break;
        case 4:
          url += 'cdinjuryviewsave?viewId=';
          break;
        case 5:
          url += 'hffoodborneviewsave?viewId=';
          break;
      }
      url += this.warning.ViewCard.id;
      shell.openExternal(encodeURI(url));
    }
  },
  created() {
    this.warning = JSON.parse(this.$route.query.card);
  }
};
</script>
<style lang="scss" scoped>
#warning {
  height: 100%;
  width: 100%;
  background-color: $bg-content;
  padding: 10px 0;

  .box-card {
    margin: 0 10px;
  }
  .fr {
    float: right;
    font-size: $font-size-s;
    line-height: 25px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>