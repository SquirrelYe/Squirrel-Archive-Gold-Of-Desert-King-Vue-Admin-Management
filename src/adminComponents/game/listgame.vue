<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">公司管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-赛事列表</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>赛事ID</th>
                        <th>赛事名称</th>
                        <th>开始时间</th>
                        <th>持续时间</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>创建时间</th>
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="gradeX" v-for="(item,index) in showItems" :key="item.name">
                        <td>{{index}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.start}}</td>
                        <td>{{item.stay}}</td>
                        <td>{{item.condition|formatCondition}}</td>
                        <td>{{item.detail}}</td>
                        <td>{{item.created_at|formatTime}}</td>
                        <td class="actions" align='center'>
                          <a class="waves-effect waves-light" @click="startGame(item)" data-toggle="tooltip" data-placement="top" title="启动比赛">
                            <i class="fa  fa-play"></i>
                          </a>
                          <a class="waves-effect waves-light" @click="stopGame(item)" data-toggle="tooltip" data-placement="top" title="结束比赛">
                            <i class="fa  fa-stop"></i>
                          </a>
                          <a class="waves-effect waves-light" @click="deleteGame(item)" data-toggle="tooltip" data-placement="top" title="删除比赛">
                            <i class="ii ion-close"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                  </div>
                  <div class="col-sm-6">
                    <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                      <ul class="pagination" style="float:right">
                        <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                          <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                        </li>
                        <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                          <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                        </li>
                        <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                          <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../utils/api/apis");

import app from "../../App.vue";
const moment = require('moment');
var App = app;

export default {
  name: "listgame",
  data() {
    return {
      company_id:'',
      Yearid:'',
      
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  filters:{
    formatTime(x){
      return moment(x).format('YYYY-MM-DD HH:mm:ss')
    },
    formatCondition(x){
      if(x==0) return '比赛未开始';
      if(x==1) return '比赛正在进行';
      if(x==2) return '比赛已结束';
    },
  },
  beforeMount(){
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  mounted() {
      this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  methods: {
    init(){
        this.getshowItems();
    },
    // 获取所有比赛列表
    getshowItems() {
      apis.getAllGame()
      .then(res => {
        print.log(res.data);
        // 分页
        this.currentPage='0'
        this.show(res.data)
      })
    },
    // 确认删除比赛
    deleteGame(item) {
      print.log('删除比赛信息->',item);
      let del=item
      let that=this
      if(confirm('确定删除吗')){
        that.dele(del)
      }else{

      }      
    },    
    // 删除比赛
    dele(del){
      req.post_Param('api/game',{
        'judge':3,
        'id':del.id
      })
      .then(res => {
        if(res.data.success){
            this.init()
            swal("删除成功!", "", "success");
          }else{
            this.init()
            swal("删除失败!", "请检查", "warning");
          }
      })
    },
    // 开始比赛
    startGame(item){
      req.post_Param('api/game',{
        'judge':2,
        'id':item.id,
        'condition':1
      })
      .then(res => {
        if(res.data.success){
            this.init()
            swal("启动比赛成功!", "", "success");
          }else{
            this.init()
            swal("启动失败!", "请检查", "warning");
          }
      })
    },
    // 开始比赛
    stopGame(item){
      req.post_Param('api/game',{
        'judge':2,
        'id':item.id,
        'condition':2
      })
      .then(res => {
        if(res.data.success){
            this.init()
            swal("结束比赛成功!", "", "success");
          }else{
            this.init()
            swal("结束失败!", "请检查", "warning");
          }
      })
    },

    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    show(items) {
      this.items=items;
      this.sumPage = Math.ceil(this.items.length / this.PageShowSum);
      //页面加载完成，默认加载第一页
      let page = Number(this.currentPage) + 1;
      this.showEachPage(page);
      print.log("当前数据总页为：--->", this.sumPage);
    },
    switchPage(page) {
      let p = page - 1;
      this.currentPage = `${p}`;
      print.log("当前-->", page);
      this.showEachPage(page);
    },
    showEachPage(page) {
      let all = this.items;
      this.showItems = [];
      for (
        let i = (page - 1) * this.PageShowSum;
        i < page * this.PageShowSum;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.showItems.push(all[i]);
        }
      }
    },
    nextPage() {
      if (this.currentPage == this.sumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.currentPage) + 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    },
    previousPage() {
      if (this.currentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.currentPage) - 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    }
    //结束分页
  }
};
</script>

<style scoped>

</style>