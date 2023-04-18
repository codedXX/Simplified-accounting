<template>
<Layout>
    <div class="label-wrapper" v-for="tag in tags" :key="tag.id">
      <router-link :to="`/edit/${tag.id}`" class="tags">
        <span>{{tag.name}}</span>
        <Icon class="icon" name="right"></Icon>
      </router-link>
    </div>
<!--  <div class="btn">-->
<!--    <button @click="createTag">新建标签</button>-->
<!--  </div>-->

  <Button @click.native="createTag">新建标签</Button>
</Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/views/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component({
  components: {Button}
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
.label-wrapper {
  padding-left: 16px;
  font-size: 16px;
  background: white;
  &>.tags{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    padding: 5px;
    min-height: 44px;
    & .icon{
            width: 18px;
            height: 18px;
            color: #666;
            margin-right: 16px;
          }
  }

}
</style>