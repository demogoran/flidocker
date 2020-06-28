import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";
import LoadScript from "vue-plugin-load-script";
import App from "./App.vue";
import router from "@/router";
import consts from "@/mixins/consts";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.mixin(consts);

Vue.use(Vue2TouchEvents, {
  disableClick: false,
  touchClass: "",
  tapTolerance: 10,
  touchHoldTolerance: 400,
  swipeTolerance: 30,
  longTapTimeInterval: 400
});
Vue.use(LoadScript);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
