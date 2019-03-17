<template>
    <div class="container">
        <!-- Page-Title -->
        <div class="row">
            <div class="col-sm-12">
                <h4 class="pull-left page-title">公司管理</h4>
            </div>
        </div>
        
        <div class="row">
        <div class="col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading"><h3 class="panel-title">Sway商战大赛-新建公司</h3></div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-md-2 control-label">公司名称</label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" placeholder="xxx有限公司" v-model="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email" >法人</label>
                            <div class="col-md-10">
                                <input class="form-control" placeholder="xxx" v-model="legal">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">统一社会信用代码</label>
                            <div class="col-md-10">
                                <input class="form-control" placeholder="51370113MJD7670793" v-model="code">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">经营范围</label>
                            <div class="col-md-10">
                                <input class="form-control" placeholder="教育（逗号隔开）" v-model="area">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">备注</label>
                            <div class="col-md-10">
                                <textarea class="form-control" v-model="others" rows="5" placeholder=""></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label"></label>
                            <div class="col-md-10">
                            <button type="button" class="btn btn-block btn-lg btn-success waves-effect waves-light" @click="submitForm()">创建公司</button>
                            </div>
                        </div>
                    </form>
                    
                    <label class="col-md-1 control-label"></label>
                    <div class="col-md-11">
                        注意：<br>
                        <strong>公司由选出的公司CEO创建，公司创建完成之后，公司其他成员通过 公司->加入公司 找到并加入公司。</strong>
                    </div>
                </div> 
            </div> 
        </div> 
    </div> 
    <!-- <button @click="test">测试</button> -->
</div>
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../utils/api/apis");

const async = require('async')
import app from "../../App.vue";

export default {
  name: "docCreate",
  data() {
    return {
        userinfo:'',

        name:'',
        legal:'',
        code:'',
        area:'',
        others:''
    };
  },
  beforeMount() {
    this.userinfo =JSON.parse(ses.getSes("userinfo"));    
  },
  methods: {
    submitForm() {
      if (this.name == "" || this.legal == ""|| this.code == ""|| this.area == ""|| this.others == "") {
        s_alert.basic("某一项输入为空！");
      } else {
        this.submitcom();        
      }
    },
    submitcom(){
        let that=this
        async.waterfall([
        //串行，前一个任务的结果传递给后一个任务。
        callback=> {              
            that.creatCompany(callback);
        },
        (cid,callback)=> {
            that.enterCompany(cid,callback);
        },
        (uid,callback)=> {
            that.updateOffice(uid,callback);
        },
        (uid,callback)=> {
            that.updateUserInfoSession(uid,callback);
        }
        ],
        function(err, results) {
            print.log(err,results)
            s_alert.Timer("公司创建失败", "请检查网络状况");
        })
    },
    creatCompany(callback){
        //创建公司
        req.get_Param('api/company',{
            'judge':1,
            'name':this.name,
            'legal':this.legal,
            'code':this.code,
            'area':this.area,
            'condition':0
        })
        .then(res => {
            s_alert.Success("公司创建成功", "正在自动进入公司……", "success");  
            callback(null,res.data.id)
        })
    },
    enterCompany(cid,callback){
        //加入公司
        req.get_Param('/api/ass/company_sway',{
            'judge':0,
            'sway_id':this.userinfo.id,
            'company_id':cid
        })
        .then(res => {
            if(res.data.success){
                callback(null,this.userinfo.id)
            }
            else{
                s_alert.Timer("加入失败，请检查……");
            }
        })
    },
    updateOffice(uid,callback){
        //更新职位
        req.get_Param('/api/sway',{
            'judge':11,
            'sway_id':uid,
            'office':'CEO'
        })
        .then(res => {
            callback(null,uid)
            s_alert.Success("职位更新成功", "请稍等……", "success");
        })
    },
    updateUserInfoSession(uid,callback){
        apis.getOneSwayById(uid)
        .then(res=>{
            ses.setSes("userinfo", JSON.stringify(res.data));
            s_alert.Success("用户信息更新成功", "2秒后自动跳转到公司……", "success");
            setTimeout(() => {                
                this.$router.push({name:'infocompany'})
            }, 2000);
        })
    },



    test(){
        // apis.getAllSway()
        // apis.getOneSwayById(1)
        // apis.getAllCompany()
        // apis.getOneCompanyById(1)
        // apis.getAllStatistic()
        // apis.getOneStatisticByCompanyId(1)
        // apis.getAllTransation()
        // apis.getOneTransationByCompanyId(1)
        // apis.getGameYear(1)
        // apis.getAllGoodsStock()
        // apis.getOneGoodsStockByCompanyId(1)
        // apis.getAllSourceStock()
        // apis.getOneSourceStockByCompanyId(1)
        // apis.getAllGoods()
        // apis.getOneGoodByCompanyId(1)
        for (let i = 0; i < 1000; i++) {
            req.get_Param('api/company',{
            'judge':1,
            'name':'test',
            'legal':'test',
            'code':'test',
            'area':'test',
            'condition':0
            })
            .then(res => {
                print.log(res.data)
            })
            .catch(err => {
                print.warn(err);
            });
        }
        
    }

  }
};
</script>

<style>

</style>
