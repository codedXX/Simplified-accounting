<template>
    <Layout>
<!--      {{record}}-->
<!--      {{recordList}}-->
      <Tags @update:value="record.tags=$event"/>
      <Notes class="notes"  remarks="备注" placeHolder="请输入备注" :value="record.notes" @update:value="onUpdateNotes" />
      <Tabs :data-source="typeList"
            :value.sync="record.type"/>
      <NumberPad :value.sync="record.amount" @submit="saveRecordList"/>
    </Layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tabs from '@/components/Tabs.vue';


type RecordItem ={
  tags:string[],
  notes:string,
  type:string,
  amount:number,
  createdAt?: string
}


@Component({
  components: {Tabs, NumberPad, Notes, Tags}
})
export default class Money extends Vue {
  typeList=[
    { text: '支出', value: '-' },
    { text: '收入', value: '+' },
  ];

  get recordList() {
    return this.$store.state.recordList;
  }

  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }


  saveRecordList(){
    // const record2 = recordListModel.clone(this.record);
    // const recordItem=this.recordList.push(record2);
    this.$store.commit('createRecord', this.record);
  }

}
</script>

<style lang="scss" scoped>
.notes{
  padding: 12px 0;
}
</style>