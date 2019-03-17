<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">公司管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-贷款</h3>
          </div>
          <div class="panel-body"></div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
const s_alert = require("../../utils/alert");
import app from "../../App.vue";

export default {
  name: "loan",
  data() {
    return {};
  },
  beforeMount() {
    var ses = window.sessionStorage;
    this.userinfo = JSON.parse(ses.getItem("userinfo"));
  },
  methods: {}
};
</script>

<style>
</style>
