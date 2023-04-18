<template>
  <Layout>
<!--    <Types class-prefix="white"/>-->
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
<!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>-->
      <ol>
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}}</h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

const api = dayjs();
console.log(api)

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t=>t.name).join(',');
  }
  get recordList(){
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  beautify(string:string) {
    const day=dayjs(string)
    const now = dayjs();
    if(day.isSame(now,'day'))
    {
      return '今天'
    }else if(day.isSame(now.subtract(1,'day'),'day'))
    {
      return '昨天'
    }else if(day.isSame(now.subtract(2,'day'),'day'))
    {
      return '前天'
    }else if (day.isSame(now, 'year')) {
      return day.format('MM月D日')
    }else{
      return day.format('YYYY年MM月D日')
    }
  }

  get groupedList(){
    const {recordList}=this
    if (recordList.length === 0) {
      return []
    }
    // eslint-disable-next-line no-undef
    // type HashTableValue={title:string,items:RecordItem[]};
    // const hashTable:{ [key:string]: HashTableValue }= {};

    //因为createdAt是字符串，不能比较大小，所以要变成数字
  // .filter(r=>r.types === this.type).
    console.log('clone',clone(recordList))
    const newList=clone(recordList).filter(r=>r.type === this.type).sort((b,a)=>dayjs(a.createdAt).valueOf()-dayjs(b.createdAt).valueOf())
    const x=[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = x[x.length - 1];
      if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current);
      }else{
        x.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
      }
    }
    // for (let i = 0; i < recordList.length; i++) {
    //   const [date, time] = recordList[i].createdAt!.split('T');
    //   hashTable[date]=hashTable[date] || {title:date,items:[]};
    //   hashTable[date].items.push(recordList[i])
    // }
    // return hashTable;
    return x;
  }

  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  intervalList=[
    { text: '按天', value: 'day' },
    { text: '按周', value: 'week' },
    { text: '按月', value: 'month' }
  ];
  typeList=[
    { text: '支出', value: '-' },
    { text: '收入', value: '+' },
  ];
  type='-'
  interval='day'
}

</script>

<style lang="scss" scoped>
::v-deep .type-item {
  background: #c4c4c4;
  &.selected{
    background: white;
    &::after{
      display: none;
    }
  }
}

::v-deep .interval-tabs{
  height: 48px;
}

.money {
  display: flex;
  flex-direction: column;
  height: 100vh;

  & .content {
    flex-grow: 1;
    overflow: auto;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title{
  @extend %item;
  background-color: #c4c4c4;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>