<template>
  <div>
    <div class="wrapper-page">
      <div class="panel panel-color panel-primary panel-pages">
          <div class="panel-heading bg-img"> 
              <div class="bg-overlay"></div>
              <h3 class="text-center m-t-10 text-white"> 注册 </h3>
          </div> 

          <div class="panel-body">
          <div class="form-horizontal m-t-20">
              
              <div class="form-group">
                  <div class="col-xs-12">
                      <input class="form-control input-lg" type="text" required="" placeholder="用户名(字母、下划线、数字)" v-model="name" @blur="judgeName()">
                  </div>
              </div>

              <div class="form-group">
                  <div class="col-xs-12">
                      <input class="form-control input-lg" type="text" required="" placeholder="中文名" v-model="cname">
                  </div>
              </div>

              <div class="form-group">
                  <div class="col-xs-12">
                      <input class="form-control input-lg" type="password" required="" placeholder="密码（字母、下划线、数字）" v-model="pass">
                  </div>
              </div>

              <div class="form-group">
                    <div class="col-xs-12">
                      <input class="form-control input-lg" type="email" required="" placeholder="邮箱" v-model="email" @blur="sendcodeRegister()">
                    </div>
              </div>

              <div class="form-group" v-if="sendCodeComplete && judge!=code">
                  <div class="col-xs-12">
                      <input class="form-control input-lg" type="text" required="" placeholder="验证码" v-model="judge" @input="judgeCode">
                  </div>
              </div>

              <div class="form-group">
                  <div class="col-xs-12">
                      <div class="checkbox checkbox-primary">
                          <input id="checkbox-signup" type="checkbox" v-model="check">
                          <label for="checkbox-signup"  data-toggle="modal" data-target="#info">
                              接受 <a href="javascript:void(0)">Sway商战大赛 条例</a>
                          </label>
                      </div>
                      
                  </div>
              </div>
              
              <div class="form-group text-center m-t-40">
                  <div class="col-xs-12">
                      <button class="btn btn-primary waves-effect waves-light btn-lg w-lg" @click="register()">注册</button>
                  </div>
              </div>

              <div class="form-group m-t-30">
                  <div class="col-sm-12 text-center">
                      <a href="/">已经拥有账号</a>
                  </div>
              </div>
          </div> 
        </div>
      </div>
    </div>


    <div id="info" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                  <h4 class="modal-title" id="myModalLabel">Sway商战沙盘系统</h4>
              </div>
              <div class="modal-body">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议为您与本商业沙盘系统的管理者（天津多维汇教育咨询有限公司）之间所订立的契约，具有合同的法律效力，请您仔细阅读。</p>
                  <hr>
                  <h4>协议内容</h4>
                  <p>
                    <br><strong>一、 本协议内容、生效、变更</strong><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议内容包括协议正文及所有本系统已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，应向本系统咨询。您在同意所有协议条款并完成注册程序，才能成为本站的正式用户，您点击“我以阅读并同意本系统用户协议和法律协议”按钮后，本协议即生效，对双方产生约束力。
                    只要您使用本系统平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得本系统对您问询的解答等理由，主张本协议无效，或要求撤销本协议。您确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。 您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用本系统平台服务。本系统有权根据需要不定期地制订、修改本协议及/或各类规则，并在本系统平台公示，不再另行单独通知用户。变更后的协议和规则一经在网站公布，立即生效。如您不同意相关变更，应当立即停止使用本系统平台服务。您继续使用本系统平台服务的，即表明您接受修订后的协议和规则。
                    <br><strong>二、 注册</strong><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册资格用户须具有法定的相应权利能力和行为能力的自然人、法人或其他组织，能够独立承担法律责任。您完成注册程序或其他本APP平台同意的方式实际使用本平台服务时，即视为您确认自己具备主体资格，能够独立承担法律责任。若因您不具备主体资格，而导致的一切后果，由您及您的监护人自行承担。
                    <br><strong>注册资料</strong>
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且本系统保留终止用户使用本平台各项服务的权利。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.2用户在本站进行浏览等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。
                    <br><strong>账户</strong><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1您注册成功后，即成为本系统平台的会员，将持有本系统平台唯一编号的账户信息，您可以根据本站规定改变您的密码。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2您设置的姓名为真实姓名，不得侵犯或涉嫌侵犯他人合法权益。否则，本系统有权终止向您提供服务，注销您的账户。账户注销后，相应的会员名将开放给任意用户注册登记使用。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3您应谨慎合理的保存、使用您的会员名和密码，应对通过您的会员名和密码实施的行为负责。除非有法律规定或司法裁定，且征得本系统的同意，否则，会员名和密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.4用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.5如果发现任何非法使用等可能危及您的账户安全的情形时，您应当立即以有效方式通知本系统要求暂停相关服务，并向公安机关报案。您理解本系统对您的请求采取行动需要合理时间，本系统对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。
                    <br><strong>用户信息的合理使用</strong><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1您同意本系统平台拥有通过邮件、短信电话等形式，向在本站注册用户发送信息等告知信息的权利。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2您了解并同意，本系统有权应国家司法、行政等主管部门的要求，向其提供您在本系统平台填写的注册信息和交易记录等必要信息。如您涉嫌侵犯他人知识产权，则本系统亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供您必要的身份信息。
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3用户同意本系统有权使用用户的注册信息、用户名、密码等信息，登陆进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。
                  </p>                  
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

import app from "../App.vue";

export default {
  name: "register",
  data() {
    return {
      content: "",
      name: "",
      cname: "",
      pass: "",
      email: "",
      judge: "",
      code: "",
      check: true,
      sendCodeComplete: false,
      judgeNameFirst:false,
      judgeMail:false
    };
  },
  mounted() {
    //xxx
  },
  methods: {
    //点击注册按钮，进行逻辑操作
    register() {
      if (this.name == "" || this.pass == "" || this.email == ""|| this.cname == "") {
        s_alert.basic("不能有空哦");
      } else if(!this.judgeNameFirst){
        s_alert.basic("用户名未通过验证！");
      }else if(!this.judgeMail){
        s_alert.basic("邮箱未通过验证！");
      }
      else {
        if (this.check) {
          if (this.judge == this.code) {
            //判断验证码是否验证
            req.post(`api/sway?judge=4&name=${this.name}&pass=${this.pass}&cname=${this.cname}&email=${this.email}`)
            .then(res => {
              if (JSON.stringify(res.data)) {
                s_alert.Success("注册成功", "正在加载……", "success");
                this.$router.push("/");
              }
            })
          } else {
            s_alert.basic("验证码验证失败！");
          }
        } else {
          s_alert.basic("必须接受 sway商战大赛 条例");
        }
      }
    },
    //判断用户名是否重复
    judgeName(){
      var that = this;
      if(this.name!=''){
        req.post(`api/sway?judge=1&name=${that.name}`)
        .then(res => {
          var jf = JSON.stringify(res.data.success);
          if (jf.indexOf("true") != -1) {
            s_alert.basic("用户名可以使用！");
            that.judgeNameFirst=true
          } else if (jf.indexOf("oversize") != -1) {
            s_alert.basic("此用户名已经被使用过啦！");
            that.judgeNameFirst=false
          } else {
            s_alert.basic("验证第一次注册失败！");
            that.judgeNameFirst=false
          }
        })
        .catch(error => console.log(error));
      }else{
        s_alert.basic("用户名不能输入空哦");
      }
      
    },
    //邮箱输入框 失去焦点 进行邮箱验证
    sendcodeRegister() {
      if (this.email) {
        this.judgeFirst();
      } else {
        s_alert.basic("邮箱不能输入空哦");
      }
    },
    //检查邮箱是否第一次使用来注册
    judgeFirst() {
      var that = this;
      req.post(`api/sway?judge=2&email=${that.email}`)
      .then(res => {
        var jf = JSON.stringify(res.data.success);
        if (jf.indexOf("true") != -1) {
          s_alert.basic("邮箱可以使用！");
          that.judgeMail=true
          this.sendcode();        //验证成功，发送验证信息
        } else if (jf.indexOf("oversize") != -1) {
          s_alert.basic("此邮箱已经被使用过啦！");
          that.judgeMail=false
        } else {
          s_alert.basic("验证第一次注册失败！");
          that.judgeMail=false
        }
      })
    },
    //发送验证信息
    sendcode() {
      var num = "";
      for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10);
      }
      this.code = num;
      var that = this;
      s_alert.basic("发送中……");
      req.post(`api/mail?judge=0&mail_address=${this.email}&code=${num}`)
      .then(res => {
        that.condition = JSON.stringify(res.data.success);
        if (that.condition.indexOf("true") != -1) {
          s_alert.Success("验证邮件发送成功", "正在加载……", "success");
          that.sendCodeComplete = true;
        } else {
          s_alert.basic("验证邮件发送失败");
        }
      })
    },
    //验证输入验证码是否正确
    judgeCode(event) {
      var that = this;
      if (that.judge.indexOf(that.code) != -1) {
        s_alert.Success("验证成功", "正在加载……", "success");
      }
    }
  }
};
</script>

<style scoped>

</style>
