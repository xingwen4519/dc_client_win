<template>
  <div id="waringinfo">waring info,id:{{warning.id}}</div>
</template>
<script>
export default {
  data() {
    return {
      warning: {
        id: ""
      }
    };
  },
  created() {
    this.warning.id = this.$route.query.id;
  }
};
</script>