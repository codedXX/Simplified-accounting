<template>
  <label class="notes">
    <span class="name">{{remarks}}</span>
    <input type="text" :placeholder="placeHolder"
           :value="value"
           @input="onValueChanged($event.target.value)"
    >
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop({default: ''}) readonly value!: string;

  @Prop({required: true}) remarks!: string;
  @Prop() placeHolder?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  & .name{
    padding-right: 16px;
  }
  & input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
    outline:medium;
  }
}
</style>