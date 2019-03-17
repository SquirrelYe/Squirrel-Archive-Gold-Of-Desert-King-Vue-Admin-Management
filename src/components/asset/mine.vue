<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">资产管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-矿区配置</h3>
          </div>

          <div class="panel-body">
            <div class="col-lg-12">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      
                      <div class="row">
                            <div class="col-lg-4" v-for="(item1,index) in showCompeteMining" :key="index">
                                <div class="panel panel-fill" :class="{'panel-inverse' : index%3==0,'panel-purple' : index%3==1,'panel-success' : index%3==2}">
                                    <div class="panel-heading" style="height:40px"> 
                                        <h3 class="panel-title" style="float:left">矿区编号  {{item1.id}}</h3> 
                                        <i class="fa fa-pencil" style="float:right"  data-toggle="modal" data-target="#accordion-modal" @click="openSetting(item1)">配置挖掘机</i>
                                    </div> 
                                    <div class="panel-body"> 
                                      <div class="row">           
                                        <div class="col-lg-12">
                                          <div v-if="item1.diggers!=''">已配置挖掘机信息如下：<br>  </div>
                                          <div v-if="item1.diggers==''">暂未配置挖掘机<br>  </div>
                                          <div class="btn-group" v-for="(item,index) in showCompeteMining[index].diggers" :key="index" v-if='item.mining_digger.number>0'>
                                              <button type="button" class="btn dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false" :class="{'btn-default' : index%4==0,'btn-success' : index%4==1,'btn-warning' : index%4==2,'btn-primary' : index%4==3}">
                                                {{item.model}} 
                                                <span class="caret"></span>
                                              </button>
                                              <ul class="dropdown-menu" role="menu">
                                                  <li>
                                                    <a>
                                                      <div align='center'>
                                                        <p>
                                                          <strong>挖掘机型号：</strong>{{item.model}}<br>
                                                          <strong>购置价格：</strong>{{item.price}}<br>
                                                          <strong>挖掘效率：</strong>{{item.efficient}}<br>
                                                          <strong>价值折旧：</strong>{{item.deprelief}}<br>
                                                          <strong>挖机数量：</strong>{{item.mining_digger.number}}<br>
                                                          <strong style="color:red" data-toggle="modal" data-target="#company" @click="move(item1,item,item.mining_digger.number)">移动挖掘机至其他矿区</strong>
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
                      每块矿区允许容纳的最大挖掘机数量为4台，转移挖掘机时需确认转移后矿区挖掘机数量不超过限制。
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

                  <div class="panel  panel-default" v-for="(item,index) in showDiggerItems" :key="index" > 
                    <div class="panel-heading"> 
                        <h4 class="panel-title"> 
                            <a data-toggle="collapse" data-parent="#accordion-test" :href="'#'+index" class="collapsed">
                                挖掘机编号 # {{item.id}}
                            </a> 
                        </h4> 
                    </div> 
                    <div :id="index" class="panel-collapse collapse" :class="{'in' : index==1}"> 
                        <div class="modal-body" align="center">
                          <table class="table table-bordered table-striped" style id="datatable-editable">
                            <thead>
                              <tr>
                                <th>挖掘机型号</th>
                                <th>价格</th>
                                <th>挖掘效率</th>
                                <th>价值折旧</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="gradeX" >
                                <td>{{item.model}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.efficient}}</td>
                                <td>{{item.deprelief}}</td>
                              </tr>
                            </tbody>
                          </table>
                          <strong>订单总额为:</strong><strong style='color:green'>{{number|sumPrice(item.price)}}万元</strong><br>
                          <strong>请输入配置数量:</strong><input type="number" v-model="number" @input="checkMaxNumber()"><strong>台</strong><br>
                          <strong style="color:red">此矿区当前已配置挖掘机数量：{{haveNumber}}</strong><br>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                          <button
                            type="button"
                            class="btn btn-primary waves-effect waves-light"
                            data-dismiss="modal"
                            @click="sendPrice(item,number*item.price,number,item.id)"
                            v-if="number!='' && number>0 && Number(number)+Number(haveNumber)<=4"
                          >提交订单</button>
                        </div>
                    </div> 
                  </div> 

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
            <h4 class="modal-title" id="myModalLabel">转移挖掘机</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>转移挖掘机到其他矿区</h4></div>
                        <!-- <div class="panel-body">
                            <form class="form-horizontal" role="form">                             
                                <div class="form-group">
                                    <label class="col-md-3 control-label" >目的矿区编号</label>
                                    <div class="col-md-9">
                                        <input type="number" class="form-control" v-model="kqbh">
                                    </div>
                                    <label class="col-md-3 control-label">目的挖机数量</label>
                                    <div class="col-md-9">
                                        <input type="number" class="form-control" v-model="wjjsl">
                                    </div>
                                </div>          
                                <div style="color:red">注意：每个矿区只能容纳四台挖掘机，转移前请检查矿区挖掘机数量。</div>              
                            </form>
                        </div> -->
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                    <label class="col-md-2 control-label">目的矿区</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="kqbh">
                                            <option v-for="(item,index) in showCompeteMining" :key="index" :value="item.id">编号{{item.id}}、{{item.star|formatStar}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                  <label class="col-sm-2 control-label">挖机数量</label>
                                  <div class="col-sm-10">
                                      <input type="number" class="form-control"  v-model="wjjsl">
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
              <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="moveDigger()" v-if="this.wjjsl<=this.m3 && this.wjjsl!=''">转移到矿区</button>
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

      showCompeteMining:'',
      showDiggerItems:'',
      //购买挖掘机
      haveNumber:0,
      number: "",
      temp:'',

      //转移挖掘机
      kqbh:'',
      wjjsl:'',
      m1:'',
      m2:'',
      m3:0,
    };
  },
  beforeMount() {
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  mounted() {
    this.init()
    setTimeout(() => {
      this.getInfo();
    }, 10000);
  },
  filters: {
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    sumPrice(x, y) {
      return x * y;
      print.log(x, y);
    },
    formatDiggerNumber(x){
      if(x==null) return '暂未配置挖掘机';
      else return x;
    },
    formatStar(x){
      if(x==1) return '一星矿区'
      if(x==2) return '二星矿区'
      if(x==3) return '三星矿区'
      if(x==4) return '四星矿区'
      if(x==5) return '五星矿区'
    },
  },
  methods: {
    getInfo(){
      this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
      this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
    },
    init(){
      this.showMyMining();
      this.showDigger()
    },
    // 点击配置挖掘机
    openSetting(item) {
      this.number=0
      this.haveNumber=0
      this.temp=item
      print.log('--->当前矿区配置清单',item)
      this.showDigger()
      this.getHaveNumber(item.id)
    },
    //获取当前 矿区 已有挖掘机数量
    getHaveNumber(mid){
      req.post_Param('api/ass/mining_digger',{
        'judge':7,
        'mining_id':mid
      })
        .then(res => {   
          print.log(res.data)
          let n=0
          res.data.rows.forEach(e => {
            n+=e.number
          });
          this.haveNumber=n  //当前矿区已配置挖掘机数量          
        })
    },
    // 获取挖掘机移动信息
    move(item1,item,number){
      print.log(item1,item,number)
      this.m1=item1;  //所属矿区信息
      this.m2=item;   //挖掘机信息
      this.m3=number;   //数量
      this.kqbh=''
      this.wjjsl=''
    },
    // 移动挖掘机
    moveDigger(){
        //减少挖掘机数量
        req.post(`api/ass/mining_digger?judge=6&mining_id=${this.m1.id}&digger_id=${this.m2.id}&number=${Number(this.m3)-Number(this.wjjsl)}`)  
        //查询有无相同挖掘机,无则创建
        req.post(`api/ass/mining_digger?judge=10&mining_id=${this.kqbh}&digger_id=${this.m2.id}&id=0&number=${this.wjjsl}`)
        .then(res=>{
          print.log('矿区无此类挖掘机',res.data)
          let number=Number(res.data[0].number)+Number(this.wjjsl)
          if(!res.data[1]){
            req.post(`api/ass/mining_digger?judge=6&mining_id=${res.data[0].mining_id}&digger_id=${res.data[0].digger_id}&number=${number}`)
            this.init()
          }else{
            this.init()
          }
        })        
    },
    //购买挖掘机 绑定 到矿区
    sendPrice(item,money,number,digger_id) {
      let that=this
      // 查询个人资产
      apis.getOneStatisticByCompanyId(that.company_id)
      .then(res => {
        if(res.data.float>=money){
          let float=res.data.float-money;
          let fixed=res.data.fixed+money;
          // 更新个人资产
          req.post(`api/statistic?judge=4&float=${float}&fixed=${fixed}&company_id=${that.company_id}`);
          // 绑定挖掘机
          req.post_Param('api/ass/mining_digger',{
            'judge':1,
            'mining_id':that.temp.id,
            'digger_id':digger_id
          })
          .then(res => {
            // 写入交易信息
            req.post_Param('api/transaction',{
              'judge':1,
              'id':0,
              'Yearid':that.Yearid,
              'inout':1,
              'type':4,
              'kind':3,
              'price':money/number,
              'number':number,
              'me':that.company_id,
              'digger_id':digger_id
            })
            // 更新页面
            that.init()
            // 更新数量
            that.sendNumber(item)
          })
        }else{
          s_alert.Success("下单失败", "可用流动资金不足……", "warning");
        }
      })
    },
    //更改 挖掘机 数量
    sendNumber(item) {      
      try {
        let n1=0;
        for (let i = 0; i < this.temp.diggers.length; i++) {
          const e = this.temp.diggers[i];
          if(e.id==item.id) n1+=e.mining_digger.number;
        }
        let addNumber= Number(n1) + Number(this.number)
        // 更新矿区挖掘机数量
        req.post_Param('api/ass/mining_digger',{
          'judge':6,
          'mining_id':this.temp.id,
          'digger_id':item.id,
          'number':addNumber
        })
        .then(res => {
          if(res){
            s_alert.Success("下单成功", "正在加载……", "success");
            this.init()
          }else{
            s_alert.Success("下单失败", "正在加载……", "success");
          }
        })
      } 
      catch (error) {
        let addNumber= Number(this.number)
        // 更新矿区挖掘机数量
        req.post_Param('api/ass/mining_digger',{
          'judge':6,
          'mining_id':this.temp.id,
          'digger_id':item.id,
          'number':addNumber
        })
        .then(res => {
          if(res){
            s_alert.Success("下单成功", "正在加载……", "success");
            this.init()
          }else{
            s_alert.Success("下单失败", "正在加载……", "success");
          }
        })
      }
    },
    // 检查矿区挖掘机数量限制
    checkMaxNumber(){
      if(Number(this.number)+Number(this.haveNumber)>4){
          s_alert.Success("矿区挖掘机数量不超过4个", "正在加载……", "warning");
      }
    },
    //显示已购 矿区
    showMyMining() {    
      req.post_Param('api/ass/mining_digger',{
        judge:5,
        company_id:this.company_id
      })
        .then(res => {
          this.showCompeteMining=res.data;
          print.log('显示已购 矿区',this.showCompeteMining)
        })
    },
    //显示 挖掘机 信息
    showDigger() {
      req.post_Param('api/digger',{'judge':0})
        .then(res => {
          print.log('显示 挖掘机 信息',res.data);
          this.showDiggerItems = res.data;
        })
    }
  }
};
</script>

<style>

</style>
