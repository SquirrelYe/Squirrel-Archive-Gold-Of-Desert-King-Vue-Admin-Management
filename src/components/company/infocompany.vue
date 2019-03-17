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
            <h3 class="panel-title">Sway商战大赛-公司组成管理</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>
                          <a @click="selcetAll()" href="javascript:void(0)">#</a>
                        </th>
                        <th>成员ID</th>
                        <th>姓名</th>
                        <th>职务</th>
                        <!-- <th>创建时间</th> -->
                        <th>执行操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="gradeX" v-for="(item,index) in showItems" :key="item.name">
                        <td>{{index}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.office}}</td>
                        <!-- <td>{{item.created_at}}</td> -->
                        <td class="actions" align='center'>
                          <a class="on-default edit-row" data-toggle="modal" data-target="#myModal" @click="editItem(item)">
                            <i class="fa fa-pencil"  data-toggle="tooltip" data-placement="top" title="编辑成员信息"></i>
                          </a>
                          <a class="on-default remove-row" @click="deleteItem(item)">
                            <i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="开除此成员"></i>
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

      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-公司信息</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped" style id="datatable-editable">
                    <thead>
                      <tr>
                        <th>公司ID</th>
                        <th>公司名称</th>
                        <th>公司法人</th>
                        <th>统一社会信用代码</th>
                        <th>经营范围</th>
                        <th>创建时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="gradeX">
                        <td>{{meinfo.id}}</td>
                        <td>{{meinfo.name}}</td>
                        <td>{{meinfo.legal}}</td>
                        <td>{{meinfo.code}}</td>
                        <td>{{meinfo.area}}</td>
                        <td>{{meinfo.created_at|formatTime}}</td>
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

    <!-- StandardModal -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">公司信息更新表</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <h4>公司成员信息介绍</h4>  
              <!-- <h5> {{model}}</h5> -->
              <address class="ng-scope">
                <strong>成员ID:</strong>{{model.id}}<br>
                <strong>成员姓名:</strong>{{model.name}}<br> 
                <strong>成员职务:</strong>{{model.office}}<br> 
                <!-- <strong>加入时间:</strong>{{model.created_at}}<br> -->
                <hr>
                <strong>更改职务信息：</strong><input type="text" v-model="office"><br>
                备注：常见的公司职位有：CEO、CMO、CTO、CFO、COO
                
              </address>             
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="modified(model.id)">确认修改</button>
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
  name: "infocompany",
  data() {
    return {
      showItems: "",
      select: [],
      isSelectedAll: false,
      //meinfo
      meinfo:'',
      //显示在修改栏
      model:'',
      office:''
    };
  },
  filters:{
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  mounted() {
    this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  methods: {
    init(){
      this.getPartner();
      this.showMe()
    },
    //获取公司 成员信息
    getPartner() {
      req.post_Param('/api/sway',{
        'judge':10,
        'company_id':JSON.parse(ses.getSes('userinfo')).company_id
      })
      .then(res => {
        print.log(res.data);
        this.showItems = res.data;
      })
    },
    //修改职位
    modified(uid){
      req.post_Param('api/sway',{
        'judge':11,
        'sway_id':uid,
        'office':this.office
      })
      .then(res => {
        print.log(res.data);
        this.init()
      })
    },
    //删除成员-提升框
    deleteItem(item) {
      let that=this
      if(confirm('确定删除吗')){
        that.dele(item)
      }else{

      }
    },
    //删除 数据库
    dele(item){
      req.post_Param('/api/ass/company_sway',{
        'judge':1,
        'sway_id':item.id
      })
      .then(res => {
        print.log(res.data);
        this.init()
        swal("删除成功!", "你开除了一名成员", "success");
      })
    },
    //显示自己公司信息
    showMe(){
      this.meinfo=JSON.parse(ses.getSes('userinfo')).company
      print.log(this.meinfo)
    },
    editItem(item){
      this.model=item
    }
  }
};
</script>

<style scoped>

</style>