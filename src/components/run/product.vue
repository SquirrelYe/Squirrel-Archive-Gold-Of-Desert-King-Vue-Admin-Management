<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">公司运营</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-工业用地生产管理</h3>            
          </div>
          <div class="panel panel-body"> 
            <div class="tabs-vertical-env"> 
                <ul class="nav tabs-vertical"> 
                    <li class="" v-for="(item,index) in showCompeteIndusland" :key="index">
                        <a :href="'#'+index" data-toggle="tab" aria-expanded="false" @click="chooseInduslandIndex(index)">工业用地  I{{item.id}}</a>
                    </li> 
                </ul> 
                <div class="tab-content"> 
                <div class="tabs-vertical-env"> 
                <ul class="nav tabs-vertical"> 
                    <li class="" v-for="(item,index) in tFactory" :key="index">
                        <a :href="'#'+index" data-toggle="tab" aria-expanded="false" @click="chooseFactoryIndex(index)">工厂信息  F{{item.id}}</a>
                    </li> 
                </ul> 
                <div class="tab-content"> 
                    <div class="tab-pane" :id="index" v-for="(item,index) in showCompeteIndusland" :key="index"> 
                      <h3 class="panel-title">工业用地 & 工厂信息</h3>  
                      <div class="tab-content">
                        <div class="panel panel-default">
                          <div class="panel-heading"> 
                                <!-- {{item}} -->
                              <table class="table table-striped" style id="datatable-editable">
                                <thead>
                                  <tr>
                                    <th>型号</th>
                                    <th>面积</th>
                                    <th>生产效率提升</th>
                                    <th>折旧减免</th>
                                    <th>改良花费</th>
                                    <!-- <th>是否改良</th> -->
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{{item.model|formatmodel}}</td>
                                    <td>{{item.measure}}</td>
                                    <td>{{item.efficient}}</td>
                                    <td>{{item.repurchase}}</td>
                                    <td>{{item.improve}}万</td>
                                    <!-- <td>{{item.isimprove}}</td> -->
                                  </tr>
                                </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div class="tab-content" v-if="currentFactoryItem!=''">
                        <div class="panel panel-default" >
                          <div class="panel-heading"> 
                                <!-- {{item}} -->
                              <table class="table table-striped" style id="datatable-editable">
                                <thead>
                                  <tr>
                                    <th>型号</th>
                                    <th>占用面积</th>
                                    <th>容纳生产线数量</th>
                                    <th>建设成本</th>
                                    <th>数量</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{{currentFactoryItem.model}}</td>
                                    <td>{{currentFactoryItem.measure}}</td>
                                    <td>{{currentFactoryItem.includeline}}条</td>
                                    <td>{{currentFactoryItem.price}}万</td>
                                    <td>{{currentFactoryItem.indusland_factory.number}}</td>
                                  </tr>
                                </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div class='tab-pane'>    
                        <h3 class="panel-title">生产线信息</h3>                        
                        <div class="tab-content" v-for="(item,index) in currentLineItem.lines" :key="index">
                          <div class="panel panel-default">
                            <div class="panel-heading"> 
                                <!-- {{item}}   -->
                                <br>
                                <strong>型号:</strong>{{item.model}}<br>
                                <strong>产能:</strong>{{item.capacity}}<br>
                                <strong>价值折旧率:</strong>{{item.relief}}<br> 
                                <strong>良品率:</strong>{{item.yield}}<br>    
                                <strong>价值:</strong>{{item.price}}<br>     
                                <strong>建设要求:</strong>{{item.conrequire|formatConquire}}<br>   
                                <strong>已有数量:</strong>{{item.indusland_factory_line.number}}<br>                            
                                <hr>
                                <button class="btn btn-icon waves-effect waves-light btn-success m-b-5" data-toggle="modal" data-target=".bs-example-modal-lg"  @click="openSetting(item)" v-if="item.indusland_factory_line.condition==1"> <i class="fa fa-spin fa-circle-o-notch"></i> </button> 
                                <button class="btn btn-icon waves-effect waves-light btn-success m-b-5" data-toggle="modal" data-target=".bs-example-modal-lg"  @click="openSetting(item)" v-if="item.indusland_factory_line.condition==0"> <i class="fa fa-wrench"></i> </button> 
                                <button class="btn btn-icon waves-effect waves-light btn-success m-b-5" data-toggle="modal" data-target=".bs-example-modal-lg"  @click="openSetting(item)" v-if="item.indusland_factory_line.condition==2"> <i class="fa fa-check"></i> </button> 
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
      </div>
    </div>

    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">工程清单</h4>
                  </div>
                  <!-- 内容 -->
                  <div class="modal-body" align='center'>
                      <div class="row">
                        <div class="col-lg-4">
                            <div class="portlet">
                                <div class="portlet-heading bg-inverse">
                                    <h3 class="portlet-title">
                                        工业用地
                                    </h3>
                                    <div class="portlet-widgets">
                                        <a href="javascript:;" data-toggle="reload"><i class="ion-refresh"></i></a>
                                        <span class="divider"></span>                                
                                        <a data-toggle="collapse" data-parent="#accordion1" href="#bg-inverse"><i class="ion-minus-round"></i></a>
                                        <span class="divider"></span>
                                        <a><i class="ion-close-round"></i></a>
                                        <!-- data-toggle="remove" -->
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div id="bg-inverse" class="panel-collapse collapse in">
                                    <div class="portlet-body">
                                      <strong>工地编号:</strong>{{tIndusland.id}}<br> 
                                      <strong>工地面积:</strong>{{tIndusland.measure}}<br>
                                      <strong>效率提升:</strong>{{tIndusland.efficient}}<br> 
                                      <strong>折旧降低:</strong>{{tIndusland.repurchase}}<br> 
                                      <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="portlet">
                              <div class="portlet-heading bg-success">
                                  <h3 class="portlet-title">
                                      工厂
                                  </h3>
                                  <div class="portlet-widgets">
                                      <a href="javascript:;" data-toggle="reload"><i class="ion-refresh"></i></a>
                                      <span class="divider"></span>
                                      <a data-toggle="collapse" data-parent="#accordion1" href="#bg-success"><i class="ion-minus-round"></i></a>
                                      <span class="divider"></span>
                                      <a ><i class="ion-close-round"></i></a>
                                  </div>
                                  <div class="clearfix"></div>
                              </div>
                              <div id="bg-primary" class="panel-collapse collapse in">
                                    <div class="portlet-body">
                                      <strong>工厂编号:</strong>{{currentFactoryItem.id}}<br>
                                      <strong>工地型号:</strong>{{currentFactoryItem.model}}<br> 
                                      <strong>占用面积:</strong>{{currentFactoryItem.measure}}<br> 
                                      <strong>可容纳生产线:</strong>{{currentFactoryItem.includeline}}<br> 
                                      <hr>
                                    </div>
                                </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="portlet">
                                <div class="portlet-heading bg-primary">
                                    <h3 class="portlet-title">
                                        生产线  x{{currentLineNumber}}
                                    </h3>
                                    <div class="portlet-widgets">
                                        <a href="javascript:;" data-toggle="reload"><i class="ion-refresh"></i></a>
                                        <span class="divider"></span>
                                        <a data-toggle="collapse" data-parent="#accordion1" href="#bg-primary"><i class="ion-minus-round"></i></a>
                                        <span class="divider"></span>
                                        <a ><i class="ion-close-round"></i></a>
                                        <!-- data-toggle="remove" -->
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div id="bg-primary" class="panel-collapse collapse in">
                                    <div class="portlet-body">
                                      <strong>生产线编号:</strong>{{tLine.id}}<br>
                                      <strong>生产产能:</strong>{{tLine.capacity}}<br> 
                                      <strong>产线价值折旧:</strong>{{tLine.relief}}<br> 
                                      <strong>良品率:</strong>{{tLine.yield}}<br> 
                                      <hr>
                                    </div>
                                </div>
                            </div>
                        </div>         
                        <div class="col-lg-12" v-if="tLine.indusland_factory_line">
                          <div class="portlet" v-if="tLine.indusland_factory_line.condition==0">
                              <div class="portlet-heading portlet-default">
                                  <h3 class="portlet-title text-dark">
                                      选择要生产的产品
                                  </h3>
                                  <div class="portlet-widgets">
                                      <a href="javascript:;" data-toggle="reload"><i class="ion-refresh"></i></a>
                                      <span class="divider"></span>
                                      <a data-toggle="collapse" data-parent="#accordion1" href="#bg-default"><i class="ion-minus-round"></i></a>
                                      <span class="divider"></span>
                                      <a ><i class="ion-close-round"></i></a>
                                  </div>
                                  <div class="clearfix"></div>
                              </div>
                              <div id="bg-default" class="panel-collapse collapse in">
                                  <div class="panel-heading"> 
                                    <!-- {{item}} -->
                                    <ul class="nav nav-tabs navtab-bg"> 
                                      <li class="active"> 
                                          <a href="#me" data-toggle="tab" aria-expanded="true" @click='getShowGoodItems()'> 
                                              <span class="visible-xs"><i class="fa fa-home"></i></span> 
                                              <span class="hidden-xs">自研产品</span> 
                                          </a> 
                                      </li> 
                                      <li class=""> 
                                          <a href="#oem" data-toggle="tab" aria-expanded="false" @click='getMyOEMItems()'> 
                                              <span class="visible-xs"><i class="fa fa-user"></i></span> 
                                              <span class="hidden-xs">代工产品</span> 
                                          </a> 
                                      </li>
                                  </ul> 
                                  <div class="tab-content"> 
                                      <div class="tab-pane active" id="me"> 
                                        <table class="table table-striped" style id="datatable-editable">
                                          <thead>
                                            <tr>
                                              <th>#</th>
                                              <th>产品编号</th>
                                              <th>产品名称</th>
                                              <th>元素金</th>
                                              <th>元素木</th>
                                              <th>元素水</th>
                                              <th>元素火</th>
                                              <th>元素土</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="(item,index) in showGoodItems" :key="index" :class="{'active' : index==1}" v-if='item.condition==1'>
                                              <td @click="getResearch(1,item)">
                                                <div class="radio radio-success radio-single">
                                                    <input type="radio" name="sigle" aria-label="Single radio One">
                                                    <label></label>
                                                </div>
                                              </td>
                                              <td>{{item.id}}</td>
                                              <td>{{item.name}}</td>
                                              <td>{{item.s1}}</td>
                                              <td>{{item.s2}}</td>
                                              <td>{{item.s3}}</td>
                                              <td>{{item.s4}}</td>
                                              <td>{{item.s5}}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div class="tab-pane" id="oem"> 
                                        <table class="table table-striped" style id="datatable-editable">
                                          <thead>
                                            <tr>
                                              <th>#</th>
                                              <th>产品编号</th>
                                              <th>产品名称</th>
                                              <th>元素金</th>
                                              <th>元素木</th>
                                              <th>元素水</th>
                                              <th>元素火</th>
                                              <th>元素土</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="(item,index) in showOEMItems" :key="index" :class="{'active' : index==1}">
                                              <td @click="getResearch(2,item)">
                                                <div class="radio radio-success radio-single">
                                                    <input type="radio" name="sigle" aria-label="Single radio One">
                                                    <label></label>
                                                </div>
                                              </td>
                                              <td>{{item.id}}</td>
                                              <td>{{item.commerresearch.name}}</td>
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

                    <hr>
                    <div v-if="tLine.indusland_factory_line">
                      <div v-if="tLine.indusland_factory_line.condition==0">
                        <strong>产品名称:</strong><strong>{{chooseResearch.name}}</strong><br>
                        <strong>预计产量（单位/量）:</strong><strong>{{number|sumCreat(tLine.yield)}}</strong><br>
                        <strong>预计结束时间:</strong><strong>{{number|predict(tLine.capacity,currentLineNumber)}}</strong><br>
                        <div v-if="chooseResearch!=''">
                          <strong>需要耗费元素:
                            金：{{chooseResearch.s1|sumSource(this.number)}}
                            木：{{chooseResearch.s2|sumSource(this.number)}}
                            水：{{chooseResearch.s3|sumSource(this.number)}}
                            火：{{chooseResearch.s4|sumSource(this.number)}}
                            土：{{chooseResearch.s5|sumSource(this.number)}}
                          </strong>
                          <div v-if="judge && chooseResearch" style="color:green">
                            原料足够可以生产
                          </div>
                          <div v-if="!judge && chooseResearch" style="color:red">
                            原料不够，不可以生产
                          </div>
                        </div>
                        <strong style="color:green">当前库存元素储量为：金_{{showHaveTotalSource[0]}}、木_{{showHaveTotalSource[1]}}、水_{{showHaveTotalSource[2]}}、火_{{showHaveTotalSource[3]}}、土_{{showHaveTotalSource[4]}}、</strong>
                        <br>
                        <strong>请输入需要生产的产品数量:</strong><input type="number" :disabled='this.judgeInput' v-model="number" @input="judgeTotalSurce()"><strong>（单位/件）</strong><br>
                      </div>
                      <!-- 生产中 -->
                      <div v-if="tLine.indusland_factory_line.condition==1">
                        <!-- <strong>产品名称:</strong><strong>{{chooseResearch.name}}</strong><br> -->
                        <h4 style="color:#00b300">生产中</h4><br>
                        <strong>预计结束时间:</strong><strong>{{tLine.indusland_factory_line.start|predictEnd(tLine.indusland_factory_line.stay)}}</strong><br>
                      </div>
                      <!-- 生产完成 -->
                      <div v-if="tLine.indusland_factory_line.condition==2">
                        <strong>产品名称:</strong><strong>{{FinishedResearchItem.name}}</strong><br>
                        <h4 style="color:#00b300">生产完成</h4>
                        <strong>产量（单位/量）:</strong><strong>{{tLine.indusland_factory_line.stay|iScreated(tLine.capacity,tLine.indusland_factory_line.number)}}</strong><br>
                          <strong>耗费元素:
                            金：{{FinishedResearchItem.s1|iScreatedSource(tLine.indusland_factory_line.stay,tLine.capacity,tLine.indusland_factory_line.number)}}
                            木：{{FinishedResearchItem.s2|iScreatedSource(tLine.indusland_factory_line.stay,tLine.capacity,tLine.indusland_factory_line.number)}}
                            水：{{FinishedResearchItem.s3|iScreatedSource(tLine.indusland_factory_line.stay,tLine.capacity,tLine.indusland_factory_line.number)}}
                            火：{{FinishedResearchItem.s4|iScreatedSource(tLine.indusland_factory_line.stay,tLine.capacity,tLine.indusland_factory_line.number)}}
                            土：{{FinishedResearchItem.s5|iScreatedSource(tLine.indusland_factory_line.stay,tLine.capacity,tLine.indusland_factory_line.number)}}
                          </strong>
                      </div>    
                    </div> 
                  </div>
                  <div class="modal-footer">
                    <div v-if="tLine.indusland_factory_line">
                      <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                      <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(tLine.indusland_factory_line.stay,tLine.capacity,tLine.indusland_factory_line.number)" v-if="tLine.indusland_factory_line.condition==0 && number!=''&& number>0 && judge && chooseResearch!=''">开始生产</button>
                      <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="reBuild(FinishedResearchItem)" v-if="tLine.indusland_factory_line.condition==2">存入库存</button>
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

      showCompeteIndusland:'',
      showDiggerItems:'',
      showGoodItems:'',  //显示所有 已通过的 公司产品
      showOEMItems:'',
      showHaveTotalSource:[],
      chooseResearch:'',  //显示选择的产品信息
      research:'',  //保存选择的 产品
      currentLineNumber:0,
      //judge元素是否够
      judge:false,
      number:0,
      tIndusland:'',
      tLine:'',
      tFactory:'',
      // 判断能否输入
      judgeInput:true,
      //index
      induslandIndex:0,
      factoryIndex:0,
      currentFactoryItem:'',
      currentLineItem:'',
      FinishedResearchItem:''
    };
  },
  beforeMount() {
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
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    sumCreat(x, y) {
      return (Number(x) * Number(y)).toFixed(0);
    },
    iScreated(x,y,z){
      return x*y*z
    },
    sumSource(x,y) {
      return x * y
    },
    predict(x,y,z){
      return moment().locale('zh-cn').add(x/(y*z), 'minutes').utc().zone(-8).format('YYYY-MM-DD HH:mm:ss'); 
    },
    predictEnd(x,y){
      return moment(x).add(y, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    },
    iScreatedSource(x,y,z,a){
      return x*y*z*a
    },
    formatmodel(x){
      if(x==1) return 'A'
      if(x==2) return 'Z'
      if(x==3) return 'C'
      if(x==4) return 'S'
    },
    formatConquire(x){
      if(x==1) return '小型工厂';
      if(x==2) return '大型工厂';
      if(x==3) return '巨无霸型工厂';
      if(x==4) return '富士康型工厂';
    }
  },
  methods: {
    getInfo(){
      this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
      this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
    },
    init(){      
      this.showMyIndusland();
    },
    openSetting(item){
      this.tLine=item
      print.log('选中的生产线信息->',this.tLine)
      this.chooseResearch=''
      this.currentLineNumber=item.indusland_factory_line.number
      this.number=0
      this.research=''
      this.judge=true
      this.getShowGoodItems()
      this.getMyOEMItems()
      this.getTotalSource()
      //如果 生产状态 condition=2 （已完成），获取已生产产品信息
      if(this.tLine.indusland_factory_line.condition==2){
        this.showFinishedResearchItem(item.indusland_factory_line.commerresearch_id)
      }
      // 清空radio状态
      $("input[type='radio']").attr("checked",false);//取消选中
    },
    //获取已完成生产 产品信息
    showFinishedResearchItem(commerresearch_id){      
      req.post_Param('api/commerresearch',{
        'judge':7,
        'id':commerresearch_id
      })
      .then(res => {
        print.log('已完成生产 产品信息',res.data)
        this.FinishedResearchItem=res.data;
      })
    },
    //获取公司 通过的 所有商品
    getShowGoodItems(){
      this.judgeInput=true;
      apis.getOneGoodByCompanyId(this.company_id)
      .then(res => {
        this.showGoodItems=res.data;
        print.log('所有的公司产品',res.data)
        // 初始化选择产品
        this.research=''
        this.chooseResearch='';
        this.number=0
        // 清空radio状态
        $("input[type='radio']").attr("checked",false);//取消选中
      })
    },
    // 获取代工产品
    getMyOEMItems(){
      this.judgeInput=true;
      req.post_Param('api/oem',{
        judge:8,
        other:this.company_id
      })
      .then(res => {
          print.log('所有的代工产品',res.data);
          this.showOEMItems = res.data
          // 初始化选择产品
          this.research=''
          this.chooseResearch='';
          this.number=0
          // 清空radio状态
          $("input[type='radio']").attr("checked",false);//取消选中
      })
    },
    //显示开采的原料  用于生产产品
    getTotalSource(){      
      apis.getOneSourceStockByCompanyId(this.company_id)
      .then(res => {
        print.log(res.data)
        let s1=0,s2=0,s3=0,s4=0,s5=0;
        res.data.forEach(e => {
          if(e.source_id==1) s1+=e.sum;
          if(e.source_id==2) s2+=e.sum;
          if(e.source_id==3) s3+=e.sum;
          if(e.source_id==4) s4+=e.sum;
          if(e.source_id==5) s5+=e.sum;
        });
        this.showHaveTotalSource=[s1,s2,s3,s4,s5]
        print.log('仓库库存的储量为',this.showHaveTotalSource)
      })
    },
    //判断 需要原料数 与 库存原料数 差值
    judgeTotalSurce(){
      let judge=false
      if(this.chooseResearch.s1*this.number<=this.showHaveTotalSource[0]&&this.chooseResearch.s2*this.number<=this.showHaveTotalSource[1]&&this.chooseResearch.s3*this.number<=this.showHaveTotalSource[2]&&this.chooseResearch.s4*this.number<=this.showHaveTotalSource[3]&&this.chooseResearch.s5*this.number<=this.showHaveTotalSource[4]){
        this.judge=true
      }else{
        this.judge=false
      }
    },
    // 点击生产
    sendPrice(stay,capacity,number){     //研发产品信息，持续时间，产能，生产线数量
      let researchitem=this.research   //获取生产的产品信息
      //配置生产线 开始工作
      let time=this.number/(this.tLine.capacity*this.currentLineNumber);
      print.log('选中的产品为->',researchitem,'生产持续时间为->',time)
      req.post_Param('api/ass/indusland_factory_line',{
        'judge':2,
        'stay':time,
        'start':moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        'indusland_factory_line_id':this.tLine.indusland_factory_line.id,
        'condition':1,
        'commerresearch_id':this.chooseResearch.id
      })
      .then(res => {        
        s_alert.Success("工业用地-工厂-生产线配置成功，开始生产", "正在加载……", "success");
        this.init()
        this.chooseFactoryIndex(this.factoryIndex)
      })      
      // 更新每一个原料数量
      let usedSource=[researchitem.s1*stay*capacity*number,researchitem.s2*stay*capacity*number,researchitem.s3*stay*capacity*number,researchitem.s4*stay*capacity*number,researchitem.s5*stay*capacity*number];
      // 循环更改数量
      for (let i = 0; i < this.showHaveTotalSource.length; i++) {
        const have = this.showHaveTotalSource[i];
        const used = usedSource[i]
        let sum = Number(have)-Number(used);
        print.log('原有',have,'消耗',used)
        // 执行减少原料逻辑
        let source_id=i+1
        this.updateSourceStock(source_id,sum);
      }
      print.log('仓库原料数量更新成功！','已使用',usedSource)      
    },
    // 减少 原料库存
    updateSourceStock(source_id,sum){
      req.post_Param('api/miniyield',{
        'judge':6,
        'source_id':source_id,
        'company_id':this.company_id,
        'sum':sum
      })
    },
    //显示已购 工业用地
    showMyIndusland() {
      req.post_Param('api/ass/indusland_factory',{
        judge:4,
        company_id:this.company_id
      })
      .then(res => {
        this.showCompeteIndusland=res.data;
        print.log(res.data)
      })
    },
    // 选择工业用地
    chooseInduslandIndex(index){
      print.log('选中工业用地',this.showCompeteIndusland[index])
      this.induslandIndex=index
      this.tIndusland= this.showCompeteIndusland[index]
      this.tFactory=this.showCompeteIndusland[index].factories  //获取对应工业用地 下的 工厂
      this.currentFactoryItem=''
      this.currentLineItem=''
    },
    // 选择工厂
    chooseFactoryIndex(index){
      this.factoryIndex=index
      // 显示 选择 工业用地->工厂 后对应的 工厂信息
      this.currentFactoryItem= this.showCompeteIndusland[this.induslandIndex].factories[this.factoryIndex]
      print.log('工业用地->工厂 后对应的 工厂信息',this.currentFactoryItem)
      this.getInduslandFactoryHaveLineItem()
    },
    //获取工业用地->工厂 一一对应后的 生产线信息
    getInduslandFactoryHaveLineItem(){
      req.post_Param('api/ass/indusland_factory_line',{
        'judge':8,
        'indusland_factory_id':this.showCompeteIndusland[this.induslandIndex].factories[this.factoryIndex].indusland_factory.id
      })
      .then(res => {
        this.currentLineItem=res.data[0]
        print.log('工业用地->工厂 一一对应后的 生产线信息',res.data)
        this.forToChangeCondition(res.data[0].lines)
      })
    },
    //获得选择的 生产产品
    getResearch(index,item){ 
      this.judgeInput=false;
      if(index==1){
        print.log('选择的 自研产品',item)
        this.research=item
        this.chooseResearch=item;
      }else if(index==2){
        print.log('选择的 代工产品',item)
        this.research=item.commerresearch
        this.chooseResearch=item.commerresearch;  
      }
    },
    // 循环遍历，更改生产状态
    forToChangeCondition(data){
      let that =this
      print.log('forToChangeCondition',data)
          for (let s = 0; s < data.length; s++) {
            print.log(data[s].indusland_factory_line)
            if(Number(data[s].indusland_factory_line.condition)==1){
                let now=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
                let endTime=moment(data[s].indusland_factory_line.start).add(data[s].indusland_factory_line.stay, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                print.log(now,endTime)
                if(now > endTime){
                  that.updateConditionToFinished(data[s].indusland_factory_line.id)
                }
            }else{
              continue
            }            
          }     
      },
    //生产完成，重新配置生产线 开始工作
    updateConditionToFinished(indusland_factory_line_id){
      req.post_Param('api/ass/indusland_factory_line',{
        'judge':2,
        'indusland_factory_line_id':indusland_factory_line_id,
        'condition':2
      })
      .then(res => {        
        this.init()
        this.chooseFactoryIndex(this.factoryIndex) //更新页面
      })      
    },
    // 加入库存，重新生产
    reBuild(FinishedResearchItem){
      //加入到 产品库存
      print.log('加入库存，重新生产->',FinishedResearchItem,this.tLine.indusland_factory_line.commerresearch_id)
      let sum=this.tLine.indusland_factory_line.stay*this.tLine.capacity*this.tLine.indusland_factory_line.number
      req.post_Param('api/industryyield',{
        'judge':1,
        'commerresearch_id':this.tLine.indusland_factory_line.commerresearch_id,
        'company_id':this.company_id,
        'kind':1,
        'sum':sum
      })
      .then(res => {        
        print.log(res.data)
        if(res.data[1]){
          this.changeConditionToZero()
        }else{
          let total=res.data[0].sum+sum
          let id=res.data[0].id
          this.updateTotal(total,id)
        }
      })
    },
    // 更新产品库存
    updateTotal(total,id){
      req.post_Param('api/industryyield',{
        'judge':2,
        'sum':total,
        'id':id
      })
      .then(res => {     
        this.changeConditionToZero()
      })
    },
    // 更新状态
    changeConditionToZero(){
      let indusland_factory_line_id=this.tLine.indusland_factory_line.id
      req.post_Param('api/ass/indusland_factory_line',{
        'judge':2,
        'indusland_factory_line_id':indusland_factory_line_id,
        'condition':0
      })
      .then(res => {        
        this.init()
        this.chooseFactoryIndex(this.factoryIndex) //更新页面
        s_alert.Success("库存更新成功", "正在加载……", "success");
      })
    }
      
  }
};
</script>

<style>

</style>
