<template>
  <div class="btn">
    <button><slot/></button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
.btn {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
  & button{
    background: #767676;
    color: white;
    border: none;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    font-size: 16px;
  }

}
</style>