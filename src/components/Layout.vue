<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
<!--    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">-->
    <div class="content layout-content" >
      <slot/>
    </div>
    <Nav/>
  </div>
<!--  <div class="layout-wrapper">-->
<!--    <Nav/>-->
<!--    <div class="content">-->
<!--      <slot/>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script lang="ts">
export default {
  props: ['classPrefix'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>