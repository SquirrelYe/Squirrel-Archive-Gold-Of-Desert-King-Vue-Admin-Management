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
            <h3 class="panel-title">Sway商战大赛-产品库存情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>产品名称</th>
                    <th>库存</th>
                    <th>创建时间</th>
                    <th>最后更新时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index" v-if="item.sum>0">
                    <td>{{index}}</td>
                    <td v-if="item.commerresearch">{{item.commerresearch.name}}</td><td v-else></td>                    
                    <td>{{item.sum}}</td>
                    <td>{{item.created_at|formatTime}}</td>
                    <td>{{item.updated_at|formatTime}}</td>
                    <td class="actions" align="center">
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="产品上架"  @click="chooseGoodItem(item)">
                        <i class="fa fa-tags" data-toggle="modal" data-target="#toPublic"></i>
                      </a>
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="定向发送" @click="chooseOEMItem(item)">
                        <i class="fa  fa-external-link-square" data-toggle="modal" data-target="#toOEM"></i>
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
    <div id="toPublic" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">产品操作</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="modal-content p-0">
                <ul class="nav nav-tabs navtab-bg nav-justified">
                    <li class="active"> 
                        <a href="#profile-2" data-toggle="tab" aria-expanded="true"> 
                            <span class="visible-xs"><i class="fa fa-user"></i></span> 
                            <span class="hidden-xs" style="font-size:23px;">普通产品上架</span> 
                        </a> 
                    </li> 
                </ul> 
                <div class="tab-content"> 
                    <div class="tab-pane active" id="profile-2" v-if="currentShowGoodItem">
                      <address class="ng-scope" align='center' v-if="currentShowGoodItem.commerresearch">
                        <strong>产品名称:</strong>{{currentShowGoodItem.commerresearch.name}}<br>
                        <strong>产品单价:</strong>{{currentShowGoodItem.commerresearch.price}}<br> 
                        <strong>产品配方:</strong><br> 
                        <strong>
                            金：{{currentShowGoodItem.commerresearch.s1|sumSource(1)}}
                            木：{{currentShowGoodItem.commerresearch.s2|sumSource(1)}}
                            水：{{currentShowGoodItem.commerresearch.s3|sumSource(1)}}
                            火：{{currentShowGoodItem.commerresearch.s4|sumSource(1)}}
                            土：{{currentShowGoodItem.commerresearch.s5|sumSource(1)}}
                        </strong><br>
                        <strong>产品库存:</strong>{{currentShowGoodItem.sum}}<br> 
                        <strong style="color:red">最高单价:{{maxPrice}}万元</strong><br> 
                      </address>
                    </div> 
                    <div class="panel-body">
                    <form class="form-horizontal" role="form">                                    
                        <div class="form-group">
                            <label class="col-md-2 control-label">上架数量</label>
                            <div class="col-md-10">
                              <input type="number" class="form-control"  v-model="giveGoodNumber" @input="checkNumber()">
                            </div>
                        </div>
                        <div class="form-group">
                          <label class="col-sm-2 control-label">产品单价</label>
                          <div class="col-sm-10">
                              <input type="number" class="form-control"  v-model="giveGoodPrice" @input="checkMaxPrice()">
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
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="toPublic(currentShowGoodItem)" v-if="currentShowGoodItem.sum>0">产品上架</button>
            </div>
        </div>
      </div>
    </div>

    <!-- toOEM -->
    <div id="toOEM" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">定向产品发送</h4>
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
                                      <select class="form-control" v-model="oemCompany">
                                          <option v-for="(item,index) in showOemCompany" :key="index" :value="item.id">{{item.name}}</option>
                                      </select>
                                  </div>
                                </div>                                      
                                <div class="form-group">
                                  <label class="col-md-2 control-label">产品数量</label>
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
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="toOem()" v-if="number>0 && number<=currentOemItem.sum && oemCompany!=company_id">定向发送产品</button>
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
const notify = require("bootstrap-notify");
var App = app;

export default {
  name: "resource",
  data() {
    return {
      company_id:'',
      Yearid:'',

      showStock: '',
      judgeShow:0,
      currentShowGoodItem:'',   
      currentOemItem:'', 
      showOemCompany:'',
      oemCompany:'',
      number:0,

      // 产品上架信息
      maxPrice:0,
      giveGoodNumber:0,
      giveGoodPrice:0,

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
    formatIsPublic(val){
      if(val==0) return '产品未上架';
      if(val==1) return '产品已上架';
    },
    judgeType(val){
      if(val==0) return '普通产品';
      if(val==1) return '代工产品';
    },
    sumSource(x,y) {
      return x * y
    },
  },
  methods: {
    init(){
      this.showMyCompete()
    },
    //获取自己的 industryyield_commerresearch 的产品
    showMyCompete() {
      req.post_Param('api/ass/industryyield_commerresearch',{
        'judge':3,
        'company_id':JSON.parse(ses.getSes('userinfo')).company_id,
      })
      .then(res => {
          print.log(res.data);
          this.showStock = res.data;
          // 分页
          this.currentPage='0'
          this.show(res.data)
      })
    },
    // 选择产品
    chooseGoodItem(item){
      print.log('选择的产品',item)
      this.currentShowGoodItem=item
      // 计算最高单价
      let sum=0,total=0;
      if(item.commerresearch.s1!=0) {sum++; total+=item.commerresearch.s1};
      if(item.commerresearch.s2!=0) {sum++; total+=item.commerresearch.s2};
      if(item.commerresearch.s3!=0) {sum++; total+=item.commerresearch.s3};
      if(item.commerresearch.s4!=0) {sum++; total+=item.commerresearch.s4};
      if(item.commerresearch.s5!=0) {sum++; total+=item.commerresearch.s5};
      // 获取商业用地品牌提升
      req.post_Param('api/commerland',{
        'judge':6,
        'id':item.commerresearch.commerland_id
      })
      .then(res=>{
        print.log(res.data)
        this.maxPrice=(total*Math.sqrt(sum)*(1+res.data.brand)*0.1).toFixed(2)
      })
    },
    // 选中代工产品
    chooseOEMItem(item){
      this.currentOemItem=item
      print.log('选中的代工产品',item)
      this.getAllCompany()
    },
    // 检查定价
    checkMaxPrice(){
      print.log(this.maxPrice)
      if(this.giveGoodPrice>this.maxPrice){
        s_alert.Success("产品单价不能超过最高单价", "请调整单价", "warning");
        this.giveGoodPrice=0;
      }
    },
    // 检测上架数量
    checkNumber(){
      if(this.giveGoodNumber>this.currentShowGoodItem.sum){
        s_alert.Success("上架数量超过当前元素储量", "请重新输入……", "warning");
        this.giveGoodNumber=0
      }
    },
    // 上架
    toPublic(model){
      if(this.giveGoodNumber>0 && this.giveGoodPrice>0){
        print.log(model)
        let company_id=JSON.parse(ses.getSes('userinfo')).company_id
        let Yearid=JSON.parse(ses.getSes('gameinfo')).Yearid
        req.post_Param('api/transaction',{
          'judge':1,
          'Yearid':Yearid,
          'inout':1,
          'type':2,
          'kind':2,
          'price':this.giveGoodPrice,
          'number':this.giveGoodNumber,
          'me':company_id,
          'commerresearch_id':model.commerresearch_id
        })
        .then(res => {
          console.log(res.data);
          s_alert.Success("产品上架成功", "正在加载……", "success");
          this.updateSum(model)
        })
      }else{
        s_alert.Success("原料上架失败", "数量或单价填写有误", "warning");
      }
    },
    // 更新库存
    updateSum(model){
      req.post_Param('api/industryyield',{
        'judge':2,
        'id':model.id,
        'sum':model.sum-this.giveGoodNumber
      })
      .then(res => {        
        this.init()
        s_alert.Success("库存更新成功", "正在加载……", "success");
      })
    },
    // 发送到代工公司
    toOem(){
      print.log(this.currentOemItem,this.number,this.oemCompany)
      let that=this
      async.series([
        //串行同时执行
        callback=>{          
            //findOrCreate 创造并查询宿主库存信息      
            that.getCompanyStock(that.currentOemItem,that.oemCompany,callback);
        },
        callback=>{
            // 查询自己库存信息
            that.getCompanyStock(that.currentOemItem,that.company_id,callback);            
        }],
        function(err, results) {
            //等上面两个执行完返回结果，执行更新库存数量
            print.log('更新库存统计信息',results)
            that.updateStock(results,that.number);
        })
    },
    //findOrCreate 创造宿主库存信息
    getCompanyStock(item,oem,callback){
      req.post_Param('api/industryyield',{
        'judge':1,
        'id':0,
        'kind':1,
        'sum':0,
        'company_id':oem,
        'commerresearch_id':item.commerresearch_id
      })
      .then(res => {
        print.log('创造宿主库存信息',res.data)
        callback(null,res.data)
      })
    },
    // 执行更新库存数量
    updateStock(results,number){
      // 增加宿主方的库存数量
      req.post_Param('api/industryyield',{
        'judge':6,
        'sum':results[0][0].sum+number,
        'company_id':results[0][0].company_id,
        'commerresearch_id':results[0][0].commerresearch_id
      })
      .then(res => {
        print.log('更新宿主库存信息',res.data)
      })
      // 减少自己（代工方）的库存数量
      req.post_Param('api/industryyield',{
        'judge':6,
        'sum':results[1][0].sum-number,
        'company_id':results[1][0].company_id,
        'commerresearch_id':results[1][0].commerresearch_id
      })
      .then(res => {
        print.log('更新自己库存信息',res.data)
      })
      // 写入交易
      req.post(`api/transaction?judge=1&id=0&Yearid=${this.Yearid}&inout=1&type=1&kind=2&number=${number}&me=${this.company_id}&other=${results[0][0].company_id}&commerresearch_id=${results[0][0].commerresearch_id}`)
      this.init()
      s_alert.Success("定向产品发送成功！", "正在加载……", "success");
    },
    //获取公司列表-发送代工产品
    getAllCompany(){
        apis.getAllCompany()
        .then(res => {
          this.showOemCompany = res.data;
        })
    },
    // 发送代工产品信息
    sendOemCompanyItem(item){
      print.log('代工产品信息->',item)
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
