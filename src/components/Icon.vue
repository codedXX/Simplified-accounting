<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
import x1 from '@/assets/icons/money.svg';
import x2 from '@/assets/icons/label.svg';
import x3 from '@/assets/icons/statistics.svg';
import x4 from '@/assets/icons/right.svg';
import x5 from '@/assets/icons/left.svg';

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
console.log(x1,x2,x3,x4,x5);


@Component
export default class Icon extends Vue {
  @Prop(String) readonly name: string | undefined
}
</script>

<style lang="scss" scoped>
.icon {
  width: 32px;
  height: 32px;
  fill: currentColor;
}
</style>