<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">赛事运营</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-参赛公司资产情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <button class="btn btn-icon waves-effect waves-light btn-warning m-b-5" data-toggle="tooltip" data-target="#statistics" data-placement="top" title="初始化公司资产">
                <i class="fa fa-wrench" data-toggle="modal" data-target="#statistics"></i> 
              </button>
              <button class="btn btn-icon waves-effect waves-light btn-danger m-b-5" data-toggle="tooltip" data-target="#statistics" data-placement="top" title="删除所有公司资产" @click="deleteAll()"> 
                <i class="fa fa-remove"></i>
              </button>
              <table class="table table-striped table-hover" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>财年</th>
                    <th>公司名称</th>
                    <th>流动资金</th>
                    <th>固定资金</th>
                    <th>总资产</th>
                    <th>品牌价值</th>
                    <th>更新日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index">
                    <td>{{index}}</td>
                    <td>{{item.Yearid}}</td>
                    <td v-if="item.company">{{item.company.name}}</td>
                    <td v-else></td>
                    <td>{{item.float}}w</td>
                    <td>{{item.fixed}}w</td>
                    <td>{{item.total}}w</td>
                    <td>{{item.brand}}</td>
                    <td>{{item.updated_at|formatTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p><strong>注意:上图所示价格单位均为万元。</strong></p>
          </div>
        </div>
      </div>
    </div>    

    <!-- statistics -->
    <div id="statistics" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">参赛者公司资产初始化</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>资产初始化</h4></div>
                        <div class="panel-body">
                          <form class="form-horizontal" role="form">
                              <div class="form-group">
                                  <label for="inputEmail3" class="col-sm-3 control-label">流动资金(万)</label>
                                  <div class="col-sm-9">
                                    <input type="number" class="form-control" placeholder="3000" v-model="float">
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
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="initStastics()">初始化资产</button>
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
const notify = require("bootstrap-notify");

import app from "../../App.vue";
const moment = require("moment");
var App = app;

export default {
  name: "stransaction",
  data() {
    return {
      company_id:'',
      showTransaction: '',
      company:'',
      showItems:'',

      // 初始化资产
      float:3000
    };
  },
  beforeMount() {

  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  mounted() {
    this.init()
  },
  filters:{
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    init(){
      this.showAllStastics();
    },
    showAllStastics() {
      apis.getAllStatisticWithCompanyInfo()
      .then(res => {
          print.log(res.data);
          this.showItems = res.data;
      })
    },
    // 初始化参赛者公司资产信息
    initStastics(){
      apis.getAllCompany()
      .then(res=>{
        print.log('所有的公司信息->',res.data)
        for (let i = 0; i < res.data.length; i++) {
          const e = res.data[i];
          req.post_Param('api/statistic',{
            'judge':1,
            'id':0,
            'Yearid':1,
            'float':this.float,
            'fixed':0,
            'total':this.float,
            'brand':100,
            'condition':1,
            'company_id':e.id
          })
          .then(msg=>{
            // print.log(msg.data)
            if(i==res.data.length-1){
              this.init()
              swal("参赛公司资产初始化成功!", `你成功初始化了${res.data.length}个参赛公司资产信息！`, "success");              
            }
          })
        }
      })
    },
    // 删除所有公司资产信息
    deleteAll(){
      if(confirm('这将清空所有参赛者资产信息！请确认！')){
        req.post_Param('api/statistic',{'judge':6})
        .then(res=>{
          if(res.data.success){
            swal("清除公司资产信息成功!", ``, "success");  
            this.init()
          }
        })
      }
    }
  }
};
</script>

<style>
</style>
