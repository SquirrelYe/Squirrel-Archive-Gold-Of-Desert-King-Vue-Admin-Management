<template>
  <div>
     <div class="wrapper-page">
        <div class="panel panel-color panel-primary panel-pages">
            <div class="panel-heading bg-img">
                <div class="bg-overlay"></div>
                <h3 class="text-center m-t-10 text-white"> AESEN 青年领袖联盟 </h3>
                <br>
                <h3 class="text-center text-white" style="font-size:30px;">Sway 商业模拟挑战赛</h3> 
            </div>

            <div class="panel-body" >
                <div class="form-horizontal m-t-20">

                    <div class="form-group">
                        <div class="col-xs-12">
                            <input class="form-control input-lg" type="text" required="" placeholder="用户名" v-model="userName" v-on:keyup.enter="login()">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <input class="form-control input-lg" type="password" required="" placeholder="密码" v-model="passWord" v-on:keyup.enter="login()">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <div class="checkbox checkbox-primary">
                                <input id="checkbox-signup" type="checkbox" v-model="check">
                                <label for="checkbox-signup">
                                    记住我
                                </label>
                            </div>

                        </div>
                    </div>

                    <div class="form-group text-center m-t-40">
                        <div class="col-xs-12">
                            <button class="btn btn-primary btn-lg w-lg waves-effect waves-light" @click="login()">登录</button>
                        </div>
                    </div>

                    <div class="form-group m-t-30">
                        <div class="col-sm-7">
                            <a href="/#/recoverypw"><i class="fa fa-lock m-r-5"></i> 忘记密码？</a>
                        </div>
                        <div class="col-sm-5 text-right">
                            <a href="/#/register">创建新用户</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
const s_alert = require("../utils/alert");
const ses = require("../utils/ses");
const req = require("../utils/axios");
const print = require("../utils/print");
const apis = require("../utils/api/apis");

import app from '../App.vue'
var App = app;

export default {
  name: "logging",
  data() {
    return {
      userName: "",
      passWord: "",
      username: "",
      password: "",
      judge: "",
      Sid:'001',

      check: true
    };
  },
  mounted() {
      
  },
    beforeRouteEnter(to, from, next) {
    next();
  },
  methods: {
    login() {
      if (this.userName == "" || this.passWord == "") {
          s_alert.basic("用户名或密码为空");
      } 
      else {
        //判断用户为 管理员
        req.post_Param('/api/admin',{
            'judge':0,
            'name':this.userName,
            'pass':this.passWord
        })
          .then(res => {
            if (res.data) {  
                ses.setSes('userinfo',JSON.stringify(res.data))
                ses.setSes("name", this.userName);
                ses.setSes("pass", this.passWord);
                ses.setSes("type", '1');    
                ses.setSes("Sid", this.Sid);    
                //cookie.setCookie(this.userName, this.passWord,'1', 7);  
                s_alert.Success("登录成功，你的身份是管理员","正在加载……","success");
                this.$router.push({name:'menu'});
            } 
            else {
                //判断用户为 参赛者
                req.post_Param('/api/sway',{
                    'judge':3,
                    'name':this.userName,
                    'pass':this.passWord
                })
                .then(res => {
                if (res.data) {                    
                    ses.setSes('userinfo',JSON.stringify(res.data))
                    ses.setSes("name", this.userName);
                    ses.setSes("pass", this.passWord);
                    ses.setSes("type", '0');    
                    ses.setSes("Sid", this.Sid);      
                    //cookie.setCookie(this.userName, this.passWord,'0', 7);            
                    s_alert.Success("登录成功，你的身份是参赛者","正在加载……","success");
                    this.$router.push({name:'game'});
                } else {
                    s_alert.Timer("登录失败","用户名或密码有误");
                }
                })
            }
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>

<style scoped>

</style>
