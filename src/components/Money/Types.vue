<template>
  <ul class="types">
    <li :class="value==='+'?'selected':''" @click="selectType('-')">支出</li>
    <li :class="{[classPrefix+'-item']:classPrefix,selected:value==='-'}"  @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop() readonly value!: string;
  @Prop() classPrefix!:string;

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }


}
</script>

<style lang="scss" scoped>
.types {
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