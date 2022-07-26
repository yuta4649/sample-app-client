<template>
  <div id="app">
    <vue-particles
      color="#00d1b2"
      :particleOpacity="0.7"
      linesColor="#00d1b2"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="3"
      :linesWidth="1.5"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="5"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      retina_detect="true"
      >
    </vue-particles>
    <component :is="headerComponent" />
    <transition mode="out-in">
      <router-view @api-global-error="onGlobalError" />
    </transition>
    <div
      class="modal error-dialog"
      v-bind:class="{ 'is-active': errorDialogOpend }"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ERROR</p>
        </header>
        <section class="modal-card-body">
          <p class="is-size-6">{{ errorMessage }}</p>
        </section>
        <footer class="modal-card-foot dialog-btns">
          <button class="button" @click="onClickCloseErrorDialog">
            close
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from './components/header/AdminHeader.vue'
import CommonHeader from './components/header/CommonHeader.vue'

export default {
  name: "App",
  components: { AdminHeader, CommonHeader },
  data: () => {
    return {
      errorDialogOpend: false,
      errorMessage: null,
      currentErrorCode: null,
    };
  },
  computed: {
    headerComponent() {
      if (this.$route.path === '/login') {
        // Login画面ではヘッダーを表示しない
        return null;
      } else {
        switch (JSON.parse(window.sessionStorage.getItem('login-info')).authorizationType) {
          case 'ROLE_ROOT':
            return AdminHeader;
          case 'ROLE_ADMIN':
            return AdminHeader;
          default:
            return CommonHeader;
        }
      }
    }
  },
  methods: {
    onGlobalError(payload) {
      // TODO 複数エラーが発生した場合にキューイングする
      this.errorDialogOpend = true;
      this.errorMessage = payload.message;
      this.currentErrorCode = payload.errorCode;
    },
    onClickCloseErrorDialog() {
      this.errorDialogOpend = false;
      this.errorMessage = null;
      const errorCode = this.currentErrorCode;
      this.currentErrorCode = null;
      if (errorCode === "error.s004") {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.modal-card-body p {
  min-height: 50px;
}
.error-dialog {
  justify-content: center;
}
.dialog-btns {
  text-align: center;
}
</style>

<style src="./assets/style/css/common.css"></style>
