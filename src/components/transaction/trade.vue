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
            <h3 class="panel-title">Sway商战大赛-公司资金流动情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-hover" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>交易唯一标识符</th>
                    <th>财年</th>
                    <th>金额(w)</th>
                    <th>收支情况</th>
                    <th>备注</th>
                    <th>最近时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="index">
                    <td>{{index}}</td>
                    <td>T{{item.id}}</td>
                    <td>{{item.Yearid}}</td>
                    <td>{{item.price}}*{{item.number}}={{item.price*item.number}}</td>
                    <!-- 格式化收支 -->
                    <td v-if="item.kind==1 || item.kind==2">
                      <div v-if="item.me==company_id">收入</div>
                      <div v-if="item.other==company_id">支出</div>                      
                    </td>
                    <td v-else-if="item.kind==3 && item.type==1">
                      <div v-if="item.me==company_id">收入</div>
                      <div v-if="item.other==company_id">支出</div>                      
                    </td>
                    <td v-else>{{item.inout|formatInOut}}</td>

                    <td v-if="item.source">{{item.source.name}}{{item.detail}}</td>
                    <td v-if="item.commerresearch">{{item.commerresearch.name}}{{item.detail}}</td>
                    <td v-if="item.mining">{{item.mining.star|formatStar}}</td>
                    <td v-if="item.indusland">{{item.indusland.model|formatModel}}</td>
                    <td v-if="item.commerland">{{item.commerland.level|formatLevel}}</td>
                    <td v-if="item.digger">{{item.digger.model}}</td>
                    <td v-if="item.factory">{{item.factory.model}}</td>
                    <td v-if="item.line">{{item.line.model}}</td>
                    <td v-if="item.research">{{item.research.model}}</td>
                    <td v-if="item.detail && !item.source && !item.commerresearch">{{item.detail}}</td>
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
  name: "resource",
  data() {
    return {
      company_id:'',
      Yearid:'',

      showCompete: "",
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
      this.showMyCompete()
  },
  filters:{
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    formatInOut(x){
      if(x==1) return '支出';
      if(x==2) return '收入';
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
  },
  methods: {
    showMyCompete() {
      //获取自己公司竞拍情况
      apis.getOneTransationByCompanyId(this.company_id)
      .then(res => {
          console.log(res.data);
          this.showCompete = res.data;
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
