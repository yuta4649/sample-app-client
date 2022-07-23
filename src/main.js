// CSSフレームワーク
import "bulma/css/bulma.css";

import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import messages from "@/assets/messages.json";
import sessionInfoRepository from "./repository/sessionInfoRepository";

Vue.use(VueI18n);
const i18n = new VueI18n({ locale: "ja", messages });

library.add(fas);
library.add(far);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

/**
 * ナビゲーションガード
 * グローバルビフォガード
 */
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    sessionInfoRepository.saveLoginInfo(null);
  } else {
    // クライアント認証チェック
    const authenticated = sessionInfoRepository.isLogin();
    if (!to.meta.skipAuth && !authenticated) {
      next({ path: "/login" });
      return;
    }
  }
  next();
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
