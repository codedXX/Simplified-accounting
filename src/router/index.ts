import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import EditLabel from '@/views/EditLabel.vue';
import NotFound from '@/views/NotFound.vue';



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect : '/money'
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/labels',
    name: 'labels',
    component: Labels,
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },{
    path: '/edit/:id',
    name:'EditLabel',
    component:EditLabel
  },
  {
    path:'/*',
    component: NotFound,
  }

]

const router = new VueRouter({
  routes
})

export default router
