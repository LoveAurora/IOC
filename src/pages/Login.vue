<!-- 登录注册 -->
<template>
  <div id="login">
    <div id="contain">
      <div id="left_card">
        <h1 style="font-size: 30px;">欢迎登录IOC提取系统</h1>
        <span style="font-size: 30px;">Welcome</span>
      </div>
      <!-- 登录注册 -->
      <div id="right_card">
        <el-card class="el-card">
          <h1 v-show="login == 1" style="font-size: 20px;font-weight: bolder; color:black ;">欢迎登录</h1>
          <h1 v-show="!login == 1" style="font-size: 20px;font-weight: bolder;color: black ;">欢迎注册</h1>
          <div v-if="login == 1">
            <div class="login">
              <el-alert
                v-show="loginErr"
                :title="loginTitle"
                type="error"
                show-icon
                :closable="false"
              >
              </el-alert>
              <input
                v-shake
                type="text"
                placeholder="用户名"
                v-model="username"
              />

              <input
                v-shake
                type="password"
                placeholder="密码"
                @keyup.enter="loginEnterFun"
                v-model="password"
              />
            </div>
            <h3 style="margin-top: 5px; "><a href=""  style="font-weight: bolder; color: black;">忘记密码？</a></h3>
            <div id="btn">
              <button class="loginbtn" @click="gotoHome">登陆</button>
              <button class="registerbtn" @click="register">
                没有账号？注册
              </button>
            </div>
            <div class="otherLogin">
              <a href="javascript:void(0)"
                ><i class="fa fa-fw fa-wechat"></i
              ></a>
              <a href="javascript:void(0)"><i class="fa fa-fw fa-qq"></i></a>
              <a href="javascript:void(0)"><i class="fa fa-fw fa-weibo"></i></a>
            </div>
          </div>

          <div v-else>
            <div class="login">
              <el-alert
                v-show="registerErr"
                :title="registerTitle"
                type="error"
                show-icon
                :closable="false"
              >
              </el-alert>
              <input
                v-shake
                type="text"
                placeholder="用户名"
                v-model="newusername"
              >
              </input>
              <el-alert
                v-show="newusernameErr"
                title="用户名错误"
                type="error"
                show-icon
                :closable="false"
              >
              </el-alert>
              <input
                v-shake
                type="text"
                placeholder="昵称"
                v-model="newnickName"
              >
              </input>
              <input
                v-shake
                type="email"
                placeholder="邮箱"
                v-model="newemail"
              >
              </input>
              <el-alert
                v-show="newemailErr"
                title="邮箱错误"
                type="error"
                show-icon
                :closable="false"
              >
              </el-alert>
              <input
                v-shake
                type="password"
                placeholder="密码:6-12位英文、数字、下划线"
                v-model="newpassword"
              >
              </input>
              <el-alert
                v-show="newpasswordErr"
                title="密码错误"
                type="error"
                show-icon
                :closable="false"
              >
              </el-alert>
              <input
                v-shake
                type="password"
                placeholder="确认密码"
                @keyup.enter="registerEnterFun"
                v-model="newpassword2"
              >
              </input>
              <el-alert
                v-show="newpassword2Err"
                title="重复密码有误"
                type="error"
                show-icon
                :closable="false"
              >
              </el-alert>
              <div id="btn">
                <button
                  class="loginbtn"
                  @click="newRegister"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  element-loading-text="提交中"
                >
                  注册
                </button>
                <button class="registerbtn" @click="userslogin">
                  已有账号?登录
                </button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister } from "../api/user.js";
import { setToken } from "../utils/auth.js";
export default {
  name: "Login",
  data() {
    //选项 / 数据
    return {
      username: "", //用户名
      email: "", //邮箱
      password: "", //密码
      newusername: "", //新用户注册名
      newnickName: "", //新用户注册昵称
      newemail: "", //新用户注册邮箱
      newpassword: "", //新用户注册密码
      newpassword2: "", //新用户注册重复密码
      login: 0, //是否已经登录
      loginErr: false, //登录错误
      loginTitle: "用户名或密码错误",
      newusernameErr: false, //新用户注册用户名错误
      newemailErr: false, //新用户注册邮箱错误
      newpasswordErr: false, //新用户注册密码错误
      newpassword2Err: false, //新用户注册重复密码错误
      registerErr: false, //已注册错误
      registerTitle: "该邮箱已注册",
      step: 1, //注册进度
      fullscreenLoading: false, //全屏loading
      urlstate: 0, //重新注册
    };
  },
  methods: {
    //事件处理器
    routeChange: function () {
      var that = this;
      that.login =
        that.$route.query.login == undefined
          ? 1
          : parseInt(that.$route.query.login); //获取传参的login
      that.urlstate =
        that.$route.query.urlstate == undefined
          ? 0
          : that.$route.query.urlstate; //获取传参的usrlstate状态码
      // console.log(that.login,that.urlstate);
    },
    register() {
      this.$router.push("/Login?login=0");
    },
    userslogin() {
      this.$router.push("/Login?login=1");
    },
    loginEnterFun: function (e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车登录',keyCode,e);
      if (keyCode == 13) {
        this.gotoHome();
      }
    },
    gotoHome: function () {
      //用户登录
      userLogin(this.username, this.password).then((response) => {
        // 登录成功记录token和用户信息，登录失败给对应提示
        setToken(response.token);
        // 存储用户信息
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
        if (localStorage.getItem("logUrl")) {
          this.$router.push({ path: localStorage.getItem("logUrl") });
        } else {
          this.$router.push({ path: "/" });
        }
      });
    },
    registerEnterFun: function (e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车注册',keyCode,e);
      if (keyCode == 13) {
        this.newRegister();
      }
    },
    newRegister: function () {
      //注册提交
      var that = this;
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var preg = /^(\w){6,12}$/;
      if (that.newusername) {
        that.newusernameErr = false;
      } else {
        that.newusernameErr = true;
      }
      if (reg.test(that.newemail)) {
        that.newemailErr = false;
      } else {
        that.newemailErr = true;
      }
      if (that.newpassword && preg.test(that.newpassword)) {
        that.newpasswordErr = false;
        if (that.newpassword == that.newpassword2) {
          that.newpassword2Err = false;
        } else {
          that.newpassword2Err = true;
        }
      } else {
        that.newpasswordErr = true;
      }
      if (!that.newusernameErr && !that.newemailErr && !that.newpasswordErr) {
        that.fullscreenLoading = true;
        userRegister(
          that.newusername,
          that.newnickName,
          that.newemail,
          that.newpassword
        )
          .then((response) => {
            //注册成功后调整到登录
            that.goLogin();
          })
          .catch((error) => {
            that.fullscreenLoading = false;
          });
      }
    },
    goLogin: function () {
      //去登陆
      this.$router.push({ path: "/Login?login=1" });
    },
    goRegister: function () {
      //去注册
      this.$router.push({ path: "/Login?login=0" });
    },
  },
  components: {
    //定义组件
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange",
  },
  created() {
    //生命周期函数
    var that = this;
    that.routeChange();
  },

  mounted() {
    // 添加背景图到body
    document.body.style.backgroundImage =
      "url('https://picx.zhimg.com/70/v2-73aef8cfeee9878b2de33c68216d13f3_1440w.avis?source=172ae18b&biz_tag=Post') ";
    document.body.style.backgroundSize = "cover"; // 或其他CSS背景大小属性
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
  },
  beforeDestroy() {
    // 清除body的背景图设置
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundPosition = "";
  },
};
</script>

<style scoped>

/*登录成功*/
.registerSuc {
  padding: 40px;
  margin: 0 auto;
}
.registerSuc .sucIcon {
  text-align: center;
  margin-bottom: 30px;
  padding-left: 60px;
}
.registerSuc .sucContent {
  line-height: 1.5;
  font-size: 15px;
  text-align: center;
}
.registerSuc .sucContent p {
  margin-top: 10px;
  font-size: 13px;
  color: #999;
}
.registerSuc .sucContent .lastbtn {
  display: inline-block;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.registerSuc .sucContent .el-icon-close {
  font-size: 13px;
}
</style>

<style lang="less" scoped>
@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
#login {
  position: relative;
  width: 100vw;
  height: 100vh;
  // background-image: url(../assets/background.png);
  background-image: url("https://picx.zhimg.com/70/v2-73aef8cfeee9878b2de33c68216d13f3_1440w.avis?source=172ae18b&biz_tag=Post") !important;
  background-size: 100% 100%;
  background-color: #a7a8bd;
  #contain {
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(5px);
    box-shadow: -5px -5px 10px rgb(39, 65, 65), 5px 5px 20px aqua;
    /* 5秒 infinite循环播放无限次 linear匀速  */
    animation: animate 5s linear infinite;
  }
}
#contain {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  #left_card {
    width: 500px;
    h1 {
      color: white;
      white-space: nowrap;
    }
    span {
      font-size: 1.2rem;
      text-align: center;
      color: white;
      white-space: nowrap;
    }
  }
  #right_card {
    width: 400px;
    .el-card {
      margin: 0 45px;
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
#right_card {
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 5px;
  }
  .login {
    input  {
      width: 80%;
      height: 45px;
      margin-top: 10px;
      border: 1px solid white;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      font-size: inherit;
      padding-left: 20px;
      outline: none;
    }
  }
  .remember {
    float: right;
    height: 26px;
    text-align: center;
    font-size: 1rem;
    position: relative;
    .radio {
      height: 1rem;
      width: 1rem;
      vertical-align: middle;
      margin-top: -2px;
      opacity: 0;
    }
    label {
      position: absolute;
      left: -2px;
      top: 5px;
      height: 1rem;
      width: 1rem;
      vertical-align: middle;
      margin-top: -2px;
      border-radius: 50%;
      border: 1px solid black;
    }
    //radio选中后修改labe内的内容 :after 选择器在被选元素的内容后面插入内容。
    input :checked + label::after {
      content: "";
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(207, 38, 38, 0.8);
      border: 1px solid rgba(207, 38, 38, 0.8);
    }
  }
  .message {
    margin-top: 26px;
    font-size: 0.9rem;
    color: red;
  }
  .loginbtn {
    width: 100%;
    height: 35px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgba(207, 38, 38, 0.8);
  }
  .registerbtn {
    width: 100%;
    height: 35px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgba(207, 38, 38, 0.8);
  }
}
</style>
