import Vue from 'vue'
import Router from 'vue-router'

import login from '@/adminComponents/init/login'
import register from '@/adminComponents/init/register'
import menu from '@/adminComponents/init/menu'
import game from '@/adminComponents/init/game'
// users
import sway from '@/adminComponents/users/sway'
import admin from '@/adminComponents/users/admin'
import company from '@/adminComponents/users/company'
// game
import creatgame from '@/adminComponents/game/creatgame' 
import listgame from '@/adminComponents/game/listgame'
// run
import scompete from '@/adminComponents/run/scompete' 
import stransation from '@/adminComponents/run/stransation'
import sloan from '@/adminComponents/run/sloan'
import sstastics from '@/adminComponents/run/sstastics'
import syear from '@/adminComponents/run/syear'
import sgood from '@/adminComponents/run/sgood'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
      children:[
        {
          path:'sway',    //参赛者管理
          name:'sway',
          component:sway
        },
        {
          path:'admin',    //管理员管理
          name:'admin',
          component:admin
        },
        {
          path:'company',    //公司管理
          name:'company',
          component:company
        },
        {
          path:'creatgame',    //新建比赛
          name:'creatgame',
          component:creatgame
        },
        {
          path:'listgame',   //赛事列表
          name:'listgame',
          component:listgame
        },
        {
          path:'scompete',   //竞拍管理
          name:'scompete',
          component:scompete
        },
        {
          path:'stransation',   //交易管理
          name:'stransation',
          component:stransation
        },
        {
          path:'sloan',   //贷款管理
          name:'sloan',
          component:sloan
        },
        {
          path:'sgood',   //产品管理
          name:'sgood',
          component:sgood
        },
        {
          path:'sstastics',   //赛事数据
          name:'sstastics',
          component:sstastics
        },
        {
          path:'syear',   //赛事数据
          name:'syear',
          component:syear
        }
      ]
    }
  ]
})
