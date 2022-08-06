<template>
  <div id="home">
    <section class="container">
        <div class="box">
          <button class="button is-primary pushright" @click="onClickTodo">
            TODO
          </button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    // TODO画面へ遷移する
    onClickTodo() {
      this.$router.push('/todo');
    },
  },
};
</script>

<style scoped>

</style>
