<template>
  <div class="card-box">
    <h1 class="title">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="less" scoped>
.card-box {
  padding: 15px 30px;
  width: 100%;
  height: 100%;
  // float: left;
  > .title {
    position: relative;
    font-size: 12px;
    font-weight: 700;
    color: #333333;
    line-height: 16px;
    margin-bottom: 10px;
    padding-left: 10px;
    &::before,
    &::after {
      content: " ";
      position: absolute;
      width: 3px;
      height: 8px;
      left: 0;
    }
    &::before {
      top: 0;
      background: #e83e1b;
    }
    &::after {
      bottom: 0;
      background: #0c4890;
    }
  }
}
</style>
