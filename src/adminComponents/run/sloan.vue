<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">贷款管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-贷款情况</h3>
          </div>
          <div class="panel-body">
            <h4 style="color:green">当前财年：{{Yearid}}</h4>
            <div class="table-responsive">
              <table class="table table-striped" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>唯一标识符</th>
                    <th>贷款公司</th>
                    <th>开始贷款财年</th>
                    <th>贷款周期</th>
                    <th>应还财年</th>
                    <th>利率</th>
                    <th>备注</th>
                    <th>金额</th>
                    <th>应还金额</th>
                    <th>状态</th>
                    <th>最近时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="item.name" v-if="item.company">
                    <td>{{index}}</td>
                    <td>L{{item.id}}</td>
                    <td>{{item.company.name}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.stay}}</td>
                    <td>{{item.end}}</td>
                    <td>{{item.rate}}</td>
                    <td>{{item.detail}}</td>
                    <td>{{item.money}}</td>
                    <td>{{item.send}}</td>
                    <td>{{item.condition | formatCondition}}</td>
                    <td>{{item.updated_at|formatTime}}</td>
                    <td class="actions" v-if="item.condition==0 && item.end<=Yearid">
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="强制还款" @click="force(item)">
                        <i class="fa  fa-check"></i>
                      </a>
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="免费结清" @click="free(item)">
                        <i class="fa  fa-times"></i>
                      </a>
                    </td>
                    <td v-else></td>
                  </tr>
                </tbody>
              </table>
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
  name: "infocompete",
  data() {
    return {
      Yearid:'',

      showAllLoanItem: "",
      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  beforeMount() {
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  mounted() {
    this.init();
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  filters:{
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    formatCondition(val){
      if(val==0) return '未还贷款'
      if(val==1) return '贷款已结清'
    }
  },
  methods: {
    init(){
      this.showAllLoan()
    },
    // 获取自己公司竞拍情况
    showAllLoan() {
      req.post_Param('api/ass/company_loan',{
        'judge':4
      })
        .then(res => {
          console.log(res.data);
          this.showAllLoanItem = res.data;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },
    // 强制还款
    force(item){
        print.log('强制还款',item)
        apis.getOneStatisticByCompanyId(item.company_id)
        .then(res=>{
            let float=res.data.float-Number(item.send);
            let total=res.data.total-Number(item.send);
            if(res.data.float<item.send){
                if(confirm('该公司流动资金不足以偿还贷款？是否强制还款，流动资金将变为负值。')){
                    // 更新个人资产
                    req.post_Param('api/statistic',{
                        'judge':4,
                        'total':total,
                        'float':float,
                        'company_id':item.company_id
                    })
                    // 写入交易信息
                    req.post_Param('api/transaction',{
                        'judge':1,
                        'id':0,
                        'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
                        'inout':1,
                        'type':3,
                        'kind':3,
                        'price':item.send,
                        'number':1,
                        'me':item.company_id,
                        'detail':`组委会强制还清贷款：${item.send}`
                    })
                    // 更新贷款状态
                    req.post_Param('api/loan',{
                      'judge':2,
                      'id':item.id,
                      'condition':1
                    })
                    .then(res => {
                      print.log(res.data);
                      s_alert.Success("还清贷款成功", "正在加载……", "success");
                      // 刷新页面
                      this.init()
                    })
                }else{
                    s_alert.Success("还清贷款失败，请联系该公司。", "正在加载……", "warning");
                }
            }else{
                // 更新个人资产
                req.post_Param('api/statistic',{
                    'judge':4,
                    'total':total,
                    'float':float,
                    'company_id':item.company_id
                })
                // 写入交易信息
                req.post_Param('api/transaction',{
                    'judge':1,
                    'id':0,
                    'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
                    'inout':1,
                    'type':3,
                    'kind':3,
                    'price':item.send,
                    'number':1,
                    'me':item.company_id,
                    'detail':`组委会强制还清贷款：${item.send}`
                })
                // 更新贷款状态
                req.post_Param('api/loan',{
                    'judge':2,
                    'id':item.id,
                    'condition':1
                })
                .then(res => {
                    print.log(res.data);
                    s_alert.Success("还清贷款成功", "正在加载……", "success");
                    // 刷新页面
                    this.init()
                })
            }
        })
        
    },
    // 免费还款
    free(item){
        print.log('免费还款',item)
        // 写入交易信息
        req.post_Param('api/transaction',{
            'judge':1,
            'id':0,
            'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
            'inout':1,
            'type':3,
            'kind':3,
            'price':0,
            'number':1,
            'me':item.company_id,
            'detail':`组委会免费还清贷款：0`
        })
        // 更新贷款状态
        req.post_Param('api/loan',{
            'judge':2,
            'id':item.id,
            'condition':1
        })
        .then(res => {
            print.log(res.data);
            s_alert.Success("还清贷款成功", "正在加载……", "success");
            // 刷新页面
            this.init()
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

<style scoped>

</style>
