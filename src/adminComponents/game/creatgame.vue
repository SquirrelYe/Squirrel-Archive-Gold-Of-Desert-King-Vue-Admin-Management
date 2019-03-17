<template>
    <div class="container">
        <!-- Page-Title -->
        <div class="row">
            <div class="col-sm-12">
                <h4 class="pull-left page-title">赛事管理</h4>
            </div>
        </div>
        
        <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title">Sway商战大赛-新建比赛</h3></div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-md-2 control-label">赛事名称</label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" placeholder="xxx比赛" v-model="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email" >开始时间</label>
                            <div class="col-md-10">
                                <input class="form-control" placeholder="xxxx年xx月xx日" v-model="start">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email" >持续时间</label>
                            <div class="col-md-10">
                                <input class="form-control" placeholder="xxx分钟" v-model="stay">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">赛事备注</label>
                            <div class="col-md-10">
                                <input class="form-control" placeholder="xxxx" v-model="detail">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label"></label>
                            <div class="col-md-10">
                            <button type="button" class="btn btn-block btn-lg btn-success waves-effect waves-light" @click="submitForm()">创建赛事</button>
                            </div>
                        </div>
                    </form>
                    
                    <label class="col-md-1 control-label"></label>
                    <div class="col-md-11">
                        注意：<br>
                        <strong>赛事由管理员创建，赛事创建完成之后，参赛者通过 赛事->加入赛事 找到并加入赛事。</strong>
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

export default {
  name: "docCreate",
  data() {
    return {
        company_id:'',
        Yearid:'',

        name:'',
        start:'',
        stay:'',
        detail:''
    };
  },
  beforeMount() {
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  methods: {
    submitForm() {
      if (this.name == "" || this.start == ""|| this.stay == ""||  this.detail == "") {
        s_alert.basic("某一项输入为空！");
      } else {
        this.submit();        
      }
    },
    submit(){
        req.post_Param('api/game',{
            'judge':1,
            'id':0,
            'name':this.name,
            'Yearid':0,
            'start':this.start,
            'stay':this.stay,
            'detail':this.detail,
            'condition':0
        })
        .then(res => {
            if (res.data.success) {
                s_alert.Success("赛事创建成功", "正在加载……", "success"); 
                setTimeout(() => {
                    this.$router.push({name:'listgame'})
                }, 2000);           
            } else {
                s_alert.Timer("赛事创建失败", "。。。");
            }
        })
    }
  }
};
</script>

<style>
</style>
