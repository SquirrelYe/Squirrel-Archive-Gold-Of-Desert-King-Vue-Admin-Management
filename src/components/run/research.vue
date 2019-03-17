<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">公司运营</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default" v-if="showCompeteCommer">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-研究所研发管理</h3>            
          </div>
          <div class="panel panel-body"> 
            <div class="tabs-vertical-env"> 
                <ul class="nav tabs-vertical"> 
                    <li class="" v-for="(item,index) in showCompeteCommer" :key="index" :class="{'active' : index==1}">
                        <a :href="'#'+index" data-toggle="tab" aria-expanded="false">商业用地 C{{item.id}}</a>
                    </li> 
                </ul> 
                <div class="tab-content"> 
                    <div class="tab-pane" :id="index" v-for="(item,index) in showCompeteCommer" :key="index" :class="{'active' : index==1}"> 
                            <h3 class="panel-title">商业用地信息</h3>  
                      <div class="tab-content">
                        <div class="panel panel-default">
                          <div class="panel-heading"> 
                                <!-- {{item}} -->
                              <table class="table table-striped" style id="datatable-editable">
                                <thead>
                                  <tr>
                                    <th>土地编号</th>
                                    <th>土地等级</th>
                                    <th>品牌提升</th>
                                    <th>增值空间</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>C{{item.id}}</td>
                                    <td>{{item.level|formatlevel}}</td>
                                    <td>{{item.brand}}</td>
                                    <td>{{item.increment}}</td>
                                  </tr>
                                </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class='tab-pane'>    
                        <h3 class="panel-title">研究所信息</h3>                        
                        <div class="tab-content">
                          <div class="panel panel-default">
                            <div class="panel-heading"> 
                                <!-- {{item}}   -->
                                <table class="table table-striped" style id="datatable-editable">
                                <thead>
                                  <tr>
                                    <th>研究所编号:</th>
                                    <th>研究所类型:</th>
                                    <th>品牌提升:</th>
                                    <th>配方工艺:</th>
                                    <!-- <th>建设要求:</th> -->
                                    <th>操作:</th>
                                  </tr>
                                </thead>
                                <tbody v-if="item.research">
                                  <tr>
                                    <td>R{{item.research.id}}</td>
                                    <td>{{item.research.model}}</td>
                                    <td>{{item.research.brand}}</td>
                                    <td>{{item.research.formula}}量</td>
                                    <!-- <td>{{item.research.conrequire}}</td> -->
                                    <td data-toggle="tooltip" data-placement="top" title="研发产品">
                                      <i class="fa fa-wrench" data-toggle="modal" data-target="#myModal"  @click="openSetting(item)"></i>  
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
    </div>
    <!-- StandardModal -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">产品研发</h4>
          </div>
          <!-- 内容 -->
          <div class="modal-body">
            
            <div class="col-lg-12"> 
              <div class="panel-group panel-group-joined" id="accordion-test"> 
                  <div class="panel panel-default"> 
                      <div class="panel-heading"> 
                          <h4 class="panel-title"> 
                              <a data-toggle="collapse" data-parent="#accordion-test" href="#collapseOne" aria-expanded="false" class="collapsed">
                                  产品研发信息填写 #1
                              </a> 
                          </h4> 
                      </div> 
                      <div id="collapseOne" class="panel-collapse collapse" aria-expanded="false" style=""> 
                          <div class="panel-body">
                            <div class="panel panel-default">
                              <div class="panel-body">
                                  <form class="form-horizontal" role="form">                                    
                                      <div class="form-group">
                                          <label class="col-md-2 control-label" >名称</label>
                                          <div class="col-md-10">
                                              <input type="text" class="form-control" placeholder="xxx" v-model="name">
                                          </div>
                                      </div>
                                      <div class="form-group">
                                          <label class="col-md-2 control-label" for="example-email">原理</label>
                                          <div class="col-md-10">
                                              <input type="text" class="form-control" placeholder="xxx" v-model="func">
                                          </div>
                                      </div>
                                      <div class="form-group">
                                          <label class="col-md-2 control-label">介绍</label>
                                          <div class="col-md-10">
                                              <input type="text" class="form-control" placeholder="xxx" v-model="intro">
                                          </div>
                                      </div>
                                      <!-- <div class="form-group">
                                          <label class="col-md-2 control-label">单价</label>
                                          <div class="col-md-10">
                                              <input type="number" class="form-control" v-model="price">
                                          </div>
                                      </div>          -->
                                  </form>
                                  <div align='center'>
                                    注意：价格单位 万元，不得超过最高单价<br>最高单价=配方元素量*根号（元素种类）*（1+品牌提升）*0.1
                                  </div>
                              </div>
                          </div>
                          </div> 
                      </div> 
                  </div> 

                  <div class="panel panel-default"> 
                      <div class="panel-heading"> 
                          <h4 class="panel-title"> 
                              <a data-toggle="collapse" data-parent="#accordion-test" href="#collapseTwo" aria-expanded="false" class="collapsed">
                                  产品研发原料填写 #2
                              </a> 
                          </h4> 
                      </div> 
                      <div id="collapseTwo" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;"> 
                          <div class="panel-body">
                            <div class="panel panel-default">
                              <div class="panel-body">                            
                                <form class="form-horizontal" role="form">  
                                  <div class="form-group">
                                      <label class="col-md-2 control-label" >金</label>
                                      <div class="col-md-10">
                                          <input type="number" class="form-control" v-model="s1" @input="getMax()">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-md-2 control-label" >木</label>
                                      <div class="col-md-10">
                                          <input type="number" class="form-control" v-model="s2" @input="getMax()">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-md-2 control-label" >水</label>
                                      <div class="col-md-10">
                                          <input type="number" class="form-control" v-model="s3" @input="getMax()">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-md-2 control-label" >火</label>
                                      <div class="col-md-10">
                                          <input type="number" class="form-control" v-model="s4" @input="getMax()">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-md-2 control-label" >土</label>
                                      <div class="col-md-10">
                                          <input type="number" class="form-control" v-model="s5" @input="getMax()">
                                      </div>
                                  </div>
                                </form>
                                <div align='center'>
                                  注意：元素单位 量，元素总量不得超过 研究所 规定的总量。<br>
                                  <strong style="color:green" v-if="Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)<=sumSource && canICreatGood">
                                    该产品未被其他公司申请专利，可以研发
                                  </strong>
                                  <strong style="color:red" v-if="Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)<=sumSource && !canICreatGood">
                                    该产品已被其他公司申请专利，不允许研发
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </div> 
                      </div> 
                  </div> 
              </div> 
          </div>   

          </div>
          
          <div align='center'>
            注意：申请产品研发需支付60万元，申请专利保护需支付100万元。<br>
            当前研究所支持的配方数：{{sumSource}}
          </div>
          <div align='center'>
            <div v-if="Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)<=sumSource && canICreatGood">
              当前最高单价为：{{max}}万元<br>
              <!-- <div v-if="price<max">
                你的出价为：{{price}}
              </div>
              <div v-else style="color:red">
                你的定价大于最高单价
              </div> -->
              <div class="checkbox checkbox-success checkbox-circle">
                  <input id="checkbox-10" type="checkbox" v-model="law">
                  <label for="checkbox-10">
                      是否申请专利保护
                  </label>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice()" v-if="price<max">提交申请</button>
              </div>
            </div>
            <div v-if="Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)>sumSource" style="color:red">
              超过研究所能够容纳的最大量
              <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
              </div>
            </div>
            <div v-if="Number(s1)+Number(s2)+Number(s3)+Number(s4)+Number(s5)==0" style="color:green">
              请填写产品原料组成以获取最高单价
              <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
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
const co = require("co")
import app from "../../App.vue";
var App = app;

export default {
  name: "exploit",
  data() {
    return {
      company_id:'',
      Yearid:'',

      showCompeteCommer:'',
      // 研发产品信息
      name:'',
      func:'',
      intro:'',
      price:'',
      // 当前的商业用地信息
      currentCommerlandInfo:'',
      // 原料信息
      s1:0,
      s2:0,
      s3:0,
      s4:0,
      s5:0,
      // 最高单价
      sumSource:0, // 允许配方元素量
      brand:0.5,  //品牌价值提升
      max:'',   //最高单价
      law:false,
      //判断是否存在当前研发产品
      judgeGoodHave:'',
      canICreatGood:false
    };
  },
  beforeMount() {
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  mounted() {
    this.init()
    // 实时获取info
    setTimeout(() => {
      this.getInfo();
    }, 10000);
  },
  filters: {
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    sumCreat(x, y) {
      return x * y;
    },
    predict(x){
      return moment().locale('zh-cn').add(x, 'minutes').utc().zone(-8).format('YYYY-MM-DD HH:mm:ss');
    },
    formatlevel(x){
      if(x==1) return '投契级'
      if(x==2) return '机构级'
      if(x==3) return '投资级'
      if(x==4) return '地标级'
    }
  },
  methods: {
    getInfo(){
      this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
      this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
    },
    init(){      
      this.showMyCommer();
    },
    initFormulaNumber(){
      this.s1=0
      this.s2=0
      this.s3=0
      this.s4=0
      this.s5=0
    },
    openSetting(item){
      this.initFormulaNumber()
      this.sumSource=item.research.formula
      this.currentCommerlandInfo=item
      print.log(item)
    },
    sendPrice(){
      if(this.name==''||this.func==''||this.intro==''){
        s_alert.Success("下单失败", "产品研发信息不能为空", "warning");
      }else{
        //执行 发送产品研发信息清单
        print.log(this.name,this.func,this.intro,this.price,this.law)
        let tempLaw=0;
        if(this.law) tempLaw=1;
        else tempLaw=0;
        req.post_Param('api/commerresearch',{
          'judge':1,
          'commerland_id':this.currentCommerlandInfo.id,
          'name':this.name,
          'function':this.func,
          'introduction':this.intro,
          'price':0,
          'condition':0,
          'maxprice':this.max,
          'law':tempLaw,
          's1':this.s1,
          's2':this.s2,
          's3':this.s3,
          's4':this.s4,
          's5':this.s5,
          'company_id':this.company_id,
        })
        .then(res => {
          print.log('申请产品信息->',res.data)
          let commerresearch_id=res.data.id;
          s_alert.Success("产品研发申请发送成功", "请到 公司—>公司产品 中查看，联系组委会审核产品。", "success");
            // 查询个人资产
            apis.getOneStatisticByCompanyId(this.company_id)
            .then(res => {
              if(this.law){     //申请专利
                let float=res.data.float-160;
                let total=res.data.total-160;
                // 更新资产
                req.post_Param('api/statistic',{
                  'judge':4,
                  'total':total,
                  'float':float,
                  'company_id':this.company_id
                })
                // 写入交易表
                req.post_Param('api/transaction',{
                  'judge':1,
                  'id':0,
                  'Yearid':this.Yearid,
                  'inout':1,
                  'type':4,
                  'kind':3,
                  'price':160,
                  'number':1,
                  'me':this.company_id,
                  'commerresearch_id':commerresearch_id
                })

              }
              else{     //不申请专利
                let float=res.data.float-60;
                let total=res.data.total-60;
                // 更新资产
                req.post_Param('api/statistic',{
                  'judge':4,
                  'total':total,
                  'float':float,
                  'company_id':this.company_id
                })
                // 写入交易表
                req.post_Param('api/transaction',{
                  'judge':1,
                  'id':0,
                  'Yearid':this.Yearid,
                  'inout':1,
                  'type':4,
                  'kind':3,
                  'price':60,
                  'number':1,
                  'me':this.company_id,
                  'commerresearch_id':commerresearch_id
                })   
              }
            })
        })
      }
    },
    //显示已购 商业用地
    showMyCommer() {
      req.post_Param('api/ass/commerland_research',{
        judge:4,
        company_id:this.company_id
      })
      .then(res => {
        this.showCompeteCommer=res.data;
        print.log(this.showCompeteCommer)
      })
    },
    getMax(){
      //获取价格变化
      print.log(this.s1,this.s2,this.s3,this.s4,this.s5)
      let sum=0;
      if(this.s1!=0) sum++;
      if(this.s2!=0) sum++;
      if(this.s3!=0) sum++;
      if(this.s4!=0) sum++;
      if(this.s5!=0) sum++;
      this.max=(this.sumSource*Math.sqrt(sum)*(1+this.brand)*0.1).toFixed(2)
      //获取此产品是否存在
      req.post_Param('api/commerresearch',{
        'judge':4,
        's1':this.s1,
        's2':this.s2,
        's3':this.s3,
        's4':this.s4,
        's5':this.s5
      })
      .then(res => {
        print.log(res.data)
        this.judgeGoodHave=res.data
        if(res.data.rows.length!=0){
          this.canICreatGood=false
          for (let i = 0; i < res.data.rows.length; i++) {
            if(Number(res.data.rows[i].law)==1) {
              this.canICreatGood=false
              break;
            }
            else this.canICreatGood=true          
          }
        }else{
          this.canICreatGood=true
        }        
      })
    }
  }
};
</script>

<style>

</style>
