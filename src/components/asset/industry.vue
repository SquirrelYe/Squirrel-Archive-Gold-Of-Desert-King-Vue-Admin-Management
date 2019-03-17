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
            <h3 class="panel-title">Sway商战大赛-工业用地配置</h3>
          </div>

          <div class="panel-body">
            <div class="col-lg-12">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">                      
                      <div class="row">
                            <div class="col-lg-6" v-for="(item,index) in showCompeteIndusland" :key="index">
                              <div class="panel panel-fill panel-inverse">
                                  <div class="panel-heading" style="height:40px"> 
                                      <h3 class="panel-title" style="float:left">工业用地编号  {{item.id}}、面积{{item.measure}}</h3> 
                                      <i class="fa fa-pencil" style="float:right;font-weight:900"  data-toggle="modal" data-target="#accordion-modal" @click="openSetting(null,item,0)">配置工厂</i>
                                  </div> 
                                  <div class="panel-body"> 
                                    <!-- <p>
                                      暂未配置工厂
                                    </p> -->
                                    <div class="col-lg-6" v-for="(item1,index1) in showCompeteIndusland[index].factories" :key="index1">
                                      <div class="panel panel-fill panel-default">
                                          <div class="panel-heading" style="height:40px"> 
                                              <h3 class="panel-title" style="float:left">工厂编号  {{item1.id}}</h3> 
                                              <i class="fa fa-pencil" style="float:right;font-weight:900"  data-toggle="modal" data-target="#accordion-modal" @click="openSetting(item,item1,1)">配置生产线</i>
                                          </div> 
                                          <div class="panel-body"> 
                                            <div class="row">           
                                              <div class="col-lg-12">
                                                <div v-for="(item2,index2) in showInduslandFactoryLineItem" :key="index2">
                                                  <div v-if="item2.indusland_id==item.id && item2.factory_id==item1.id">
                                                    <!-- 根据 生产线与工业用地&工厂对应关系的indusland_id和factory_id 来匹配 显示 -->
                                                    <div style="color:green">已有当前工厂数量{{item2.number}}</div>
                                                    <div v-if="item2.lines!=''">生产线信息如下：<br>  </div>
                                                    <div v-if="item2.lines==''">暂未配置生产线信息：<br>  </div>
                                                    <div class="btn-group"  v-for="(item3,index3) in item2.lines" :key="index3">
                                                      <button type="button" class="btn dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false" :class="{'btn-default' : index3%4==0,'btn-success' : index3%4==1,'btn-warning' : index3%4==2,'btn-primary' : index3%4==3}">
                                                      {{item3.model}} 
                                                      <span class="caret"></span>
                                                      </button>
                                                      <ul class="dropdown-menu" role="menu">
                                                        <li>
                                                          <a>
                                                            <div align='center'>
                                                              <p>
                                                                <strong>生产线型号：</strong>{{item3.model}}<br>
                                                                <strong>产能：</strong>{{item3.capacity}}<br>
                                                                <strong>产线价值折旧：</strong>{{item3.relief}}<br>
                                                                <strong>良品率：</strong>{{item3.yield}}<br>
                                                                <strong>购置价格：</strong>{{item3.price}}w<br>
                                                                <strong>建设要求：</strong>{{item3.conrequire|formatConrequire}}<br>
                                                                <strong>数量：</strong>{{item3.indusland_factory_line.number}}<br>
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
                                    </div>

                                  </div> 
                              </div>
                            </div>
                        </div>                      
                      
                    </div>
                  </div>
                  <hr>
                  <p>
                    <strong>注意：工业用地->工厂，工厂->生产线有相应限制，请根据赛制规定操作。</strong>
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工业用地-工厂 -->
    <div id="accordion-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
      <div class="modal-dialog">
          <div class="modal-content p-0">
              <div class="panel-group panel-group-joined" id="accordion-test"> 

                <!-- 配置工厂 -->
                <div v-if="Number(chooseFunction)==0">
                  <div class="panel panel-default" v-for="(item,index) in showFactoryItem" :key="index"> 
                    <div class="panel-heading"> 
                        <h4 class="panel-title"> 
                            <a data-toggle="collapse" data-parent="#accordion-test" :href="'#'+index" class="collapsed">
                                工厂编号 # {{item.id}}
                            </a> 
                        </h4> 
                    </div> 
                    <div :id="index" class="panel-collapse collapse" :class="{'in' : index==1}"> 
                        <div class="modal-body" align="center">
                          <table class="table table-bordered table-striped" style id="datatable-editable">
                            <thead>
                              <tr>
                                <th>工厂型号</th>
                                <th>占用面积</th>
                                <th>容纳生产线</th>
                                <th>建设成本</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="gradeX" >
                                <td>{{item.model}}</td>
                                <td>{{item.measure}}</td>
                                <td>{{item.includeline}}</td>
                                <td>{{item.price}}</td>
                              </tr>
                            </tbody>
                          </table>
                          <strong>订单总额为:</strong><strong style='color:green'>{{number|sumPrice(item.price)}}万元</strong><br>
                          <strong>请输入配置数量:</strong><input type="number" v-model="number"><strong>台</strong><br>
                          <div v-for="(item,index) in currentIndustryHaveFactory.rows" :key="index">                            
                            <strong>当前矿区已有工厂编号：{{item.factory_id}}</strong>                        
                            <strong>、工厂数量：{{item.number}}</strong><br>
                          </div>
                          <strong>当前工业用地面积已使用:{{currentIndustryHaveUsedTotalMeasure}}</strong><br>
                          <strong style="color:red" v-if="number*item.measure+currentIndustryHaveUsedTotalMeasure>temp.measure">工厂占用面积超过工业用地面积</strong>
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                          <button
                            type="button"
                            class="btn btn-primary waves-effect waves-light"
                            data-dismiss="modal"
                            @click="sendPriceToFactory(item,number*item.price,number,item.id)"
                            v-if="number!='' && number>0 && number*item.measure+currentIndustryHaveUsedTotalMeasure<=temp.measure"
                          >提交订单</button>
                        </div>
                    </div> 
                  </div> 
                </div>

                <!-- 配置生产线 -->
                <div v-if="Number(chooseFunction)==1">
                  <div class="panel panel-default" v-for="(item,index) in showLineItem" :key="index" v-if="chooseLineByFactoryIdNumber>=item.conrequire"> 
                    <div class="panel-heading"> 
                        <h4 class="panel-title"> 
                            <a data-toggle="collapse" data-parent="#accordion-test1" :href="'#'+index" class="collapsed">
                                生产线编号 # {{item.id}}
                            </a> 
                        </h4> 
                    </div> 
                    <div :id="index" class="panel-collapse collapse" :class="{'in' : index==1}"> 
                      <div class="modal-body" align="center">
                        <table class="table table-bordered table-striped" style id="datatable-editable">
                          <thead>
                            <tr>
                              <th>型号</th>
                              <th>产能</th>
                              <th>产线价值折旧折旧</th>
                              <th>良品率</th>
                              <th>价值</th>
                              <th>建设要求</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="gradeX" >
                              <td>{{item.model}}</td>
                              <td>{{item.capacity}}</td>
                              <td>{{item.relief}}</td>
                              <td>{{item.yield}}</td>
                              <td>{{item.price}}</td>
                              <td>{{item.conrequire}}</td>
                            </tr>
                          </tbody>
                        </table>
                        <strong>订单总额为:</strong><strong style='color:green'>{{number|sumPrice(item.price)}}万元</strong><br>
                        <strong>请输入配置数量:</strong><input type="number" v-model="number"><strong>条</strong><br>
                        <strong style='color:green' v-if="temp.indusland_factory">当前工厂允许容纳的最大生产线数量:</strong><br>
                        <strong style='color:green'>工厂数量{{temp.indusland_factory.number}}*单个工厂允许容纳生产线{{currentChoosedFactoryItem.includeline}}={{temp.indusland_factory.number*currentChoosedFactoryItem.includeline}}</strong><br>
                        <strong style='color:red'>当前工厂已配置生产线数量:{{currentChoosedFactoryHaveLineTotal}}</strong><br>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                          <button
                            type="button"
                            class="btn btn-primary waves-effect waves-light"
                            data-dismiss="modal"
                            @click="sendPriceToLine(item,index,number*item.price,number,item.id)"
                            v-if="number!='' && number>0 && Number(currentChoosedFactoryHaveLineTotal)+Number(number)<=Number(temp.indusland_factory.number*currentChoosedFactoryItem.includeline)"
                          >提交订单</button>
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
const notify = require("bootstrap-notify");
import app from "../../App.vue";
var App = app;

export default {
  name: "industry",
  data() {
    return {
      company_id:'',
      Yearid:'',

      showCompeteIndusland:'',
      showLineItem:'',
      showFactoryItem:'',
      showInduslandFactoryLineItem:'',
      //处理选择 配置工厂 or 生产线
      chooseFunction:'',
      chooseLineByFactoryIdNumber:'',
      currentChoosedFactoryItem:'',
      currentChoosedFactoryHaveLineTotal:0,
      //暂存 工业用地-工厂 中间表 id
      tempInduslandFactoryId:'',
      // 购买清单
      number: "",
      temp:'',
      currentIndustryHaveFactory:'',
      currentIndustryHaveUsedTotalMeasure:''
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
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    sumPrice(x, y) {
      return x * y;
      print.log(x, y);
    },
    formatConrequire(x){
      if(x==1) return '无要求';
      if(x==2) return '大型工厂';
      if(x==3) return '巨无霸工厂';
      if(x==4) return '富士康工厂';
    }
  },
  methods: {
    getInfo(){
      this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
      this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
    },
    init(){
      this.showMyIndusland();
      this.showInduslandFactoryLine();
      this.showAllFactory()  //获取工厂列表
    },
    //配置工厂 & 生产线
    openSetting(item,item1,choose) {

      if(Number(choose)==0){
        //处理选择 配置工厂 or 配置生产线
        this.chooseFunction=0

        this.number=0
        this.haveNumber=0
        this.temp=item1
        print.log('当前选中的工业用地->',this.temp)
        this.getCurrentIndustryHaveFactory(item1)
      }
      
      else if(Number(choose)==1){
        //获取工厂ID进行选择 生产线 页面渲染
        this.chooseLineByFactoryIdNumber=item1.id
        this.showFactoryItem.forEach(e => {  //查找容纳生产线数量
          if(Number(item1.id)==Number(e.id)){
            this.currentChoosedFactoryItem=e
          }
        });
        print.log('当前选择的工厂信息来配置生产线',this.currentChoosedFactoryItem)
        //处理选择 配置工厂 or 配置生产线
        this.chooseFunction=1

        this.number=0
        this.haveNumber=0
        this.temp=item1
        print.log('中间表与line关联数据',this.showInduslandFactoryLineItem)
        print.log('当前选中的工厂->',this.temp)
        
        this.showAllLine();   //获取生产线列表
        this.getInduslandFactoryId(item.id,item1.id) //获取工业用地-工厂 中间表id，来配置新生产线
      }
    },
    //查询 当前 工业用不同工厂数量
    getCurrentIndustryHaveFactory(item1) {      
      req.post_Param('api/ass/indusland_factory',{
        'judge':6,
        'indusland_id':item1.id
      })
      .then(res => {       
        print.log(res.data)  
        this.currentIndustryHaveFactory=res.data
        //获取面积使用情况
        let tempMeasure=0;
        res.data.rows.forEach(e => {
          this.temp.factories.forEach(el => {
            if(el.id==e.factory_id) {
              tempMeasure+=el.measure*e.number;
            }
          });
        });
        print.log('面积使用情况->',tempMeasure)
        this.currentIndustryHaveUsedTotalMeasure=tempMeasure
      })
    },
    //购买工厂 绑定 到工业用地
    sendPriceToFactory(item,money,number,factory_id) {      
      let that=this;
      // 查询资产信息
      apis.getOneStatisticByCompanyId(that.company_id)
      .then(res => {
        if(res.data.float>=money){
          let float=res.data.float-money;
          let fixed=res.data.fixed+money;
          // 更新资产信息
          req.post(`api/statistic?judge=4&float=${float}&fixed=${fixed}&company_id=${that.company_id}`)
          // 绑定工业用地
          req.post(`api/ass/indusland_factory?judge=1&indusland_id=${this.temp.id}&factory_id=${factory_id}`)  // this.temp选择的工业用地
          .then(res => {
            if(res){
              // 更新数量
              that.sendNumber(item)           
              // 写入交易
              req.post(`api/transaction?judge=1&id=0&Yearid=${that.Yearid}&inout=1&type=4&kind=3&price=${money/number}&number=${number}&me=${that.company_id}&factory_id=${factory_id}`)
            }else{
              s_alert.Success("下单失败", "正在加载……", "success");
            }
          })
        }else{
          s_alert.Success("下单失败", "可用流动资金不足……", "warning");
        }        
      })
    },
    sendNumber(item) {
      //更改 工厂 数量
      let that=this
      print.log(that.temp,item)      
      try {
        let n1=0;
        for (let i = 0; i < this.temp.factories.length; i++) {
          const e = this.temp.factories[i];
          if(e.id==item.id) n1+=e.indusland_factory.number;
        }
        let addNumber= Number(n1) + Number(that.number)
        req.post_Param('api/ass/indusland_factory',{
          judge:5,
          indusland_id:that.temp.id,
          factory_id:item.id,
          number:addNumber
        })
        .then(res => {       
          print.log(res.data)   
          if(res){
            s_alert.Success("下单成功", "正在加载……", "success");
            that.init()
          }else{
            s_alert.Success("下单失败", "正在加载……", "success");
          }
        })
      } 
      catch (error) {
        let addNumber= Number(that.number)
        print.log(addNumber)
        req.post_Param('api/ass/indusland_factory',{
          'judge':5,
          'indusland_id':that.temp.id,
          'factory_id':item.id,
          'number':addNumber
        })
        .then(res => {       
          print.log(res.data)   
          if(res){
            s_alert.Success("下单成功", "正在加载……", "success");
            that.init()
          }else{
            s_alert.Success("下单失败", "正在加载……", "success");
          }
        })
      }     
    },
    //获取工业用地-工厂 中间表id，来配置新生产线
    getInduslandFactoryId(indusland_id,factory_id) {
      req.post_Param('api/ass/indusland_factory',{
        'judge':7,
        'indusland_id':indusland_id,
        'factory_id':factory_id
      })
        .then(res => {
          if(res){
            print.log(res.data)
            this.tempInduslandFactoryId=res.data.id
            this.getTotalFactoryHaveLine();
          }else{
            s_alert.Success("获取工业用地-工厂 中间表id失败", "正在加载……", "warning");
          }
        })
    },
    //获取当前工厂已有生产线总数
    getTotalFactoryHaveLine(){       
        let total=0;
        this.showInduslandFactoryLineItem.forEach(el => {
          if(Number(el.id)==Number(this.tempInduslandFactoryId)){
            el.lines.forEach(element => {
              total+=element.indusland_factory_line.number
            });
          }
        });    
        this.currentChoosedFactoryHaveLineTotal=total;
    },
    //购买生产线 绑定 到工厂
    sendPriceToLine(item,index,money,number,line_id) {
      let that=this
      // 获取资产信息
      apis.getOneStatisticByCompanyId(that.company_id)
      .then(res => {
        if(res.data.float>=money){
          let float=res.data.float-money;
          let fixed=res.data.fixed+money;
          // 更新个人资产
          req.post(`api/statistic?judge=4&float=${float}&fixed=${fixed}&company_id=${that.company_id}`);
          // 绑定生产线
          req.post(`api/ass/indusland_factory_line?judge=1&indusland_factory_id=${this.tempInduslandFactoryId}&line_id=${line_id}`)
          .then(res => {
            if(res){
              // 更新页面
              that.init()
              that.sendLineNumber(item)
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
                'line_id':line_id
              })
            }else{
              s_alert.Success("下单失败", "正在加载……", "success");
            }
          })
        }else{
          s_alert.Success("下单失败", "可用流动资金不足……", "warning");
        }
      })
        
    },
    sendLineNumber(item) {
      //更改 生产线 数量
      let that=this        
      try {
        let tid=null;
        for (let i = 0; i < this.showInduslandFactoryLineItem.length; i++) {
          const e = this.showInduslandFactoryLineItem[i];
          if(e.id==this.tempInduslandFactoryId) {
            tid=i; 
          }
        }
        let tid1=null;
        for (let j = 0; j < this.showInduslandFactoryLineItem[tid].lines.length; j++) {
          const e = this.showInduslandFactoryLineItem[tid].lines[j];
          if(e.id==item.id) {
            tid1=j; 
          }    
        }
        print.log('定位数量单元',tid1)
        let addNumber= Number(this.showInduslandFactoryLineItem[tid].lines[tid1].indusland_factory_line.number) + Number(that.number)
        print.log(addNumber)
        req.post_Param('api/ass/indusland_factory_line',{
          'judge':6,
          'indusland_factory_id':this.tempInduslandFactoryId,
          'line_id':item.id,
          'number':addNumber
        })
        .then(res => {       
          that.init()
          print.log(res.data)   
          if(res){
            s_alert.Success("下单成功", "正在加载……", "success");
          }else{
            s_alert.Success("下单失败", "正在加载……", "success");
          }
        })
      } catch (error) {
        let addNumber= Number(that.number)
        req.post_Param('api/ass/indusland_factory_line',{
          'judge':6,
          'indusland_factory_id':this.tempInduslandFactoryId,
          'line_id':item.id,
          'number':addNumber
        })
        .then(res => {          
          that.init()
          print.log(res.data)   
          if(res){
            s_alert.Success("下单成功", "正在加载……", "success");
          }else{
            s_alert.Success("下单失败", "正在加载……", "success");
          }
        })
      }    
    },
    //显示已购 工业用地
    showMyIndusland() {
      req.post_Param('api/ass/indusland_factory',{
        'judge':4,
        'company_id':this.company_id
      })
        .then(res => {          
          this.showCompeteIndusland=res.data;
          print.log('工业用地-工厂 对应关系',this.showCompeteIndusland)
        })
    },
    //显示 工厂
    showAllFactory() {
      req.post_Param('api/factory',{'judge':0})
        .then(res => {
          print.log('不同种类的生产线',res.data);
          this.showFactoryItem = res.data;
        })
    },
    //显示 生产线 
    showAllLine() {      
      req.post_Param('api/line',{'judge':0})
        .then(res => {
          print.log('不同种类的生产线',res.data);
          this.showLineItem = res.data;
        })
    },
    //显示 生产线  (工业用地-工厂 对应的 生产线 汇总信息)
    showInduslandFactoryLine() {    
      req.post_Param('api/ass/indusland_factory_line',{'judge':5})
        .then(res => {
          print.log('工业用地-工厂对应 生产线',res.data);
          this.showInduslandFactoryLineItem = res.data;
        })
    }
  }
};
</script>

<style>

</style>
