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
    <component :is="headerComponent"></component>
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
import MainHeader from './components/header/AdminHeader.vue'
import SubHeader from './components/header/CommonHeader.vue'

export default {
  name: "App",
  components: { MainHeader, SubHeader },
  computed: {
    headerComponent() {
      switch(this.$route.path) {
        // Login画面ではヘッダーを表示しない
        case '/login':
          return null;
        case '/main':
          return 'MainHeader';
        case '/sub':
          return 'SubHeader';
        default:
          return 'MainHeader';
      }
    }
  },
  data: () => {
    return {
      errorDialogOpend: false,
      errorMessage: null,
      currentErrorCode: null,
    };
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
.error-dialog .dialog-btns {
  justify-content: center;
}
</style>

<style src="./assets/style/css/common.css">
.title-box {
  margin: 1rem;
}
.button-area {
  margin-top: 3rem;
}
</style>
