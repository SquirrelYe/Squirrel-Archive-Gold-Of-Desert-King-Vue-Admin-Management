<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">交易管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-9">
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
                    <th>矿区</th>
                    <th>原料类型</th>
                    <th>所属公司</th>
                    <th>总量</th>
                    <th>创建时间</th>
                    <th>最后更新时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="gradeX" v-for="(item,index) in showCompete" :key="item.name">
                    <td>{{index}}</td>
                    <td>{{item.mining_id}}</td>
                    <td>{{item.source_id}}</td>
                    <td>{{item.company_id}}</td>
                    <td>{{item.sum}}</td>
                    <td>{{item.created_at}}</td>
                    <td>{{item.updated_at}}</td>
                    <td class="actions" align="center">
                      <a
                        class="waves-effect waves-light"
                        data-toggle="modal"
                        data-target="#con-close-modal"
                      >
                        <i class="fa fa-pencil"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-公司代工交易情况</h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- model -->
    <div id="con-close-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">Modal Content is Responsive</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="field-1" class="control-label">Name</label>
                  <input type="text" class="form-control" id="field-1" placeholder="John">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="field-2" class="control-label">Surname</label>
                  <input type="text" class="form-control" id="field-2" placeholder="Doe">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="field-3" class="control-label">Address</label>
                  <input type="text" class="form-control" id="field-3" placeholder="Address">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="field-4" class="control-label">City</label>
                  <input type="text" class="form-control" id="field-4" placeholder="Boston">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="field-5" class="control-label">Country</label>
                  <input type="text" class="form-control" id="field-5" placeholder="United States">
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="field-6" class="control-label">Zip</label>
                  <input type="text" class="form-control" id="field-6" placeholder="123456">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group no-margin">
                  <label for="field-7" class="control-label">Personal Info</label>
                  <textarea class="form-control autogrow" id="field-7" placeholder="Write something about yourself"
                    style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px">                                                        </textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-info waves-effect waves-light">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const s_alert = require("../../utils/alert");
import app from "../../App.vue";
const moment = require("moment");
var App = app;

export default {
  name: "resource",
  data() {
    return {
      showCompete: "",
    };
  },
  beforeMount() {
    var ses = window.sessionStorage;
    this.userinfo = JSON.parse(ses.getItem("userinfo"));
  },
  mounted() {
      this.showMyCompete()
  },
  methods: {
    showMyCompete() {
    //获取自己公司竞拍情况
    this.axios
    .post("/resource/api")
    .then(res => {
        console.log(res.data);
        this.showCompete = res.data;
    })
    .catch(err => {
        console.log(err);
    });
},
  }
};
</script>

<style>
</style>
