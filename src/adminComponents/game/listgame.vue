<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">赛事管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">沙漠掘金后台管理系统-赛事列表</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="m-b-30" data-toggle="modal" data-target="#myindus" @click="add()">
                    <button id="addToTable" class="btn btn-primary waves-effect waves-light">新建比赛<i class="fa fa-plus"></i></button>
                </div>
              </div>
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
                        <th>天气地图</th>
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
                        <td class="actions">
                          <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="天气设置" @click="weather(item)">
                            <i class="fa  fa-cloud"  data-toggle="modal" data-target="#Model"></i>
                          </a>
                          <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="地图设置" @click="map(item)">
                            <i class="fa  fa-map"  data-toggle="modal" data-target="#Model"></i>
                          </a>
                        </td>
                        <td class="actions" align='center'>
                          <a class="waves-effect waves-light" @click="startGame(item)" data-toggle="tooltip" data-placement="top" title="启动比赛">
                            <i class="fa  fa-play"></i>
                          </a>
                          <a class="waves-effect waves-light" @click="pauseGame(item)" data-toggle="tooltip" data-placement="top" title="暂停比赛">
                            <i class="fa  fa-pause"></i>
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
                  <div class="col-sm-4">
                    <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                  </div>
                  <div class="col-sm-8">
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

    <div id="Model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width:55%">
          <div class="modal-content">
          <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" v-if="judge == 0">天气信息</h4>
          <h4 class="modal-title" v-if="judge == 1">地图信息</h4>
          </div>
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                          <!-- 天气 -->                          
                          <div class="table-responsive" v-if="judge == 0">
                            <table  class="table table-bordered table-striped table-hover" id="datatable-editable">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>日期ID</th>
                                  <th>日期</th>
                                  <th>沙漠</th>
                                  <th>绿洲</th>
                                  <th>古墓</th>
                                  <th>村庄</th>
                                  <th>藏宝山</th>
                                  <th>操作</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="gradeX" v-for="(item,index) in weatherItems" :key="index">
                                  <td>{{index+1}}</td>
                                  <td>W-{{item.id}}</td>
                                  <td>{{item.day}}</td>
                                  <td>{{item.whether_desert | formatWhether}}</td>
                                  <td>{{item.whether_oasis | formatWhether}}</td>    
                                  <td>{{item.whether_tomb | formatWhether}}</td>  
                                  <td>{{item.whether_village | formatWhether}}</td>    
                                  <td>{{item.whether_gold | formatWhether}}</td>   
                                  <td class="actions">
                                    <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="编辑天气" @click="editWeather(item)">
                                      <i class="fa  fa-pencil" data-toggle="modal" data-target="#edit"></i>
                                    </a>
                                </td>            
                                </tr>
                              </tbody>
                            </table>
                          </div> 
                          <div class="row" v-if="judge == 0">
                            <div class="col-sm-6">
                            </div>
                            <div class="col-sm-6">
                              <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                                <ul class="pagination" style="float:right">
                                  <li class="paginate_button previous" :class="{ disabled: wcurrentPage=='0' }">
                                    <a href="javascript:void(0)" @click="wpreviousPage()">上一页</a>
                                  </li>
                                  <li class="paginate_button" v-for="(item,index) in wsumPage" :key="index" :class="{ active: wcurrentPage==index }" >
                                    <a href="javascript:void(0)" @click="wswitchPage(index)">{{++index}}</a>
                                  </li>
                                  <li class="paginate_button next" :class="{ disabled: wcurrentPage==wsumPage-1 }">
                                    <a href="javascript:void(0)" @click="wnextPage()">下一页</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <!-- 地图 -->                          
                          <div class="table-responsive" v-if="judge == 1">
                            <table  class="table table-bordered table-striped table-hover" id="datatable-editable">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>地图ID</th>
                                  <th>地形</th>
                                  <th>操作</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="gradeX" v-for="(item,index) in mapItems" :key="index">
                                  <td>{{index+1}}</td>
                                  <td>M-{{item.id}}</td>
                                  <td>{{item.land | formatLand}}</td> 
                                  <td class="actions">
                                    <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="编辑地形" @click="editLand(item)">
                                      <i class="fa  fa-pencil" data-toggle="modal" data-target="#edit"></i>
                                    </a>
                                </td>            
                                </tr>
                              </tbody>
                            </table>
                          </div> 
                          <div class="row" v-if="judge == 1">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-8">
                              <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                                <ul class="pagination" style="float:right">
                                  <li class="paginate_button previous" :class="{ disabled: mcurrentPage=='0' }">
                                    <a href="javascript:void(0)" @click="mpreviousPage()">上一页</a>
                                  </li>
                                  <li class="paginate_button" v-for="(item,index) in msumPage" :key="index" :class="{ active: mcurrentPage==index }" >
                                    <a href="javascript:void(0)" @click="mswitchPage(index)">{{++index}}</a>
                                  </li>
                                  <li class="paginate_button next" :class="{ disabled: mcurrentPage==msumPage-1 }">
                                    <a href="javascript:void(0)" @click="mnextPage()">下一页</a>
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
          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
      </div> 
      <!-- 更新地图 天气 -->
      <div id="edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">编辑天气和地形</h4>
            </div>
            <!-- 天气 -->                          
            <div class="table-responsive" v-if="judge == 0 && editWeatherItem">
              <table  class="table table-bordered table-striped table-hover" id="datatable-editable">
                <thead>
                  <tr>
                    <th>日期ID</th>
                    <th>日期</th>
                    <th>沙漠</th>
                    <th>绿洲</th>
                    <th>古墓</th>
                    <th>村庄</th>
                    <th>藏宝山</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX">
                    <td>W-{{editWeatherItem.id}}</td>
                    <td>{{editWeatherItem.day}}</td>
                    <td>
                      <select class="form-control" v-model="editWeatherItem.whether_desert">
                          <option v-for="(item,index) in weatherType" :key="index" :value="item.type">{{item.type | formatWhether}}</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="editWeatherItem.whether_oasis">
                          <option v-for="(item,index) in weatherType" :key="index" :value="item.type">{{item.type | formatWhether}}</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="editWeatherItem.whether_tomb">
                          <option v-for="(item,index) in weatherType" :key="index" :value="item.type">{{item.type | formatWhether}}</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="editWeatherItem.whether_village">
                          <option v-for="(item,index) in weatherType" :key="index" :value="item.type">{{item.type | formatWhether}}</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="editWeatherItem.whether_gold">
                          <option v-for="(item,index) in weatherType" :key="index" :value="item.type">{{item.type | formatWhether}}</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> 

            <!-- 地形 -->                          
            <div class="table-responsive" v-if="judge == 1 && editMapItem">
              <table  class="table table-bordered table-striped table-hover" id="datatable-editable">
                <thead>
                  <tr>
                    <th>地形ID</th>
                    <th>地形</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX">
                    <td>M-{{editMapItem.id}}</td>
                    <td>
                      <select class="form-control" v-model="editMapItem.land">
                          <option v-for="(item,index) in landType" :key="index" :value="item.type">{{item.type | formatLand}}</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> 
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="confirmEditWeatherItem()" v-if="judge == 0">确认更改</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="confirmEditMapItem()" v-if="judge == 1">确认更改</button>
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

const moment = require('moment');

export default {
  name: "listgame",
  data() {
    return {
      currentItem:null,
      judge:0,
      editWeatherItem:null,
      editMapItem:null,
      // 天气种类
      weatherType:[ {type : 0}, {type : 1}, {type : 2}, {type : 3} ],
      // 地形种类
      landType:[ {type : 0}, {type : 1}, {type : 2}, {type : 3},  {type : 4}, {type : 5}],
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
      // 分页数据天气
      weatherItems:[],
      mapItems:[],
      wcurrentPage: "0",
      wsumPage: null,
      mcurrentPage: "0",
      msumPage: null,
    };
  },
  filters:{
    formatTime(x){
      return moment(x).format('YYYY-MM-DD HH:mm:ss')
    },
    formatCondition(x){
      if(x==-1) return '比赛已暂停';
      if(x==0) return '比赛未开始';
      if(x==1) return '比赛正在进行';
      if(x==2) return '比赛已结束';
    },
    formatWhether(x) {
      if (x == -1) return '大本营';
      if (x == 0) return '晴天';
      if (x == 1) return '高温';
      if (x == 2) return '沙尘暴';
      if (x == 3) return '高温沙尘暴';
    },
    formatLand(land) {
      if (land == 0) return '大本营';
      if (land == 1) return '沙漠';
      if (land == 2) return '绿洲';
      if (land == 3) return '村庄';
      if (land == 4) return '王陵';
      if (land == 5) return '藏宝山';
    },
  },
  mounted() { this.init() },
  updated() {  $(function () { $("[data-toggle='tooltip']").tooltip(); }); },
  methods: {
    init(){ this.getshowItems(); },
    // 添加
    add(){ s_alert.Warning('请联系后台技术人员处理','涉及到权限问题，您暂时无法处理') },
    // 获取所有比赛列表
    getshowItems() {
      apis.getAllGame()
      .then(res => {
        print.log(res.data);
        // 分页
        this.currentPage='0'
        this.show(res.data.rows)
      })
    },
    // 天气
    weather(){
      this.judge = 0
      apis.getWeather()
      .then(res=>{
        console.log('天气信息',res.data)
        // 分页
        this.wcurrentPage='0'
        this.wshow(res.data.rows)
      })
    },
    // 地图
    map(){
      this.judge = 1
      apis.getMap()
      .then(res=>{
        console.log('地图信息',res.data)
        // 分页
        this.mcurrentPage='0'
        this.mshow(res.data.rows)
      })
    },
    // 编辑天气
    editWeather(item){
      console.log('编辑天气',item)
      this.editWeatherItem = JSON.parse(JSON.stringify(item))
    },
    // 编辑地图
    editLand(item){
      console.log('编辑地图',item)
      this.editMapItem = JSON.parse(JSON.stringify(item))
    },
    // 提交天气修改
    confirmEditWeatherItem(){
      console.log('提交修改',this.editWeatherItem)
      let w = this.editWeatherItem
      apis.editWeather(w.id, w.whether_desert ,w.whether_oasis, w.whether_village ,w.whether_gold ,w.whether_tomb)
      .then(res=>{
        console.log(res.data)
        this.weather()
        s_alert.Success('天气修改成功','你可以继续修改','success')
      })
    },
    // 提交地形修改
    confirmEditMapItem(){
      console.log('提交修改',this.editMapItem)
      let w = this.editMapItem
      apis.editMap(w.id, w.land)
      .then(res=>{
        console.log(res.data)
        this.map()
        s_alert.Success('地形修改成功','你可以继续修改','success')
      })
    },
    // 确认删除比赛
    deleteGame(item) {
      print.log('删除比赛信息->',item);
      if(confirm('确定删除吗')){
        this.dele(item)
      }    
    },    
    // 删除比赛
    dele(del){
      apis.delOneGameById(del.id)
      .then(res => {
        if(res.data.affectRows === 1){
            this.init()
            s_alert.Success("删除成功!", "成功移除了一场比赛", "success");
          }else{
            this.init()
            s_alert.Success("删除失败!", "请检查", "warning");
          }
      })
    },
    // 开始比赛
    startGame(item){
      apis.updateOneGameById(item.id,1)
      .then(res => {
        if(res.data[0] === 1){
            this.init()
            s_alert.Success("比赛开始成功!", "成功开始了一场比赛", "success");
          }else{
            this.init()
            s_alert.Success("开始失败!", "请检查", "warning");
          }
      })
    },
    // 暂停比赛
    pauseGame(item){
        apis.updateOneGameById(item.id,-1)
        .then(res => {
            if(res.data[0] === 1){
                this.init()
                s_alert.Success("比赛暂停成功!", "成功暂停了一场比赛", "success");
            }else{
                this.init()
                s_alert.Success("暂停失败!", "请检查", "warning");
            }
        })
    },
    // 结束比赛
    stopGame(item){
      apis.updateOneGameById(item.id,2)
      .then(res => {
        if(res.data[0] === 1){
            this.init()
            s_alert.Success("比赛已结束!", "成功结束了一场比赛", "success");
          }else{
            this.init()
            s_alert.Success("操作失败!", "请检查", "warning");
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
    },
    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    wshow(items) {
      this.items=items;
      this.wsumPage = Math.ceil(this.items.length / 10);
      //页面加载完成，默认加载第一页
      let page = Number(this.wcurrentPage) + 1;
      this.wshowEachPage(page);
    },
    wswitchPage(page) {
      let p = page - 1;
      this.wcurrentPage = `${p}`;
      print.log("当前-->", page);
      this.wshowEachPage(page);
    },
    wshowEachPage(page) {
      let all = this.items;
      this.weatherItems = [];
      for (
        let i = (page - 1) * 10;
        i < page * 10;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.weatherItems.push(all[i]);
        }
      }
    },
    wnextPage() {
      if (this.wcurrentPage == this.wsumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.wcurrentPage) + 1;
        this.wcurrentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.wshowEachPage(p + 1);
      }
    },
    wpreviousPage() {
      if (this.wcurrentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.wcurrentPage) - 1;
        this.wcurrentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.wshowEachPage(p + 1);
      }
    },
    //结束分页
    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    mshow(items) {
      this.items=items;
      this.msumPage = Math.ceil(this.items.length / 10);
      //页面加载完成，默认加载第一页
      let page = Number(this.mcurrentPage) + 1;
      this.mshowEachPage(page);
    },
    mswitchPage(page) {
      let p = page - 1;
      this.mcurrentPage = `${p}`;
      print.log("当前-->", page);
      this.mshowEachPage(page);
    },
    mshowEachPage(page) {
      let all = this.items;
      this.mapItems = [];
      for (
        let i = (page - 1) * 10;
        i < page * 10;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.mapItems.push(all[i]);
        }
      }
    },
    mnextPage() {
      if (this.mcurrentPage == this.msumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.mcurrentPage) + 1;
        this.mcurrentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.mshowEachPage(p + 1);
      }
    },
    mpreviousPage() {
      if (this.mcurrentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.mcurrentPage) - 1;
        this.mcurrentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.mshowEachPage(p + 1);
      }
    }
  }
};
</script>

<style scoped>

</style>