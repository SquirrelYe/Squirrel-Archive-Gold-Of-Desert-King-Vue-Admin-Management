<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">到达排名</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">沙漠掘金后台管理系统-参赛团队排名情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table
                class="table table-striped table-hover"
                style
                id="datatable-editable"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>团队名称</th>
                    <th>到达时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="gradeX"
                    v-for="(item, index) in showItems"
                    :key="index"
                  >
                    <td>{{ index }}</td>
                    <td v-if="item.team">{{ item.team.name }}</td>
                    <td v-else></td>
                    <td>{{ item.created_at | formatTime }}</td>
                    <td>
                      <a
                        @click="showItem(item)"
                        data-toggle="modal"
                        data-target="#Model"
                      >
                        <i
                          class="fa fa-navicon"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="查看背包详细信息"
                        ></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong
                >注意:资产信息在比赛过程中会随时变化，刷新页面以获取最新信息。</strong
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- statistics -->
    <div
      id="statistics"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
            <h4 class="modal-title" id="myModalLabel">参赛者团队资产初始化</h4>
          </div>
          <!-- 内容 -->
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4>资产初始化</h4>
                  </div>
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"
                          >初始资金</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="100"
                            v-model="money"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"
                          >初始载重</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="100"
                            v-model="load"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default waves-effect"
              data-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary waves-effect waves-light"
              data-dismiss="modal"
              @click="initStastics()"
            >
              初始化资产
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="Model"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="custom-width-modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="width: 55%">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
            <h4 class="modal-title" id="myModalLabel">背包详细信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <!-- 剩余金币 -->
                    <strong>剩余金币：{{ haveMoney }}</strong>
                    <!-- 子类 -->
                    <div class="table-responsive">
                      <table
                        class="table table-bordered table-striped table-hover"
                        id="datatable-editable"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>物品ID</th>
                            <th>中间表ID</th>
                            <th>名称</th>
                            <th>数量</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="gradeX"
                            v-for="(item, index) in currentItem"
                            :key="index"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>M-{{ item.id }}</td>
                            <td>SM-{{ item.statistic_module.id }}</td>
                            <td>{{ item.type | formatType }}</td>
                            <td>{{ item.statistic_module.number }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default waves-effect"
              data-dismiss="modal"
            >
              关闭
            </button>
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
const notify = require("bootstrap-notify");

const moment = require("moment");

export default {
  name: "srank",
  data() {
    return {
      showItems: null,
      currentItem: null,
      haveMoney: 0,

      // 初始化资产
      money: 100,
      load: 100,
    };
  },
  updated() {
    $(function () {
      $("[data-toggle='tooltip']").tooltip();
    });
  },
  mounted() {
    this.init();
  },
  filters: {
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    formatType(x) {
      if (x == -1) return "金币";
      if (x == 0) return "食物";
      if (x == 1) return "水";
      if (x == 2) return "指南针";
      if (x == 3) return "帐篷";
      if (x == 4) return "智者密函";
      if (x == 5) return "金块";
      if (x == 6) return "食物";
    },
  },
  methods: {
    init() {
      this.showAllStastics();
    },
    // 获取比赛参赛团队资产信息
    async showAllStastics() {
      let gid = JSON.parse(ses.getSessionStorage("gameinfo")).id;
      let res = await apis.getRank(gid);
      this.showItems = res.data.rows;
      console.log(res.data.rows);
    },
    // 显示背包详细信息
    async showItem(item) {
      let statistic_id = item.team.statistic_id;
      let res = await apis.getAssStatisticById(statistic_id);
      this.currentItem = res.data.modules;
      this.haveMoney = res.data.money;
      console.log(res.data);
    },
  },
};
</script>

<style></style>
