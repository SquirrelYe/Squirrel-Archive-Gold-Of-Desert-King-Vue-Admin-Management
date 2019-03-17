<template>
  <div class="container">
    <!-- Page-Title -->
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">竞拍管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-竞拍资产</h3>
          </div>

          <div class="panel-body">
            <div class="col-lg-12">
              <ul class="nav nav-tabs navtab-bg">
                <li class="active" @click="showMining()">
                  <a href="#home" data-toggle="tab" aria-expanded="true">
                    <span class="visible-xs">
                      <i class="fa fa-home"></i>
                    </span>
                    <span class="hidden-xs">矿区</span>
                  </a>
                </li>
                <li class @click="showIndus()">
                  <a href="#profile" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-user"></i>
                    </span>
                    <span class="hidden-xs">工业用地</span>
                  </a>
                </li>
                <li class @click="showCommer()">
                  <a href="#messages" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-envelope-o"></i>
                    </span>
                    <span class="hidden-xs">商业用地</span>
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <!-- 矿区展示处 -->
                <div class="tab-pane active" id="home">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>唯一标识符</th>
                            <th>矿区星级</th>
                            <th>属性</th>
                            <th>元素储量</th>
                            <th>折旧减免</th>
                            <th>回购价值</th>
                            <th>起拍价</th>
                            <th>状态</th>
                            <th>成交价</th>
                            <th>成交公司</th>
                            <th>出现财年</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showItems" :key="index">
                            <td>{{index}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.star | formatStar}}</td>
                            <td>{{item.source_id|formatSource}}</td>
                            <td>{{item.reserve}}</td>
                            <td>{{item.deprelief}}</td>
                            <td>{{item.repurchase}}</td>
                            <td>{{item.startprice}}</td>
                            <td>{{item.condition|formatCondition}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.company">{{item.company.name}}</td><td v-else></td>
                            <td>{{item.Yearid}}</td>
                            <td class="actions" align="center">
                              <a class="waves-effect waves-light" @click="openSetting(item,1)" data-toggle="tooltip" data-placement="top" title="竞拍出价">
                                <i class="fa fa-tags" data-toggle="modal" data-target="#myModal" ></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                    </div>
                    <div class="col-sm-6">
                      <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                        <ul class="pagination" style="float:right">
                          <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                            <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                          </li>
                          <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                            <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                          </li>
                          <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                            <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <p><strong>注意</strong>：拍卖过程分为明拍与暗拍两种，明拍线下举行，暗拍线上举行。以上单位均为<strong>万元</strong>。</p>
                </div>
                <!-- 工业用地展示处 -->
                <div class="tab-pane" id="profile">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>唯一标识符</th>
                            <th>型号</th>
                            <th>土地面积</th>
                            <th>生产效率提升</th>
                            <th>产线价值折旧减免</th>
                            <th>改良花费</th>
                            <th>起拍价</th>
                            <th>状态</th>
                            <th>成交价</th>
                            <th>成交公司</th>
                            <th>出现财年</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showItems" :key="index">
                            <td>{{index}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.model|formatmodel}}</td>
                            <td>{{item.measure}}</td>
                            <td>{{item.efficient}}</td>
                            <td>{{item.repurchase}}</td>
                            <td>{{item.improve}}</td>
                            <td>{{item.startprice}}</td>
                            <td>{{item.condition|formatCondition}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.company">{{item.company.name}}</td><td v-else></td>
                            <td>{{item.Yearid}}</td>
                            <td class="actions" align="center">
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="竞拍出价">
                                <i class="fa fa-tags" data-toggle="modal" data-target="#myModal1" @click="openSetting(item,2)" ></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                    </div>
                    <div class="col-sm-6">
                      <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                        <ul class="pagination" style="float:right">
                          <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                            <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                          </li>
                          <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                            <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                          </li>
                          <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                            <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <p><strong>注意</strong>：拍卖过程分为明拍与暗拍两种，明拍线下举行，暗拍线上举行。以上单位均为<strong>万元</strong>。</p>
                </div>
                <!-- 商业用地展示处 -->
                <div class="tab-pane" id="messages">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>唯一标识符</th>
                            <th>等级</th>
                            <th>品牌提升</th>
                            <th>增值空间</th>
                            <th>起拍价</th>
                            <th>状态</th>
                            <th>成交价</th>
                            <th>成交公司</th>
                            <th>出现财年</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showItems" :key="index">
                            <td>{{index}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.level|formatlevel}}</td>
                            <td>{{item.brand}}</td>
                            <td>{{item.increment}}</td>
                            <td>{{item.startprice}}</td>
                            <td>{{item.condition|formatCondition}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.company">{{item.company.name}}</td><td v-else></td>
                            <td>{{item.Yearid}}</td>
                            <td class="actions" align="center">
                              <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="竞拍出价">
                                <i class="fa fa-tags" data-toggle="modal" data-target="#myModal2" @click="openSetting(item,3)" ></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>    
                  
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                    </div>
                    <div class="col-sm-6">
                      <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                        <ul class="pagination" style="float:right">
                          <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                            <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                          </li>
                          <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                            <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                          </li>
                          <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                            <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>              
                  <hr>
                  <p><strong>注意</strong>：拍卖过程分为明拍与暗拍两种，明拍线下举行，暗拍线上举行。以上单位均为<strong>万元</strong>。</p>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
    <!-- mining -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">竞拍单</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <h4>矿区情况介绍</h4>  
              <!-- <h5> {{model}}</h5> -->
              <address class="ng-scope">
                <strong>矿区星级:</strong>{{model.star}}<br>
                <strong>原料属性:</strong>{{model.source_id}}<br> 
                <strong>元素储量:</strong>{{model.reserve}}<br> 
                <strong>折旧减免:</strong>{{model.deprelief}}<br> 
                <strong>回购价值:</strong>{{model.repurchase}}<br> <hr>
                <div v-if="model.condition==-2">
                  <h4 style="color:#00b300">竞拍还没有开始</h4>
                </div>
                <div v-if="model.condition==-1">
                  <h4 style="color:#00b300">该商品已流拍</h4>
                </div>
                <div v-if="model.condition==0">
                  <h4 style="color:#00b300">商品竞拍中</h4><br>
                  <strong style="color:#00b300" v-if="price!=null">前一次出价为{{price}}</strong><br>
                  <strong>请输入你的出价:</strong><input type="number" v-model="givePrice"><strong>万元</strong>
                </div>
                <div v-if="model.condition==1">
                  <h4 style="color:#00b300">商品竞拍结束</h4>
                </div>
                <div v-if="model.condition==2">
                  <h4 style="color:#00b300">商品定向公司分配</h4>
                </div>
              </address>             
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(1)" v-if="model.condition==0 && this.givePrice>model.startprice">提交出价</button>
            </div>
        </div>
      </div>
    </div>

    <!-- indusland -->
    <div id="myModal1" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">竞拍单</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <h4>工业用地情况介绍</h4>  
              <!-- <h5> {{model}}</h5> -->
              <address class="ng-scope">
                <strong>工地型号:</strong>{{model.model}}<br>
                <strong>工地面积:</strong>{{model.measure}}<br> 
                <strong>效率提升:</strong>{{model.efficient}}<br> 
                <strong>折旧减免:</strong>{{model.repurchase}}<br> 
                <strong>改良花费:</strong>{{model.improve}}<br> <hr>
                <div v-if="model.condition==-2">
                  <h4 style="color:#00b300">竞拍还没有开始</h4>
                </div>
                <div v-if="model.condition==-1">
                  <h4 style="color:#00b300">该商品已流拍</h4>
                </div>
                <div v-if="model.condition==0">
                  <h4 style="color:#00b300">商品竞拍中</h4><br>
                  <strong style="color:#00b300" v-if="price!=null">前一次出价为{{price}}</strong><br>
                  <strong>请输入你的出价:</strong><input type="number" v-model="givePrice"><strong>万元</strong>
                </div>
                <div v-if="model.condition==1">
                  <h4 style="color:#00b300">商品竞拍结束</h4>
                </div>
                <div v-if="model.condition==2">
                  <h4 style="color:#00b300">商品定向公司分配</h4>
                </div>
              </address>             
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(2)" v-if="model.condition==0 && this.givePrice>model.startprice">提交出价</button>
            </div>
        </div>
      </div>
    </div>

    <!-- commerland -->
    <div id="myModal2" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">竞拍单</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <h4>商业用地情况介绍</h4>  
              <!-- <h5> {{model}}</h5> -->
              <address class="ng-scope">
                <strong>商地等级:</strong>{{model.level}}<br>
                <strong>品牌提升:</strong>{{model.brand}}<br> 
                <strong>增值空间:</strong>{{model.increment}}<br> <hr>
                <div v-if="model.condition==-2">
                  <h4 style="color:#00b300">竞拍还没有开始</h4>
                </div>
                <div v-if="model.condition==-1">
                  <h4 style="color:#00b300">该商品已流拍</h4>
                </div>
                <div v-if="model.condition==0">
                  <h4 style="color:#00b300">商品竞拍中</h4><br>
                  <strong style="color:#00b300" v-if="price!=null">前一次出价为{{price}}</strong><br>
                  <strong>请输入你的出价:</strong><input type="number" v-model="givePrice"><strong>万元</strong>
                </div>
                <div v-if="model.condition==1">
                  <h4 style="color:#00b300">商品竞拍结束</h4>
                </div>
                <div v-if="model.condition==2">
                  <h4 style="color:#00b300">商品已定向公司分配</h4>
                </div>
              </address>               
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendPrice(3)" v-if="model.condition==0 && this.givePrice>model.startprice">提交出价</button>
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
const moment = require("moment");
var App = app;

export default {
  name: "docompete",
  data() {
    return {
      company_id:'',
      Yearid:'',

      showMiningItems: "",
      showInduslandItems: "",
      showCommerlandItems: "",
      
      model:"",
      price:'',
      givePrice:'',
      
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
    this.showMining();
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  filters: {
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    formatCondition(val){
      if(val==-2) return '竞拍未开始'
      if(val==-1) return '产品流拍'
      if(val==0) return '竞拍中'
      if(val==1) return '竞拍已结束'
      if(val==2) return '定向公司发送'
      if(val==3) return '资产已发送'
    },
    formatStar(x){
      if(x==1) return '一星矿区'
      if(x==2) return '二星矿区'
      if(x==3) return '三星矿区'
      if(x==4) return '四星矿区'
      if(x==5) return '五星矿区'
    },
    formatSource(x){
      if(x==1) return '金'
      if(x==2) return '木'
      if(x==3) return '水'
      if(x==4) return '火'
      if(x==5) return '土'
    },
    formatmodel(x){
      if(x==1) return 'A'
      if(x==2) return 'Z'
      if(x==3) return 'C'
      if(x==4) return 'S'
    },
    formatlevel(x){
      if(x==1) return '投契级'
      if(x==2) return '机构级'
      if(x==3) return '投资级'
      if(x==4) return '地标级'
    }
  },
  methods: {
    openSetting(item,judge){
      print.log('当前选择的竞拍物品',item)
      this.givePrice=0
      //矿区
      if(judge==1){
        this.model=item
        this.getMaxPrice(this.model,judge)
      }
      //工业用地
      if(judge==2){
        this.model=item
        this.getMaxPrice(this.model,judge)
      }
      //商业用地
      if(judge==3){
        this.model=item
        this.getMaxPrice(this.model,judge)
      }
    },
    getMaxPrice(m,type){
      //获取竞拍时某一商品已出价
      req.post_Param('api/compete',{
        'judge':5,
        'type':type,
        'thingid':m.id,
        'company_id':JSON.parse(ses.getSes('userinfo')).company_id
      })
        .then(res => {
          print.log('前一次出价',res.data);
          this.price = res.data.auction;
        })
    },
    //出价
    sendPrice(type){
      apis.getOneStatisticByCompanyId(this.company_id)
      .then(res=>{
        if(res.data.float>=this.givePrice){
          req.post_Param('api/compete',{
          'judge':1,
          'type':type,
          'thingid':this.model.id,
          'company_id':JSON.parse(ses.getSes('userinfo')).company_id,
          'auction':this.givePrice
        })
          .then(res => {
            print.log(res.data);
            // 更新竞拍价
            req.post_Param('api/compete',{
              'judge':4,
              'type':type,
              'thingid':this.model.id,
              'company_id':JSON.parse(ses.getSes('userinfo')).company_id,
              'auction':this.givePrice,
              'condition':0,
              'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid
            })
            .then(res=>{
              print.log(res.data)
              s_alert.Success(`你的此次出价为：${this.givePrice}`, "正在加载……", "success");
            })
          })
        }else{
          s_alert.Success('你的可用流动资金不足', "请检查……", "warning");
        }
      })      
    },
    //获取政府矿区竞拍汇总表
    showMining() {
      req.post_Param('api/mining',{'judge':0})
        .then(res => {
          print.log(res.data);
          this.showMiningItems = res.data;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },
    //获取政府工业用地竞拍汇总表  
    showIndus() {    
      req.post_Param('api/indusland',{'judge':0})
        .then(res => {
          print.log(res.data);
          this.showInduslandItems = res.data;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },
    //获取政府商业用地竞拍汇总表
    showCommer() {
      req.post_Param('api/commerland',{'judge':0})
        .then(res => {
          print.log(res.data);
          this.showCommerlandItems = res.data;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },

    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    show(items) {
      this.items=items;
      this.sumPage = Math.ceil(this.items.length / this.PageShowSum);
      //页面加载完成，默认加载第一页
      let page = Number(this.currentPage) + 1;
      this.showEachPage(page);
      print.log("当前数据总页为：--->", this.sumPage);
    },
    switchPage(page) {
      let p = page - 1;
      this.currentPage = `${p}`;
      print.log("当前-->", page);
      this.showEachPage(page);
    },
    showEachPage(page) {
      let all = this.items;
      this.showItems = [];
      for (
        let i = (page - 1) * this.PageShowSum;
        i < page * this.PageShowSum;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.showItems.push(all[i]);
        }
      }
    },
    nextPage() {
      if (this.currentPage == this.sumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.currentPage) + 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    },
    previousPage() {
      if (this.currentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.currentPage) - 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    },
  }
};
</script>

<style>

</style>
