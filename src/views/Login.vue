<template>
  <div id="login">
    <section class="main-content">
      <div class="container">
        <div class="box">
          <div class="title-container">
            <h1 class="title">SampleApplication</h1>
          </div>
          <form @submit.prevent="onSubmit">
            <error-message :errors="errors" />
            <!-- ログインID入力項目 -->
            <div class="field">
              <label class="label">Login ID</label>
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="ログインID / Eメール"
                  v-model="loginId"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="user" />
                </span>
              </p>
            </div>
            <!-- パスワード入力項目 -->
            <div class="field">
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  placeholder="password"
                  v-model="password"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="lock" />
                </span>
              </p>
            </div>
            <!-- ログインボタン -->
            <div class="button_wrapper">
              <button
                class="button is-primary is-rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { commonApi, withApi } from "@/api";
import sessionInfoRepository from "@/repository/sessionInfoRepository";
import _s from "underscore.string";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Login",
  components: {
    "error-message": ErrorMessage,
  },
  data: () => {
    return {
      loginId: null,
      password: null,
      errors: [],
    };
  },
  methods: {
    async onSubmit() {
      if (!this.validate()) {
        return;
      }
      await withApi(
        this,
        async () => {
          const loginResult = await commonApi
            .post("login", {
              json: {
                loginId: this.loginId,
                password: this.password,
              },
            })
            .json();
          sessionInfoRepository.saveLoginInfo(loginResult.user);
          this.$router.push("/menu");
        },
        true
      );
    },
    validate() {
      const errors = [];
      if (_s.isBlank(this.loginId)) {
        errors.push({
          code: "error.c001",
        });
      }
      if (_s.isBlank(this.password)) {
        errors.push({
          code: "error.c002",
        });
      }
      this.errors = errors;
      return errors.length == 0;
    },
  },
};
</script>

<style scoped>
.container {
    width: 480px;
}
.title-container {
    margin-bottom: 16px;
}
.button_wrapper {
  text-align:center;
}
</style>
