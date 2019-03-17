<template>
  <div class="container">
    <!-- Page-Title -->
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">交易管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-交易市场</h3>
          </div>

          <div class="panel-body">
            <div class="col-lg-12">
              <ul class="nav nav-tabs navtab-bg">
                <li class="active" @click="showSource()">
                  <a href="#home" data-toggle="tab" aria-expanded="true">
                    <span class="visible-xs">
                      <i class="fa fa-home"></i>
                    </span>
                    <span class="hidden-xs">原料交易</span>
                  </a>
                </li>
                <li class @click="showGoods()">
                  <a href="#profile" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-user"></i>
                    </span>
                    <span class="hidden-xs">产品交易</span>
                  </a>
                </li>
                <li class @click="showloan()">
                  <a href="#loan" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-user"></i>
                    </span>
                    <span class="hidden-xs">贷款列表</span>
                  </a>
                </li>
                <li class @click="doLoan()">
                  <a href="#doloan" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-envelope-o"></i>
                    </span>
                    <span class="hidden-xs">政府贷款</span>
                  </a>
                </li>
                <li class @click="transaction()">
                  <a href="#transaction" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-envelope-o"></i>
                    </span>
                    <span class="hidden-xs">公司转账</span>
                  </a>
                </li>
              </ul>

              <div class="tab-content">
                <!-- 原料交易展示处 -->
                <div class="tab-pane active" id="home">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>唯一标识符</th>
                            <th>原料名称</th>
                            <th>公司名称</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>更新时间</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showSourceItems" :key="index" v-if="item.source">
                            <td>S{{item.id}}</td>
                            <td>{{item.source.name}}</td>
                            <td>{{item.company.name}}</td>
                            <td>{{item.price}}万</td>
                            <td>{{item.number}}</td>
                            <td>{{item.updated_at|formatTime}}</td>
                            <td class="actions">
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="购买此产品" v-if="item.me!=company_id">
                                <i class="fa fa-tags" data-toggle="modal" data-target="#myModal" @click="openSetting(item)"></i>
                              </a>
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="撤回订单" v-if="item.me==company_id">
                                <i class="fa fa-times" @click="cancer(0,item)"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr>
                  <p><strong>注意</strong>：交易前请先确认可用流动资金足够，以上价格单位均为<strong>万元</strong>。</p>
                </div>
                <!-- 产品交易展示处 -->
                <div class="tab-pane" id="profile">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>唯一标识符</th>
                            <th>产品名称</th>
                            <th>公司名称</th>
                            <th>总量</th>
                            <th>单价</th>
                            <th>更新时间</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showGoodsItems" :key="index" v-if='item.commerresearch'>
                            <td>G{{item.id}}</td>
                            <td>{{item.commerresearch.name}}</td>
                            <td>{{item.company.name}}</td>
                            <td>{{item.number}}</td>
                            <td>{{item.price}}万</td>
                            <td>{{item.updated_at|formatTime}}</td>
                            <td class="actions">
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="购买此产品" v-if="item.me!=company_id">
                                <i class="fa fa-tags" data-toggle="modal" data-target="#myModal" @click="openSetting(item)"></i>
                              </a>
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="撤回订单" v-if="item.me==company_id">
                                <i class="fa fa-times" @click="cancer(1,item)"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                  <hr>
                  <p><strong>注意</strong>：交易前请先确认可用流动资金足够，以上价格单位均为<strong>万元</strong>。</p>
                </div>
                <!-- 已有贷款信息展示 -->
                <div class="tab-pane" id="loan">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>贷款金额</th>
                            <th>开始财年</th>
                            <th>应还财年</th>
                            <th>贷款利率</th>
                            <th>应还金额</th>
                            <th>贷款状态</th>
                            <th>创建时间</th>
                            <th>备注</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showLoanItem" :key="index">
                            <td>{{index}}</td>
                            <td>{{item.money}}万</td>
                            <td>{{item.from}}</td>
                            <td>{{item.end}}</td>
                            <td>{{item.rate}}</td>
                            <td>{{item.send}}万</td>
                            <td>{{item.condition|formatLoanCondition}}</td>
                            <td>{{item.created_at|formatTime}}</td>
                            <td>{{item.detail}}</td>
                            <td class="actions">
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="还清贷款">
                                <i class="fa fa-tags" data-toggle="modal" data-target="#myModal" @click="openSetting(item)" v-if="item.condition==0"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr>
                  <p><strong>注意</strong>：交易前请先确认可用流动资金足够，以上价格单位均为<strong>万元</strong>。</p>
                </div>
                <!-- 政府贷款展示处 -->
                <div class="tab-pane" id="doloan">
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group" v-if="currentCompanyName">
                            <label class="col-md-2 control-label">公司名称</label>
                            <div class="col-md-10">
                                <input type="text" disabled class="form-control" :placeholder="this.currentCompanyName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">贷款金额</label>
                            <div class="col-md-10">
                                <input type="number" class="form-control" placeholder="xxx万元" v-model="money" @input="checkLoanNumber()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">贷款周期</label>
                            <div class="col-md-10">
                                <input type="number" class="form-control" placeholder="0" v-model="stay" @input="getRate()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">贷款利率</label>
                            <div class="col-md-10">
                                <input class="form-control " type="number" disabled v-model="rate">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">备注</label>
                            <div class="col-md-10">
                                <textarea class="form-control" v-model="other" rows="5" placeholder=""></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label"></label>
                            <div class="col-md-10">
                            <button type="button" class="btn btn-block btn-lg btn-success waves-effect waves-light" @click="submitForm()">申请贷款</button>
                            </div>
                        </div>
                    </form>
                  </div> 
                  <hr>
                  <strong align='center' style="color:red">注意：表格中贷款金额单位为万元，当前贷款额度为{{maxLoan}}万元</strong><br>
                  <hr>
                  <p>
                    <strong>注意：</strong><br>
                    贷款额度为公司固定资产的80%，公司品牌价值超过100的部分对可贷上限有百分比提升。<br>
                    <strong>可贷额度</strong>=<strong>(固定资产 - 已贷资金)*0.8*（品牌价值）/100</strong><br>
                    利率：一年8%、两年12%、三年16%，利息计算方法为单利计算<br>                  
                  </p>
                </div>
                <!-- 公司间转账 -->
                <div class="tab-pane" id="transaction">
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-md-2 control-label">公司名称</label>
                            <!-- <div class="col-md-10">
                                <input type="text" disabled class="form-control" :placeholder="this.currentCompanyName">
                            </div> -->
                            <div class="col-md-10">
                                <select class="form-control" v-model="toCompany">
                                    <option v-for="(item,index) in allCompany" :key="index" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="example-email">转账金额</label>
                            <div class="col-md-10">
                                <input type="number" class="form-control" placeholder="xxx万元" v-model="tmoney">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">备注</label>
                            <div class="col-md-10">
                                <textarea class="form-control" v-model="tother" rows="5" placeholder="请注明原因、事件。"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label"></label>
                            <div class="col-md-10">
                            <button type="button" class="btn btn-block btn-lg btn-success waves-effect waves-light" :disabled='tmoney<=0 || toCompany==company_id' @click="transactionToCompany()">转账到公司</button>
                            </div>
                        </div>
                    </form>
                </div> 
                  <hr>
                  <strong align='center' style="color:red">注意：上述转账金额单位为万元（w）</strong><br>
                  <hr>
                  <p>
                    <strong>注意：</strong><br>
                    公司间转账涉及到的场景为：<br>
                    一、产品代工，根据两方公司合约， 转账给代工方首付以及尾款；<br>
                    二、双方产品交易、原料交易(不通过市场交易，直接交易)，"遵循一手交钱、一手交货"的原则，东西到则钱到。                
                  </p>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <!-- 原料Modal -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-if="judgeChoose==0">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 头部 -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">交易清单</h4>
          </div>
          <!-- 内容 -->
          <div class="modal-body" align='center'>
            <h4>原料情况介绍</h4>  
            <!-- <h5> {{model}}</h5> -->
            <address class="ng-scope" v-if="model">
              <strong>原料类型:</strong>{{model.source.name}}<br> 
              <strong>出售公司名称:</strong>{{model.company.name}}<br> 
              <strong>单价:</strong>{{model.price}}<br> 
              <strong>数量:</strong>{{model.number}}<br> 
              <strong>分布时间:</strong>{{model.updated_at|formatTime}}<br> <hr>
              <strong>订单总额为:</strong><strong style="color:green">{{model.number|sumPrice(model.price)}}万元</strong><br> 
              <textarea v-model="detail" placeholder="产品交易备注"></textarea><br>
            </address>             
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(0,model)">提交订单</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 产品Modal -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-if="judgeChoose==1">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 头部 -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">交易清单</h4>
          </div>
          <!-- 内容 -->
          <div class="modal-body" align='center' v-if="model.commerresearch">
            <h4>产品情况介绍</h4>  
            <!-- <h5> {{model}}</h5> -->
            <address class="ng-scope" v-if="model">
              <strong>产品唯一标识符:</strong>{{model.commerresearch.id}}<br>
              <strong>出售公司名称:</strong>{{model.company.name}}<br> 
              <strong>产品名称:</strong>{{model.commerresearch.name}}<br> 
              <strong>产品介绍:</strong>{{model.commerresearch.introduction}}<br> 
              <strong>产品单价:</strong>{{model.commerresearch.price}}<br> 
              <strong>产品数量:</strong>{{model.number}}<br> 
              <strong>发布时间:</strong>{{model.updated_at | formatTime}}<br> <hr>
              <strong>订单总额为:</strong><strong style="color:green">{{model.number|sumPrice(model.commerresearch.price)}}万元</strong><br> 
              <textarea v-model="detail" placeholder="产品交易备注"></textarea><br>
            </address>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(1,model)" >提交订单</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 贷款信息model -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-if="judgeChoose==2">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 头部 -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">贷款清单</h4>
          </div>
          <!-- 内容 -->
          <div class="modal-body" align='center'>
            <h4>贷款情况介绍</h4>  
            <!-- <h5> {{model}}</h5> -->
            <address class="ng-scope">
              <strong>贷款金额:</strong>{{model.money}}<br>
              <strong>开始财年:</strong>{{model.from}}<br> 
              <strong>应还财年:</strong>{{model.end}}<br> 
              <strong>贷款利率:</strong>{{model.rate}}<br> 
              <strong>应还金额:</strong>{{model.send}}<br> 
              <strong>贷款状态:</strong>{{model.condition | formatLoanCondition}}<br> <hr> 
              <strong>贷款备注:</strong>{{model.detail}}<br> 
            </address>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(2,model)" v-if="model.condition==0">还清贷款</button>
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
  name: "docompete",
  data() {
    return {
      //公司信息
      company_id:'',
      Yearid:'',
      //界面信息
      showSourceItems: "",
      showGoodsItems: "",
      showCommerlandItems: "",
      showLoanItem:'',
      showCompete: "",
      model:"",
      number:'',
      //贷款信息
      currentCompanyName:'xx',
      currentCompanyStatistic:'',
      maxLoan:0,
      from:0,
      stay:0,
      end:0,
      rate:0,
      other:'',//备注
      money:0,
      send:0,
      //选择
      judgeChoose:0,
      detail:'',
      // 转账到公司
      toCompany:null,
      allCompany:'',
      tmoney:0,
      tother:'',
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  beforeMount() {
    this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;    
  },
  mounted() {
    this.init()
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  filters: {
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    sumPrice(x,y){
        return x*y
        print.log(x,y)
    },
    formatLoanCondition(x){
      if(x==0) return '未还款'
      if(x==1) return '已还款'
    }
  },
  methods: {
    init(){
      this.showSource();
    },
    // 点击购买
    openSetting(item){
      this.model=item;
      this.number=0;
      print.log(this.model);
    },
    // 撤销订单
    cancer(index,item){
      print.log('撤销订单',item)
      if(confirm('你确定要撤销此订单？')){
        if(index==0){   // 撤销原料订单
          // 删除订单信息
          apis.deleteOneTransationById(item.id)
          // 追加到库存
          req.post_Param('api/miniyield',{
            'judge':1,
            'source_id':item.source_id,
            'company_id':this.company_id,
            'sum':item.number
          })
          .then(res => {  
            print.log(res.data)
            if(!res.data[1]){     // 追加数量
              print.log('追加数量',res.data[0].sum+item.number)
              req.post_Param('api/miniyield',{
                'judge':2,
                'id':res.data[0].id,
                'sum':res.data[0].sum+item.number
              })
              .then(res => {        
                this.init()
                s_alert.Success("撤销此订单成功,物品追加成功", "正在加载……", "success");
              })
            }else{
              this.init()
              s_alert.Success("撤销此订单成功", "正在加载……", "success");
            }
          })
        }else if(index==1){      // 撤销产品订单
          // 删除订单信息
          apis.deleteOneTransationById(item.id)
          // 追加到库存
          req.post_Param('api/industryyield',{
            'judge':1,
            'commerresearch_id':item.commerresearch_id,
            'company_id':this.company_id,
            'sum':item.number
          })
          .then(res => {  
            print.log(res.data)
            if(!res.data[1]){     // 追加数量
              print.log('追加数量',res.data[0].sum+item.number)
              req.post_Param('api/industryyield',{
                'judge':2,
                'id':res.data[0].id,
                'sum':res.data[0].sum+item.number
              })
              .then(res => {        
                this.init()
                s_alert.Success("撤销此订单成功,物品追加成功", "正在加载……", "success");
              })
            }else{
              this.init()
              s_alert.Success("撤销此订单成功", "正在加载……", "success");
            }
          })
        }
      }else{

      }
    },
    // 购买
    sendPrice(index,model){
      print.log(index,model)
      let price=model.price*model.number;

       if(index==0){ //购买 原料
        if(model.me!=this.company_id){
          apis.getOneStatisticByCompanyId(this.company_id)
          .then(res=>{
            if(res.data.float>=price){
              req.post_Param('api/transaction',{
                'judge':2,
                'detail':this.detail,
                'other':this.company_id,
                'id':model.id
              })
              .then(res => {
                print.log(res.data);
                s_alert.Success("下单成功", "正在加载……", "success");
                //追加到 库存
                this.appendToStock(index,model);
                //刷新 页面
                this.showSource()
              })
            }else{
              s_alert.Success('可用流动资金不足','可以通过贷款或售卖增加流动资金','warning')
            }
          })          
        }else{
          s_alert.Success("不能与自己进行交易", "正在加载……", "warning");
        }        
      }

      if(index==1){ //购买 产品
        if(model.me!=this.company_id){
          apis.getOneStatisticByCompanyId(this.company_id)
          .then(res=>{
            if(res.data.float>=price){
              req.post_Param('api/transaction',{
                'judge':2,
                'detail':this.detail,
                'other':this.company_id,
                'id':model.id
              })
              .then(res => {
                print.log(res.data);
                s_alert.Success("下单成功", "正在加载……", "success");
                //追加到 库存
                this.appendToStock(index,model);
                //刷新 页面
                this.showGoods()
              })
            }else{
              s_alert.Success('可用流动资金不足','可以通过贷款或售卖增加流动资金','warning')
            }
          })          
        }else{
          s_alert.Success("不能与自己进行交易", "正在加载……", "warning");
        }        
      }

      if(index==2){ //还清 贷款
        req.post_Param('api/loan',{
          'judge':2,
          'id':model.id,
          'condition':1
        })
        .then(res => {
          print.log(res.data);
          s_alert.Success("还清贷款成功", "正在加载……", "success");
          // 刷新页面
          this.showloan()
          // 还清贷款，更新资产信息
          this.tempPriceEndLoan(model)
        })
      }      
    },
    // 追加订单
    appendToStock(index,model){
      //追加 原料到库存
      if(index==0){
        req.post_Param('api/miniyield',{
          'judge':1,
          'source_id':model.source_id,
          'company_id':this.company_id,
          'sum':model.number
        })
          .then(res => {
            print.log(res.data);
            if(!res.data[1]){    
              //已有此原料 更新其库存数量
              this.sendNumber(0,model,res.data[0])
              // 更新资产
              this.tempPriceFixed(model)
            }else{
              // 更新资产
              this.tempPriceFixed(model)
            }
          })
      }
      //追加 产品库存
      if(index==1){
        req.post_Param('api/industryyield',{
          'judge':1,
          'commerresearch_id':model.commerresearch_id,
          'company_id':this.company_id,
          'sum':model.number
        })
        .then(res => {
          print.log(res.data);
          if(!res.data[1]){
            //已有此产品 更新其库存数量
            this.sendNumber(1,model,res.data[0])
            // 更新资产
            this.tempPriceFixed(model)
          }else{
            // 更新资产
            this.tempPriceFixed(model)
          }
        })
      }
    },
    // 更新资产模板  
    tempPriceFixed(model){
        req.post_Param('api/statistic',{    //获取买方资产信息
          'judge':5,
          'company_id':this.company_id
        })
        .then(res => {
            let float=res.data.float-model.price*model.number;
            let total=res.data.total-model.price*model.number;
            // 更新资产
            req.post_Param('api/statistic',{
              'judge':4,
              'total':total,
              'float':float,
              'company_id':this.company_id
            })
        })

        req.post_Param('api/statistic',{    //获取卖方资产信息
          'judge':5,
          'company_id':model.me
        })
        .then(res => {
            let float=res.data.float+model.price*model.number;
            let total=res.data.total+model.price*model.number;
            // 更新资产
            req.post_Param('api/statistic',{
              'judge':4,
              'total':total,
              'float':float,
              'company_id':model.me
            })
        })
    },
    //  更新储量
    sendNumber(index,model,data) {
      if(index==0){
        //更改 库存 原料储量
        try {
          let addNumber= Number(data.sum) + Number(model.number)
          print.log('-->',addNumber)
          req.post_Param('api/miniyield',{
            'judge':2,
            'id':data.id,
            'sum':addNumber
          })
          .then(res => {       
            s_alert.Success("下单成功", "正在加载……", "success");
          })
        } 
        catch (error) {
          let addNumber= Number(model.number)
          print.log(addNumber)
          req.post_Param('api/miniyield',{
            'judge':2,
            'id':data.id,
            'sum':addNumber
          })
          .then(res => {       
            print.log(res.data)     
            s_alert.Success("下单成功", "正在加载……", "success");
          })
        }
      }
      if(index==1){
        //更改 库存 产品储量
        try {
          let addNumber= Number(data.sum) + Number(model.number)
          print.log('-->',addNumber)
          req.post_Param('api/industryyield',{
            'judge':2,
            'id':data.id,
            'sum':addNumber
          })
          .then(res => {       
            print.log(res.data)     
            s_alert.Success("下单成功", "正在加载……", "success");
          })
        } 
        catch (error) {
          let addNumber= Number(model.number)
          print.log(addNumber)
          req.post_Param('api/industryyield',{
            'judge':2,
            'id':data.id,
            'sum':addNumber
          })
          .then(res => {       
            print.log(res.data)     
            s_alert.Success("下单成功", "正在加载……", "success");
          })
        }
      }      
    },
    //市场交易 - 原料
    showSource() {
      req.post_Param('api/transaction',{'judge':7})
      .then(res => {
        print.log(res.data);
        this.showSourceItems = res.data;
        this.judgeChoose=0
      })
    },
    //市场交易 - 产品
    showGoods() {
      req.post_Param('api/transaction',{'judge':6})
      .then(res => {
        print.log(res.data);
        this.showGoodsItems = res.data;
        this.judgeChoose=1
      })
    },
    //市场交易 - 贷款      
    doLoan() {
      // 公司名称
      this.currentCompanyName=JSON.parse(ses.getSes('userinfo')).company.name
      // 公司资产信息
      apis.getOneStatisticByCompanyId(this.company_id)
      .then(res=>{
        print.log('当前公司资产信息',res.data)
        this.currentCompanyStatistic=res.data;
        if(this.currentCompanyStatistic.fixed>=0){
          this.maxLoan=(this.currentCompanyStatistic.fixed*0.8*this.currentCompanyStatistic.brand/100).toFixed(2);
        }else{
          this.maxLoan=0;
        }
      })
    },
    // 显示贷款信息
    showloan(){
      req.post_Param('api/loan',{
        'judge':4,
        'company_id':this.company_id
      })
      .then(res => {
        print.log(res.data);
        this.showLoanItem = res.data;
        this.judgeChoose=2
      })
    },
    // 校验贷款金额
    checkLoanNumber(){
      print.log(this.money,this.maxLoan)
      if(this.money>this.maxLoan) {
        s_alert.Warning('超过贷款额度','请改正后重试……');
        this.money=0;
      }
    },
    // 提交贷款
    submitForm(){
      if(this.money==0 || this.stay==0 || this.other==''){
        s_alert.Warning('贷款信息填写不能有空','请改正后重试……');
      }else{
        //市场交易 - 提交贷款
        //贷款信息
        let send=this.money*(1+(this.rate*this.stay));//应还总额
        let from=Number(JSON.parse(ses.getSes('gameinfo')).Yearid) //当前财年
        let end=Number(JSON.parse(ses.getSes('gameinfo')).Yearid)+Number(this.stay);//应还财年
        // 提交贷款信息
        req.post_Param('api/loan',{
          'judge':1,
          'from':from,
          'stay':this.stay,
          'end':end,
          'rate':this.rate,
          'detail':this.other,
          'money':this.money,
          'send':send,
          'condition':0,
          'company_id':this.company_id
        })
        .then(res => {
          print.log(res.data)
          if(res.data[1]){
            s_alert.Success("贷款信息提交成功", "正在加载……", "success");
            this.tempPriceLoan(this.money)  //更新资产
            // 初始化贷款信息
            this.money=0;
            this.stay=0;
            this.other=''
          }else{
            s_alert.Warning('尚有贷款未还清','请还清后重试……')
            // 初始化贷款信息
            this.money=0;
            this.stay=0;
            this.other=''
          }
        })
      }
    },
    // 贷款成功，增加个人资产
    tempPriceLoan(money){
      // 查询个人资产
      req.post_Param('api/statistic',{
        'judge':5,
        'company_id':this.company_id
      })
      .then(res => {
          let float=Number(res.data.float)+Number(money);
          let total=Number(res.data.total)+Number(money);
          // 更新个人资产
          print.log('更新资产为',float,total);
          req.post_Param('api/statistic',{
            'judge':4,
            'total':total,
            'float':float,
            'company_id':this.company_id
          })
          // 写入交易信息
          req.post_Param('api/transaction',{
              'judge':1,
              'id':0,
              'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
              'inout':2,
              'type':3,
              'kind':3,
              'price':money,
              'number':1,
              'me':this.company_id,
              'detail':`贷款：${this.other}`
          })
          .then(res => {
            print.log(res.data);
            this.init()
          })
      })
    },
    // 还清贷款，减少个人资产
    tempPriceEndLoan(model){
      // 查询个人资产
      req.post_Param('api/statistic',{
        'judge':5,
        'company_id':this.company_id
      })
      .then(res => {
        print.log('个人信息-->',res.data)
          let float=res.data.float-Number(model.send);
          let total=res.data.total-Number(model.send);
          // 更新个人资产
          req.post_Param('api/statistic',{
            'judge':4,
            'total':total,
            'float':float,
            'company_id':this.company_id
          })
          // 写入交易信息
          req.post_Param('api/transaction',{
              'judge':1,
              'id':0,
              'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
              'inout':1,
              'type':3,
              'kind':3,
              'price':model.send,
              'number':1,
              'me':this.company_id,
              'detail':`还清贷款：${model.send}`
          })
      })
    },
    // 利率格式化
    getRate(){
      if(this.stay==0) this.rate=0;
      if(this.stay==1) this.rate=0.08;
      if(this.stay==2) this.rate=0.12;
      if(this.stay==3) this.rate=0.16;
      if(this.stay>3||this.stay<0) {
        s_alert.Warning('贷款年限输入有误','贷款年限不能小于0或者大于3，请改正后重试……')
        this.stay=0;
        this.rate=0;
      }
    },
    // 点击公司转账
    transaction(){
      apis.getAllCompany()  // 获取公司列表
      .then(res=>{
        this.allCompany=res.data;
      })
      // 初始化数据
      this.toCompany=null,
      this.tmoney=0
      this.tother=''
    },
    // 提交公司转账
    transactionToCompany(){
      print.log('公司间转账信息',this.toCompany,this.tmoney,this.tother)

      apis.getOneStatisticByCompanyId(this.company_id) //获取己方资产信息
      .then(res => {
          let float=Number(res.data.float)-this.tmoney;
          let total=Number(res.data.total)-this.tmoney;
          // 更新资产
          req.post_Param('api/statistic',{
            'judge':4,
            'total':total,
            'float':float,
            'company_id':this.company_id
          })
      })

      apis.getOneStatisticByCompanyId(this.toCompany)    //获取卖方资产信息
      .then(res => {
          let float=Number(res.data.float)+Number(this.tmoney);
          let total=Number(res.data.total)+Number(this.tmoney);
          // 更新资产
          req.post_Param('api/statistic',{
            'judge':4,
            'total':total,
            'float':float,
            'company_id':this.toCompany
          })
          .then(res=>{
            // 写入交易
            req.post(`api/transaction?judge=1&id=0&Yearid=${this.Yearid}&inout=2&type=1&kind=3&number=1&price=${this.tmoney}&me=${this.toCompany}&other=${this.company_id}&detail=${this.tother}`)
            .then(res=>{
              print.log(res.data)
              s_alert.Success("公司间转账成功！", "正在加载……", "success");
            })
          })
      })


    }
  }
}
</script>

<style>

</style>
