<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChange" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/dist/js/mui.js'
export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  props: ["max"],
  methods: {
    countChange() {
      this.$emit("getcount", parseInt(this.$refs.numbox.value)) ;
    }
  },
  watch: {
    max(newVal, oldVal) {
      mui(".mui-numbox").numbox().setOption('max', newVal)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>