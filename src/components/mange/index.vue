<template>
    <div class="wrapper">
        <div class="container">

            <div class="row">
                <div class="col-sm-12">
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="false"> 设置 <span class="m-l-5"><i class="fa fa-cog"></i></span></button>
                        <!-- <ul class="dropdown-menu" role="menu">
                            <li><a href="#">测试</a></li>
                            <li><a href="#">测试</a></li>
                            <li><a href="#">测试</a></li>
                            <li class="divider"></li>
                            <li><a href="#">测试</a></li>
                        </ul> -->
                    </div>
                    <h4 class="page-title" style="color:red" v-if="showStasticsItem">当前所在公司 {{showStasticsItem.company.name}}!&nbsp;&nbsp;&nbsp;&nbsp;当前财年：{{gameinfo.Yearid}}</h4>
                    <h4 class="page-title" style="color:red" v-if="userinfo">
                        <div v-if="type==0">参赛者 {{userinfo.cname}}</div>
                        <div v-if="type==1">管理员 {{userinfo.cname}}</div>
                    </h4>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="mini-stat clearfix bx-shadow bg-info">
                        <span class="mini-stat-icon"><i class="ion-ios7-location"></i></span>
                        <div class="mini-stat-info text-right">
                            <span class="counter">521</span>
                            总共参赛人数数量
                        </div>
                        <div class="tiles-progress">
                            <div class="m-t-20">
                                <h5 class="text-uppercase text-white m-0"> 上周新增人数 <span class="pull-right">23</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="mini-stat clearfix bg-purple bx-shadow">
                        <span class="mini-stat-icon"><i class="md md-aspect-ratio"></i></span>
                        <div class="mini-stat-info text-right">
                            <span class="counter">956</span>
                            总共参赛人数
                        </div>
                        <div class="tiles-progress">
                            <div class="m-t-20">
                                <h5 class="text-uppercase text-white m-0">上周新增赛事<span class="pull-right">59</span></h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="mini-stat clearfix bg-primary bx-shadow">
                        <span class="mini-stat-icon"><i class="md md-invert-colors-on"></i></span>
                        <div class="mini-stat-info text-right">
                            <span class="counter">5210</span>
                            线下交流次数
                        </div>
                        <div class="tiles-progress">
                            <div class="m-t-20">
                                <h5 class="text-uppercase text-white m-0">上周交流次数 <span class="pull-right">136</span></h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="mini-stat clearfix bg-success bx-shadow">
                        <span class="mini-stat-icon"><i class="ion-eye"></i></span>
                        <div class="mini-stat-info text-right">
                            <span class="counter">20544</span>
                            总共系统访问量
                        </div>
                        <div class="tiles-progress">
                            <div class="m-t-20">
                                <h5 class="text-uppercase text-white m-0"> 最近访问量 <span class="pull-right">1026</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row text-center" v-if="showStasticsItem">
                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="panel panel-border panel-purple widget-s-1">
                        <div class="panel-heading"> </div>
                        <div class="panel-body">
                        <div class="h2 text-purple">{{showStasticsItem.float}}</div>
                        <span class="text-muted">流动资金(单位万)</span>
                        <div class="text-right">
                            <i class="ion-social-usd fa-2x text-purple"></i>
                        </div>
                    </div>
                    </div>
                </div>
                        
                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="panel panel-border panel-pink widget-s-1">
                        <div class="panel-heading"> </div>
                        <div class="panel-body">
                        <div class="h2 text-pink">{{showStasticsItem.fixed}}</div>
                        <span class="text-muted">固定资金(单位万)</span>
                        <div class="text-right">
                            <i class="ion-ios7-cart fa-2x text-pink"></i>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="panel panel-border panel-primary widget-s-1">
                        <div class="panel-heading"> </div>
                        <div class="panel-body">
                        <div class="h2 text-primary">{{showStasticsItem.total}}</div>
                        <span class="text-muted">总资产(单位万)</span>
                        <div class="text-right">
                            <i class="ion-android-contacts fa-2x text-primary"></i>
                        </div>
                    </div>
                    </div>
                </div>
                        
                <div class="col-md-6 col-sm-6 col-lg-3">
                    <div class="panel panel-border panel-success widget-s-1">
                        <div class="panel-heading"> </div>
                        <div class="panel-body">
                        <div class="h2 text-success">{{showStasticsItem.brand}}</div>
                        <span class="text-muted">品牌价值(初始值100)</span>
                        <div class="text-right">
                            <i class="ion-eye fa-2x text-success"></i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8">
                    <div class="portlet">
                        <div class="portlet-heading">
                            <h3 class="portlet-title text-dark text-uppercase">
                                赛事数据
                            </h3>
                            <div class="clearfix"></div>
                        </div>
                        <div id="portlet1" class="panel-collapse collapse in">
                            <div class="portlet-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="pie-chart-container" class="flot-chart line1" style="height: 320px; padding: 0px; position: relative;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="portlet">
                        <div class="portlet-heading">
                            <h3 class="portlet-title text-dark text-uppercase">
                                赛事统计
                            </h3>
                            <div class="clearfix"></div>
                        </div>
                        <div id="portlet2" class="panel-collapse collapse in">
                            <div class="portlet-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="pie-chart">
                                            <div id="pie-chart-container" class="flot-chart line2" style="height: 320px; padding: 0px; position: relative;">
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
    </div>
</template>


<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../utils/api/apis");

const moment = require("moment");
const notify= require('bootstrap-notify');
import app from "../../App.vue";
var App = app;

export default {
  name: "index",
  data() {
    return {
        showStasticsItem:'',
        userinfo:'',
        gameinfo:'',
        type:''
    };
  },
  filters:{
    formatCondition(x){
        if(x==0) return '存续';
        if(x==-1) return '公司破产'
    },
    formatTime(val){
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted() {
      this.init()
      setInterval(() => {
          this.init()
      }, 10000);
  },
  methods: {
    init(){
      this.showStastics();
      this.getinfo();
    },
    // 获取资产信息
    showStastics(){
        let company_id=JSON.parse(ses.getSes('userinfo')).company_id
        apis.getOneStatisticByCompanyId(company_id)
        .then(res => {   
        //   print.log('公司资产信息',res.data)
          this.showStasticsItem=res.data
        })
    },
    // 获取个人信息
    getinfo(){
        this.userinfo=JSON.parse(ses.getSes('userinfo'))
        this.gameinfo=JSON.parse(ses.getSes('gameinfo'))
        this.type=ses.getSes('type')
    }
    }
};
</script>

<style scoped>
.line1{
    background-image: url('../../assets/images/line1.png');
    background-size:100% 100%;
}
.line2{
    background-image: url('../../assets/images/line2.png');
    background-size:100% 100%;
}
</style>
