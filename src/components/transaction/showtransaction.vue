<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">交易管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-公司代工交易情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>唯一标识符</th>
                    <th>财年</th>
                    <th>资金出入</th>
                    <th>交易类型</th>
                    <th>订单类型</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>交易明细</th>
                    <th>卖方</th>
                    <th>买方</th>
                    <th>交易原料名称</th>
                    <th>交易产品名称</th>
                    <!-- <th>矿区</th>
                    <th>工业用地</th>
                    <th>商业用地</th>
                    <th>挖掘机</th>
                    <th>工厂</th>
                    <th>生产线</th>
                    <th>研究所</th> -->
                    <th>最近日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index">
                    <td>{{index}}</td>
                    <td>T{{item.id}}</td>
                    <td>{{item.Yearid}}</td>
                    <!-- <td>{{item.inout|formatInOut}}</td> -->
                    <td v-if="company_id==item.me">卖出</td>
                    <td v-if="company_id==item.other">买入</td>
                    <td>{{item.type|formatType}}</td>
                    <td>{{item.kind|formatKind}}</td>
                    <td>{{item.price}}</td> 
                    <td>{{item.number}}</td>
                    <td>{{item.detail}}</td>
                    <td v-if="item.me_1">{{item.me_1.name}}</td>
                    <td v-else></td>
                    <td v-if="item.other_1">{{item.other_1.name}}</td>
                    <td v-else></td>
                    <td v-if="item.source">{{item.source.name}}</td>
                    <td v-else></td>
                    <td v-if="item.commerresearch">{{item.commerresearch.name}}</td>
                    <td v-else></td>
                    <!-- <td v-if="item.mining">{{item.mining.star|formatStar}}</td>
                    <td v-else></td>
                    <td v-if="item.indusland">{{item.indusland.model|formatModel}}</td>
                    <td v-else></td>
                    <td v-if="item.commerland">{{item.commerland.level|formatLevel}}</td>
                    <td v-else></td>
                    <td v-if="item.digger">{{item.digger.model}}</td>
                    <td v-else></td>
                    <td v-if="item.factory">{{item.factory.model}}</td>
                    <td v-else></td>
                    <td v-if="item.line">{{item.line.model}}</td>
                    <td v-else></td>
                    <td v-if="item.research">{{item.research.model}}</td>
                    <td v-else></td> -->
                    <td>{{item.updated_at|formatTime}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 分页 -->
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
            <p><strong>注意:上图所示价格单位均为万元。</strong></p>
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
  name: "showtransaction",
  data() {
    return {
      company_id:'',
      showTransaction: '',
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  beforeMount() {
    this.company_id=JSON.parse(ses.getSes('userinfo')).company_id
  },
  mounted() {
      this.showMyCompete()
  },
  filters:{
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    formatInOut(x){
      if(x==1) return '买入';
      if(x==2) return '卖出';
    },
    formatType(x){
      if(x==1) return '定向公司交易';
      if(x==2) return '市场交易';
      if(x==3) return '贷款';
      if(x==4) return '固定资产支出';
    },
    formatKind(x){
      if(x==1) return '原料订单';
      if(x==2) return '产品订单';
      if(x==3) return '现金交易';
    },
    formatStar(x){
      if(x==1) return '一星矿区';
      if(x==2) return '二星矿区';
      if(x==3) return '三星矿区';
      if(x==4) return '四星矿区';
      if(x==5) return '五星矿区';
    },
    formatModel(x){
      if(x==1) return 'A';
      if(x==2) return 'Z';
      if(x==3) return 'C';
      if(x==4) return 'S';
    },
    formatLevel(x){
      if(x==1) return '投契级';
      if(x==2) return '机构级';
      if(x==3) return '投资级';
      if(x==4) return '地标级';
    },
    formatDigger(x){
      if(x==1) return 'A1型挖掘机';
      if(x==2) return 'A2型挖掘机';
      if(x==3) return 'D型挖掘机';
      if(x==1) return 'E型挖掘机';
      if(x==2) return 'R型挖掘机';

    }
  },
  methods: {
    showMyCompete() {
      print.log(this.company_id)
      apis.getOneTransationByCompanyIdAndType(this.company_id,2)
      .then(res => {
          console.log(res.data);
          this.showTransaction = res.data;
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
    }
    //结束分页
  }
};
</script>

<style>
</style>
