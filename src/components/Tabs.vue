<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
<!--    :class="{[classPrefix+'-item']:classPrefix,selected:value==='-'}"-->
    <li
      :class="{[classPrefix+'-item']:classPrefix,selected:item.value===value}"
      @click="selectType(item.value)"
      v-for="item in dataSource" :key="item.value"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop() readonly value!: string;
  @Prop() classPrefix!:string;
  @Prop() dataSource!:{text:string,value:string}

  selectType(type: string) {
    this.$emit('update:value', type);
  }


}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  height: 64px;
  flex-direction: row;
  font-size: 24px;
  background: #c4c4c4;
  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: black;
    }
  }
}
</style>