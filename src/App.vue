<template>
  <div id="app">
    <router-view @api-global-error="onGlobalError" />
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
export default {
  name: "App",
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

<style src="./assets/style/common.css">
.title-box {
  margin: 1rem;
}
.button-area {
  margin-top: 3rem;
}
</style>
