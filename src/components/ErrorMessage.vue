<template>
  <div class="message-container">
    <article class="message is-danger" v-if="errors && errors.length > 0">
      <div class="message-body">
        <p v-for="error in errors" :key="error.code">
          {{ getDisplayErrorMessage(error) }}
        </p>
      </div>
    </article>
  </div>
</template>

<script>
import _s from "underscore.string";

export default {
  name: "ErrorMessage",
  props: {
    errors: Array,
  },
  methods: {
    getDisplayErrorMessage(error) {
      if (!_s.isBlank(error.message)) {
        return error.message;
      }
      return this.$i18n.t(error.code).toString();
    },
  },
};
</script>

<style scoped>
.message {
  margin-bottom: 16px;
}
</style>
