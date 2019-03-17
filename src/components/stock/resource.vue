<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">库存管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-原料库存情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>原料类型</th>
                    <th>所属公司</th>
                    <th>总量</th>
                    <th>创建时间</th>
                    <th>最后更新时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index" v-if="item.sum>0">
                    <td>{{index}}</td>
                    <td v-if="item.source">{{item.source.name}}</td><td v-else></td>
                    <td v-if="item.company">{{item.company.name}}</td><td v-else></td>
                    <td>{{item.sum}}</td>
                    <td>{{item.created_at|formatTime}}</td>
                    <td>{{item.updated_at|formatTime}}</td>
                    <td class="actions" align="center">
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="产品上架" @click="openSetting(item)">
                        <i class="fa fa-tags" data-toggle="modal" data-target="#myModal1"></i>
                      </a>
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="定向发送" @click="chooseResource(item)">
                        <i class="fa fa-external-link-square" data-toggle="modal" data-target="#toCompany"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 分页 -->
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

    <!-- model -->
    <div id="myModal1" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">原料操作</h4>
            </div>

            <div class="modal-body" align='center'>
              <div class="modal-content p-0">
                <ul class="nav nav-tabs navtab-bg nav-justified">
                    <li class="active"> 
                        <a href="#profile-2" data-toggle="tab" aria-expanded="true"> 
                            <span class="visible-xs"><i class="fa fa-user"></i></span> 
                            <span class="hidden-xs" style="font-size:23px">原料上架</span> 
                        </a> 
                    </li> 
                </ul> 
                <div class="tab-content"> 
                  <div class="tab-pane active" id="profile-2" v-if="currentChooseditem">
                    <address class="ng-scope" align='center'>
                      <strong>原料名称:</strong>{{currentChooseditem.source.name}}<br> 
                      <strong>产品库存:</strong>{{currentChooseditem.sum}}<br> 
                    </address>
                  </div> 
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">                                    
                        <div class="form-group">
                            <label class="col-md-2 control-label">上架数量</label>
                            <div class="col-md-10">
                              <input type="number" class="form-control"  v-model="giveSourceNumber" @input="checkNumber()">
                            </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">原料单价</label>
                          <div class="col-sm-10">
                              <input type="number" class="form-control"  v-model="giveSourcePrice">
                          </div>
                      </div>                         
                    </form>
                  </div><hr>
                  备注：产品单价单位为万元。
                </div> 
              </div>             
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>      
              <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="toPublic(currentChooseditem)" v-if="currentChooseditem.sum>0">原料上架</button>
            </div>
        </div>
      </div>
    </div>

     <div id="toCompany" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">定向原料发送</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                  <label class="col-md-2 control-label">公司名称</label>
                                  <div class="col-md-10">
                                      <select class="form-control" v-model="toCompany">
                                          <option v-for="(item,index) in allCompany" :key="index" :value="item.id">{{item.name}}</option>
                                      </select>
                                  </div>
                                </div>                                      
                                <div class="form-group">
                                  <label class="col-md-2 control-label">原料数量</label>
                                  <div class="col-md-10">
                                    <input type="number" class="form-control" v-model="number">
                                  </div>   
                                </div>                          
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>            
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendResourceToCompany()" v-if="number>0 && number<=sendResourceItem.sum && toCompany!=company_id">定向发送原料</button>
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
const moment = require("moment");
const async=require('async')
var App = app;

export default {
  name: "resource",
  data() {
    return {
      // 比赛信息
      company_id:'',
      Yearid:'',

      showMiniYield: '',
      currentChooseditem:'',

      // 原料上架信息
      giveSourceNumber:0,
      giveSourcePrice:0,

      // 定向发送原料信息
      sendResourceItem:'',
      allCompany:'',
      toCompany:'',
      number:0,
      
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  beforeMount() {
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;    
  },
  mounted() {
    this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  filters:{
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    init(){
      this.showMyCompete()
    },
    //获取自己的 industryyield_commerresearch 的产品
    showMyCompete() {
      req.post_Param('api/miniyield',{
        'judge':4,
        'company_id':JSON.parse(ses.getSes('userinfo')).company_id
      })
      .then(res => {
        print.log(res.data);
        this.showMiniYield = res.data;
        // 分页
        this.currentPage='0'
        this.show(res.data)
      })
    },
    // 选择
    openSetting(item){
      this.currentChooseditem=item
      print.log(item)
    },
    // 检测上架数量
    checkNumber(){
      if(this.giveSourceNumber>this.currentChooseditem.sum){
        s_alert.Success("上架数量超过当前元素储量", "请重新输入……", "warning");
        this.giveSourceNumber=0
      }
    },
    // 上架
    toPublic(model){
      if(this.giveSourceNumber>0 && this.giveSourcePrice>0){
        print.log('原料上架信息',model)
        let company_id=JSON.parse(ses.getSes('userinfo')).company_id
        let Yearid=JSON.parse(ses.getSes('gameinfo')).Yearid
        req.post_Param('api/transaction',{
          'judge':1,
          'Yearid':Yearid,
          'inout':1,
          'type':2,
          'kind':1,
          'price':this.giveSourcePrice,
          'number':this.giveSourceNumber,
          'me':company_id,
          'source_id':model.source_id
        })
        .then(res => {
          print.log(res.data);
          s_alert.Success("原料上架成功", "正在加载……", "success");
          this.updateSum(model)
        })
      }else{
        s_alert.Success("原料上架失败", "数量或单价填写有误", "warning");
      }
    },
    // 更新库存
    updateSum(model){
      req.post_Param('api/miniyield',{
        'judge':2,
        'id':model.id,
        'sum':model.sum-this.giveSourceNumber
      })
      .then(res => {        
        this.init()
        s_alert.Success("库存更新成功", "正在加载……", "success");
      })
    },
    // 选择原料发送
    chooseResource(item){
      this.sendResourceItem=item;
      this.toCompany=''
      this.number=0
      this.getAllCompany()
      print.log('选择的原料信息->',item)
    },
    // 获取公司信息
    getAllCompany(){
      apis.getAllCompany()
      .then(res=>{
        this.allCompany=res.data;
      })
    },
    // 发送原料
    sendResourceToCompany(){
      print.log(this.sendResourceItem,this.number,this.toCompany)
      let that=this
      async.series([
        //串行同时执行
        callback=>{          
            //findOrCreate 创造并查询宿主库存信息      
            that.getCompanyResourceStock(that.sendResourceItem,that.toCompany,callback);
        },
        callback=>{
            //findOrCreate 查询自己库存信息
            that.getCompanyResourceStock(that.sendResourceItem,that.company_id,callback);            
        }],
        function(err, results) {
            //等上面两个执行完返回结果，执行更新库存数量
            print.log('更新库存统计信息',results)
            that.updateResourceStock(results,that.number);
        })
    },
    //findOrCreate 创造宿主库存信息
    getCompanyResourceStock(item,to,callback){
      req.post_Param('api/miniyield',{
        'judge':1,
        'id':0,
        'sum':0,
        'company_id':to,
        'source_id':item.source_id
      })
      .then(res => {
        print.log('创造宿主库存信息',res.data)
        callback(null,res.data)
      })
    },
    // 执行更新库存数量
    updateResourceStock(results,number){
      // 增加宿主方的库存数量
      req.post_Param('api/miniyield',{
        'judge':6,
        'sum':results[0][0].sum+number,
        'company_id':results[0][0].company_id,
        'source_id':results[0][0].source_id
      })
      .then(res => {
        print.log('更新宿主库存信息',res.data)
      })
      // 减少自己（代工方）的库存数量
      req.post_Param('api/miniyield',{
        'judge':6,
        'sum':results[1][0].sum-number,
        'company_id':results[1][0].company_id,
        'source_id':results[1][0].source_id
      })
      .then(res => {
        print.log('更新自己库存信息',res.data)
      })
      // 写入交易
      req.post(`api/transaction?judge=1&id=0&Yearid=${this.Yearid}&inout=1&type=1&kind=1&number=${number}&me=${this.company_id}&other=${results[0][0].company_id}&source_id=${results[0][0].source_id}`)
      this.init()
      s_alert.Success("定向原料发送成功！", "正在加载……", "success");
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

<style>
</style>
