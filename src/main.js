// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/style.less";
import "./assets/css/shake.css";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.directive("shake", (el, binding, vnode, preVnode) => {
  el.addEventListener("click", () => {
    el.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
    el.addEventListener("animationend", () => {
      el.style.animation = "";
    });
  });
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store,
});
