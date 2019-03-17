<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">竞拍管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-竞拍情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped" style id="datatable-editable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>竞拍标识符</th>
                    <th>财年</th>
                    <th>物品种类</th>
                    <th>物品标识符</th>
                    <th>竞拍价</th>
                    <th>状态</th>
                    <th>更新时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showItems" :key="item.name">
                    <td>{{index}}</td>
                    <td>C{{item.id}}</td>
                    <td>{{item.Yearid}}</td>
                    <td>{{item.type|formatType}}</td>
                    <td>{{item.thingid}}</td>
                    <td>{{item.auction}}</td>
                    <td>{{item.condition | formatCondition}}</td>
                    <td>{{item.updated_at|formatTime}}</td>
                    <td class="actions" v-if="item.condition==1 && item.company_id==company_id">
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="确认验收" @click="accept(item)">
                        <i class="fa  fa-check"></i>
                      </a>
                      <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="支付违约金" @click="reject(item)">
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
      if(val==-2) return '竞拍未开始'
      if(val==-1) return '产品流拍'
      if(val==0) return '竞拍中'
      if(val==1) return '竞拍已结束,请操作'
      if(val==2) return '竞拍成功'
    },
    formatType(x){
      if(x==1) return '矿区'
      if(x==2) return '工业用地'
      if(x==3) return '商业用地'
    }
  },
  methods: {
    init(){
      this.showMyCompete()
    },
    // 获取自己公司竞拍情况
    showMyCompete() {
      req.post_Param('api/compete',{
        'judge':6,
        'company_id':this.company_id
      })
        .then(res => {
          console.log(res.data);
          this.showCompete = res.data;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },
    // 接收竞拍资产
    accept(item){
      print.log('接收竞拍资产',item)
      if(item.type==1){     // 矿区
        apis.getOneStatisticByCompanyId(this.company_id)
        .then(res=>{
          print.log('获取个人资产',res.data)
          if(item.auction<=res.data.float){
            // 更新资产
            let m=`api/statistic?judge=5&company_id=${item.company_id}`
            this.updateFixedAssets(m,item)
            // 更新竞拍状态
            req.post(`api/mining?judge=2&condition=3&id=${item.thingid}&company_id=${this.company_id}`)
            // 写入交易信息
            req.post_Param('api/transaction',{
                'judge':1,
                'id':0,
                'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
                'inout':1,
                'type':4,
                'kind':3,
                'price':item.auction,
                'number':1,
                'me':this.company_id,
                'detail':`竞拍：资产类别${item.type},资产编号${item.thingid}`
            }) 
          }else{
            swal("竞拍失败!", "可用流动资金不足", "warning");
          }
        })
      }
      else if(item.type==2){   //工业用地
        apis.getOneStatisticByCompanyId(this.company_id)
        .then(res=>{
          print.log('获取个人资产',res.data)
          if(item.auction<=res.data.float){
            // 更新资产
            let m=`api/statistic?judge=5&company_id=${item.company_id}`
            this.updateFixedAssets(m,item)
            // 更新竞拍状态
            req.post(`api/indusland?judge=2&condition=3&id=${item.thingid}&company_id=${this.company_id}`)
            // 写入交易信息
            req.post_Param('api/transaction',{
                'judge':1,
                'id':0,
                'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
                'inout':1,
                'type':4,
                'kind':3,
                'price':item.auction,
                'number':1,
                'me':this.company_id,
                'detail':`竞拍：资产类别${item.type},资产编号${item.thingid}`
            }) 
          }else{
            swal("竞拍失败!", "可用流动资金不足", "warning");
          }
        })
      }
      else if(item.type==3){    //商业用地
        apis.getOneStatisticByCompanyId(this.company_id)
          .then(res=>{
            print.log('获取个人资产',res.data)
            if(item.auction<=res.data.float){
              // 更新资产
              let m=`api/statistic?judge=5&company_id=${item.company_id}`
              // 更新商业用地 固定资产
              this.updateFixedAssetsForCommerland(m,item)
              // 更新竞拍状态
              req.post(`api/commerland?judge=2&condition=3&id=${item.thingid}&company_id=${this.company_id}`)
              // 写入交易信息
              req.post_Param('api/transaction',{
                  'judge':1,
                  'id':0,
                  'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
                  'inout':1,
                  'type':4,
                  'kind':3,
                  'price':item.auction,
                  'number':1,
                  'me':this.company_id,
                  'detail':`竞拍：资产类别${item.type},资产编号${item.thingid}`
              }) 
            }else{
              swal("竞拍失败!", "可用流动资金不足", "warning");
            }
          })
      }
    },
    // 拒绝竞拍资产
    reject(item){
      print.log('拒绝竞拍资产',item)
      if(confirm(`拒绝接收将会扣取出价的20%作为违约金。违约金为：${(item.auction*0.2).toFixed(2)}万`)){
        // 获取个人资产
        apis.getOneStatisticByCompanyId(this.company_id)
        .then(res=>{
          print.log('获取个人资产',res.data)
          // 更新自己资产信息
          let float=res.data.float-item.auction*0.2;
          let total=res.data.total-item.auction*0.2;
          // 更新拍得公司资产信息
          req.post_Param('api/statistic',{
              'judge':4,
              'total':total,
              'float':float,
              'company_id':this.company_id
          })
          // 更新竞拍状态
          if(item.type==1){
            req.post(`api/mining?judge=2&condition=-1&id=${item.thingid}&company_id=${this.company_id}&price=${item.auction*0.2}`)          
          }else if(item.type==2){
            req.post(`api/indusland?judge=2&condition=-1&id=${item.thingid}&company_id=${this.company_id}&price=${item.auction*0.2}`)
          }else if(item.type==3){
            req.post(`api/commerland?judge=2&condition=-1&id=${item.thingid}&company_id=${this.company_id}&price=${item.auction*0.2}`)
          }
          // 写入交易信息
          req.post_Param('api/transaction',{
              'judge':1,
              'id':0,
              'Yearid':JSON.parse(ses.getSes('gameinfo')).Yearid,
              'inout':1,
              'type':4,
              'kind':3,
              'price':item.auction*0.2,
              'number':1,
              'me':this.company_id,
              'detail':`竞拍拒绝接收：资产类别${item.type},资产编号${item.thingid}，物品流拍`
          })
          .then(res=>{
            swal("资金信息更新成功!", "资产信息更新成功", "success");
            // 更新竞拍单状态
            apis.updateOneCompeteConditionById(item.id,-1);
            this.init()
          })
        })
      }
    },
    //更新固定资产
    updateFixedAssets(m,item){
        req.post(m)
        .then(res => {
            let float=res.data.float-item.auction;
            let total=res.data.total-item.auction;
            // 更新拍得公司资产信息
            req.post_Param('api/statistic',{
                'judge':4,
                'total':total,
                'float':float,
                'company_id':item.company_id
            })
            .then(res => {
              swal("资金信息更新成功!", "资产信息更新成功", "success");
              // 更新竞拍单状态
              apis.updateOneCompeteConditionById(item.id,2);
              this.init()
            })
        })
    },
    //更新资产信息  
    updateFixedAssetsForCommerland(m,item){  
      // 获取商业用地详细信息
      req.post_Param('api/commerland',{
        'judge':6,
        'id':item.thingid
      })
      .then(res=>{
        print.log('商业用地详细信息',res.data)
        let currentBrand=res.data.brand;

        // 获取资产信息
        req.post(m)
        .then(res => {
          print.log('商业用地资产信息',res.data)
          // 计算资产差值
          let fix=item.auction;  //this.chooseItem.startprice+(item.auction-this.chooseItem.startprice)*this.chooseItem.increment
          //商业用地固定资产 = 目前价值 + （平均成交价 - 目前价值）* 增值空间 ，暂时这样用着。
          let fixed=res.data.fixed+fix;
          let total=res.data.total+fix-item.auction;
          let float=res.data.float-item.auction;
          let brand=(res.data.brand)*(1+currentBrand);
          print.log('更新品牌价值',brand)
          // 更新资产信息
          req.post_Param('api/statistic',{
              'judge':4,
              'fixed':fixed,
              'total':total,
              'float':float,
              'brand':brand,
              'company_id':item.company_id
          })
          .then(res => {
              print.log(res.data);
              // 更新竞拍单状态
              apis.updateOneCompeteConditionById(item.id,2);
              swal("资金信息更新成功!", "资产信息更新成功", "success");
              this.init()
          })
        })

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
