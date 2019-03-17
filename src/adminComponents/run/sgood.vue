<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">公司信息</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-产品研发情况</h3>
          </div>
            <div class="form-group row">
                <form class="form-horizontal" role="form">  
                    <div class="col-md-2">
                        <div class="col-md-4 control-label" style="font-weight:900"><strong>公司名称</strong></div>
                        <div class="col-md-8">
                            <select class="form-control" v-model="company_id" @change="getGoodByCompany_id()">
                                <option v-for="(item,index) in company" :key="index" :value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div> 
          <div class="panel-body"> 
            <ul class="nav nav-tabs navtab-bg"> 
                <li class="active"> 
                    <a href="#me" data-toggle="tab" aria-expanded="true"> 
                        <span class="visible-xs"><i class="fa fa-home"></i></span> 
                        <span class="hidden-xs" @click="getGoodByCompany_id()">自研产品</span> 
                    </a> 
                </li> 
                <li class=""> 
                    <a href="#showoem" data-toggle="tab" aria-expanded="false"> 
                        <span class="visible-xs"><i class="fa fa-user"></i></span> 
                        <span class="hidden-xs" @click="showMyOEM()">代工产品</span> 
                    </a> 
                </li>
            </ul> 
            <div class="tab-content"> 
                <div class="tab-pane active" id="me"> 
                  <div class="table-responsive">
                    <table class="table table-striped table-hover" style id="datatable-editable">
                      <thead>
                        <tr>
                          <th>产品ID</th>
                          <th>产品名称</th>
                          <th>产品原理</th>
                          <th>产品介绍</th>
                          <th>申请状态</th>
                          <!-- <th>单价</th> -->
                          <th>默认最高单价</th>
                          <th>创建日期</th>
                          <th>产品代工授权</th>
                          <th>金</th>
                          <th>木</th>
                          <th>水</th>
                          <th>火</th>
                          <th>土</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="gradeX" v-for="(item,index) in showGood" :key="index">
                          <td>{{item.id}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.function}}</td>
                          <td>{{item.introduction}}</td>
                          <td>{{item.condition | formatCondition}}</td>
                          <!-- <td>{{item.price}}万</td> -->
                          <td>{{item.maxprice}}万</td>
                          <td>{{item.created_at | formatTime}}</td>
                          <td>
                            <!--产品通过-->
                              <a class="on-default" @click="deleteGood(item)" v-if="item.condition==1">
                                <i class="fa  fa-times" data-toggle="tooltip" data-placement="top" title="删除此产品"></i>
                              </a>
                              <a class="on-default" data-toggle="modal" data-target="#oem" @click="sendToCompany(item)" v-if="item.condition==1">
                                <i class="fa fa-link" data-toggle="tooltip" data-placement="top" title="授权此产品"></i>
                              </a>
                              <a class="on-default" data-toggle="modal" data-target="#company" @click="getOemCompany(item)" v-if="item.condition==1">
                                <i class="fa fa-reorder" data-toggle="tooltip" data-placement="top" title="查看授权公司信息"></i>
                              </a>
                            <!--产品未处理-->
                              <a class="on-default" @click="accessGood(item)">
                                <i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="允许产品通过"></i>
                              </a>
                              <a class="on-default" @click="stopGood(item)">
                                <i class="fa fa-stop" data-toggle="tooltip" data-placement="top" title="不允许产品通过"></i>
                              </a> 
                          </td>
                          <td>{{item.s1}}</td>
                          <td>{{item.s2}}</td>
                          <td>{{item.s3}}</td>
                          <td>{{item.s4}}</td>
                          <td>{{item.s5}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> 
                <div class="tab-pane" id="showoem">                  
                  <div class="table-responsive">
                    <table class="table table-striped table-hover" style id="datatable-editable">
                      <thead>
                        <tr>
                          <th>产品ID</th>
                          <th>产品名称</th>
                          <th>产品原理</th>
                          <th>产品介绍</th>
                          <th>申请状态</th>
                          <th>单价</th>
                          <th>默认最高单价</th>
                          <th>创建日期</th>
                          <th>产品授权方</th>
                          <th>金</th>
                          <th>木</th>
                          <th>水</th>
                          <th>火</th>
                          <th>土</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="gradeX" v-for="(item,index) in showOEM" :key="index" v-if='item.commerresearch'>
                          <td>{{item.id}}</td>
                          <td>{{item.commerresearch.name}}</td>
                          <td>{{item.commerresearch.function}}</td>
                          <td>{{item.commerresearch.introduction}}</td>
                          <td>{{item.commerresearch.condition | formatCondition}}</td>
                          <td>{{item.commerresearch.price}}</td>
                          <td>{{item.commerresearch.maxprice}}</td>
                          <td>{{item.created_at | formatTime}}</td>
                          <td>{{item.me_2.name}}</td>
                          <td>{{item.commerresearch.s1}}</td>
                          <td>{{item.commerresearch.s2}}</td>
                          <td>{{item.commerresearch.s3}}</td>
                          <td>{{item.commerresearch.s4}}</td>
                          <td>{{item.commerresearch.s5}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div> 
        </div>
        </div>
      </div>
      
    </div>

    <!-- oem -->
    <div id="oem" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">产品授权</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>授权指定公司代工生产</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                    <label class="col-md-2 control-label">公司名称</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="other">
                                            <option v-for="(item,index) in company" :key="index" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>         
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendOemToCompany()">授权到公司</button>
            </div>
        </div>
      </div>
    </div>
    <!-- company -->
    <div id="company" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">获取产品授权信息</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading" v-if="currentGoodItem"><h4>{{currentGoodItem.name}}授权信息</h4></div>
                        <div class="panel-body">
                            <div class="table-responsive">
                              <table class="table table-striped table-hover" style id="datatable-editable">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>公司名称</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr class="gradeX" v-for="(item,index) in showOemCompany" :key="index" v-if='item.other_2'>
                                    <td>{{index}}</td>
                                    <td>{{item.other_2.name}}</td>
                                    <td>{{item.created_at | formatTime}}</td>
                                    <td>
                                      <a class="on-default remove-row" @click="deleteOemCompanyItem(item)" data-dismiss="modal">
                                        <i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="撤销授权"></i>
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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
const moment = require("moment");
var App = app;

export default {
  name: "good",
  data() {
    return {
      company_id:'',
      Yearid:'',

      showGood: '',
      showOEM:'',
      company:'',
      company_id:'1',
      chooseGoodToOem:'',
      currentGoodItem:'',
      showOemCompany:'',

      other:''  //选则授权公司
    };
  },
  beforeMount() {
    this.userinfo = JSON.parse(ses.getSes("userinfo"));
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
    formatTime(val){
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    formatCondition(val){
      if(val==0) return '产品提交审核中'
      if(val==1) return '产品审核通过'
      if(val==-1) return '产品审核未通过'
    }
  },
  methods: {
    init(){
        this.getAllCompany()
    },
    //获取所有公司产品研发情况
    showAllGoods() {
      apis.getAllGoods()
      .then(res => {
          print.log(res.data);
          this.showGood = res.data
      })
    },
    // 获取指向公司产品研发情况
    getGoodByCompany_id() {
      apis.getOneGoodByCompanyId(this.company_id)
      .then(res => {
          print.log(res.data);
          this.showGood = res.data
      })
    },
    // 获取代工产品
    showMyOEM(){
      req.post_Param('api/oem',{
        'judge':8,
        'other':this.company_id
      })
      .then(res => {
          print.log(res.data);
          this.showOEM = res.data
      })
    },
    //获取公司列表
    getAllCompany(){
        apis.getAllCompany()
        .then(res => {
          this.company = res.data;
        })
    },
    // 选择公司，授权
    sendToCompany(item){
        this.chooseGoodToOem=item;
    },
    // 授权代工
    sendOemToCompany(){
      print.log('准备授权产品信息',this.chooseGoodToOem)
      if(this.company_id!=this.other){
        req.post_Param('api/oem',{
          'judge':1,
          'me':this.company_id,
          'other':this.other,
          'commerresearch_id':this.chooseGoodToOem.id
        })
        .then(res=>{
          print.log(res.data)
          if(res.data[1]){
            swal("产品授权成功!", `授权公司可以代工生产`, "success");
          }else if(!res.data[1]){
            swal("已经授权过此公司！", `请不要多次授权给同一公司`, "warning");
          }
        })
      }else{
        swal("不能授权给自己！", '', "warning");
      }      
    },
    // 获取产品代工信息
    getOemCompany(item){
      print.log('选中的产品信息',item)
      this.currentGoodItem=item
      req.post_Param('api/oem',{
        'judge':9,
        'me':this.company_id,
        'commerresearch_id':item.id
      })
      .then(res=>{
        print.log('产品授权公司信息',res.data)
        this.showOemCompany=res.data
      })
    },
    // 撤销授权
    deleteOemCompanyItem(item){
      req.post_Param('api/oem',{
        'judge':7,
        'other':item.other,
        'commerresearch_id':item.commerresearch_id
      })
      .then(res=>{
        print.log('撤销产品授权公司信息',res.data)
        swal("撤销产品授权公司信息成功!", `${item.other_2.name}不再开始代工生产${item.commerresearch.name}产品`, "success");
      })
    },
    // 通过产品
    accessGood(item){
        req.post_Param('/api/commerresearch',{
            'judge':2,
            'condition':1,
            'id':item.id
        })
        .then(res=>{
            print.log(res.data)
            swal("产品已审核通过!", '', "success");
            this.getGoodByCompany_id()
        })
    },
    // 不通过产品
    stopGood(item){
        req.post_Param('/api/commerresearch',{
            'judge':2,
            'condition':-1,
            'id':item.id
        })
        .then(res=>{
            print.log(res.data)
            swal("不允许产品通过成功!", '', "success");
            this.getGoodByCompany_id()
        })
    },
    // 删除产品
    deleteGood(item){
        req.post_Param('/api/commerresearch',{
            'judge':3,
            'id':item.id
        })
        .then(res=>{
            print.log(res.data)
            swal("删除产品成功!", '', "success");
            this.getGoodByCompany_id()
        })
    }
  }
};
</script>

<style>
</style>
