<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
<!--    :class="selectTags.indexOf(tag)>=0?'selected':''"-->
    <ul  class="current">
      <li  v-for="tag in tagList" :key="tag.name"
           @click="selectTag(tag)"
          :class="selectedTags.indexOf(tag)>=0?'selected':''"
      >{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper){
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  selectTag(tag:string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }


}
</script>

<style lang="scss" scoped>
.tags{
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  & button{
    color: #999;
    border: none;
    border-bottom: 1px solid black;
  }
  & .current{
    display: flex;
    flex-wrap: wrap;
    &>li{
      $bg:#d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background: darken($bg,50%);
        color: white;
      }
    }
  }
}
</style>