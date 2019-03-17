<template>
  <div class="container">
    <!-- Page-Title -->
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">资产管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-商业用地配置</h3>
          </div>

          <div class="panel-body">
            <div class="col-lg-12">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      
                      <div class="row">
                            <div class="col-lg-4" v-for="(item,index) in showCompeteCommerland" :key="index">
                                <div class="panel panel-fill" :class="{'panel-inverse' : index%3==0,'panel-purple' : index%3==1,'panel-success' : index%3==2}">
                                    <div class="panel-heading" style="height:40px"> 
                                        <h3 class="panel-title" style="float:left">商业用地编号  {{item.id}}，等级 {{item.level|formatLevel}}</h3> 
                                        <i class="fa fa-pencil" style="float:right;font-weight:900"  data-toggle="modal" data-target="#accordion-modal" @click="openSetting(item)" v-if="showCompeteCommerland[index].research==null">配置研究所 </i>
                                    </div> 
                                    <div class="panel-body"> 
                                      <div class='row' v-if="showCompeteCommerland[index].research==null">
                                        <div style="color:yellow">暂未配置研究所</div>
                                      </div>
                                      <div class="row" v-else>       
                                        <div style="color:white">研究所信息如下：</div><br>        
                                        <div class="col-lg-12">
                                          <div class="btn-group">
                                              <button type="button" class="btn dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false" :class="{'btn-default' : index%4==0,'btn-success' : index%4==1,'btn-warning' : index%4==2,'btn-primary' : index%4==3}">
                                                {{showCompeteCommerland[index].research.model}} 
                                                <span class="caret"></span>
                                              </button>
                                              <ul class="dropdown-menu" role="menu">
                                                  <li>
                                                    <a>
                                                      <div align='center'>
                                                        <p>
                                                          <strong>研究所类型：</strong>{{showCompeteCommerland[index].research.model}}<br>
                                                          <strong>品牌提升：</strong>{{showCompeteCommerland[index].research.brand}}<br>
                                                          <strong>配方工艺：</strong>{{showCompeteCommerland[index].research.formula}}<br>
                                                          <strong>购置价值：</strong>{{showCompeteCommerland[index].research.price}}w<br>
                                                          <strong>建设要求：</strong>{{showCompeteCommerland[index].research.conrequire|formatConrequire}}<br>
                                                        </p>  
                                                      </div>
                                                    </a>
                                                  </li>
                                              </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div> 
                                </div>
                            </div>
                        </div>                 

                      <div class="panel-body">
                      </div>
                    </div>
                  </div>
                  <hr>
                  <p>
                    <strong>
                     每个商业用地只能建造一个研究所，研究所建造对商业用地有要求，具体请参照赛制。
                    </strong>
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>

    
    <div id="accordion-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
      <div class="modal-dialog">
          <div class="modal-content p-0">
              <div class="panel-group panel-group-joined" id="accordion-test"> 

                  <div class="panel  panel-default" v-for="(item,index) in judgeShowResearch" :key="index" > 
                    <div class="panel-heading"> 
                        <h4 class="panel-title"> 
                            <a data-toggle="collapse" data-parent="#accordion-test" :href="'#'+index" class="collapsed">
                                研究所编号 # {{item.id}}
                            </a> 
                        </h4> 
                    </div> 
                    <div :id="index" class="panel-collapse collapse" :class="{'in' : index==1}"> 
                        <div class="modal-body" align="center">
                          <table class="table table-bordered table-striped" style id="datatable-editable">
                            <thead>
                              <tr>
                                <th>研究所类型</th>
                                <th>品牌提升</th>
                                <th>配方工艺</th>
                                <th>价格</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="gradeX" >
                                <td>{{item.model}}</td>
                                <td>{{item.brand}}</td>
                                <td>{{item.formula}}</td>
                                <td>{{item.price}}</td>
                              </tr>
                            </tbody>
                          </table>
                          <strong>订单总额为:</strong><strong style='color:green'>{{item.price}}万元</strong><br>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                          <button
                            type="button"
                            class="btn btn-primary waves-effect waves-light"
                            data-dismiss="modal"
                            @click="sendPrice(item,item.price,item.id)">提交订单</button>
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
const notify = require("bootstrap-notify");
import app from "../../App.vue";
var App = app;

export default {
  name: "mine",
  data() {
    return {
      company_id:'',
      Yearid:'',
      // 显示信息
      showCompeteCommerland:'',
      showResearchItems:'',
      //购买研究所
      temp:'',
      judgeShowResearch:[]
    };
  },
  beforeMount(){
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  mounted() {
    this.init()
    // 实时获取info
    setTimeout(() => {
      this.getInfo();
    }, 10000);
  },
  filters: {
    formatTime(x) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    sumPrice(x, y) {
      return x * y;
      print.log(x, y);
    },
    formatLevel(x){
      if(x==1) return '投契级';
      if(x==2) return '机构级';
      if(x==3) return '投资级';
      if(x==4) return '地标级';
    },
    formatConrequire(x){
      if(x==0) return '无要求';
      if(x==3) return '投资级';
      if(x==4) return '地标级';
    }
  },
  methods: {
    getInfo(){
      this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
      this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
    },
    init(){
      this.showMyCommerland();
      this.showResearch()
    },
    // 打开设置
    openSetting(item) {
      this.judgeShowResearch=[]
      this.temp=item
      let level=item.level
      // 根据商业用地等级确定显示生产线
      if(level==4){
        this.judgeShowResearch=this.showResearchItems
      }else if(level==3){
        this.showResearchItems.forEach(e => {
          if(e.conrequire<=level){
            this.judgeShowResearch.push(e)
          }
        });
      }else if(level==2 || level==1){
        this.showResearchItems.forEach(e => {
          if(e.conrequire<=2){
            this.judgeShowResearch.push(e)
          }
        });
      }
      print.log(this.temp)
    },
    //购买研究所 绑定 到 商业用地
    sendPrice(item,money,research_id) {
      let that=this
      // 查询个人资产
      apis.getOneStatisticByCompanyId(that.company_id)
      .then(res => {
        if(res.data.float>=money){
          let float=res.data.float-money;
          let fixed=res.data.fixed+money;
          let brand=res.data.brand*(1+item.brand);
          // 更新个人资产
          req.post(`api/statistic?judge=4&float=${float}&fixed=${fixed}&brand=${brand}&company_id=${that.company_id}`).then(res=>{})
          // 绑定研究所
          req.post_Param('api/ass/commerland_research',{
            'judge':6,
            'commerland_id':that.temp.id,
            'research_id':item.id
          })
          .then(res => {          
            s_alert.Success("下单成功", "正在加载……", "success");
            that.showMyCommerland();
            // 写入交易
            req.post(`api/transaction?judge=1&id=0&Yearid=${that.Yearid}&inout=1&type=4&kind=3&price=${money}&number=1&me=${that.company_id}&research_id=${research_id}`)
          })
        }else{
          s_alert.Success("下单失败", "可用流动资金不足……", "warning");
        }          
      })      
    },
    //显示已购 商业用地
    showMyCommerland() {
      req.post_Param('api/ass/commerland_research',{
        'judge':4,
        'company_id':this.company_id
      })
        .then(res => {
          this.showCompeteCommerland=res.data;
          print.log(this.showCompeteCommerland)
        })
    },
    //显示 研究所 信息
    showResearch() {
      req.post_Param('api/research',{'judge':0})
        .then(res => {
          print.log(res.data);
          this.showResearchItems = res.data;
        })
    }
  }
};
</script>

<style>

</style>
