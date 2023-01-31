<template>
  <div class="Account">
    <div class="container">
      <div class="box">
        <h1 class="title">Account</h1>
        <!-- Error Message -->
        <error-message />
        
      </div>
    </div>
  </div>
</template>

<script>
import { api, withApi } from "@/api";
import _s from "underscore.string";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Todo",
  components: {
    "error-message": ErrorMessage,
  },
  data: () => {
    return {
      errors: [],
      userInfo: null,
    };
  },
  /** createdフック */
  async created() {
    await withApi(this, async () => {
      await this.reload();
    });
  },
  methods: {
    /** 更新メソッド */
    async reload() {
      this.userInfo = await api.get('account/info').json();
    },
    validate() {
      const errors = [];
      if (_s.isBlank(this.inputTitle)) {
        errors.push({
          code: "error.c003",
        });
      }
      this.errors = errors;
      return errors.length == 0;
    },
  },
};
</script>

<style scoped>
</style>
