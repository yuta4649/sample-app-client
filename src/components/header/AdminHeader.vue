<template>
  <div v-bind:class="{ open: showFlg }">
    <header class="admin-header">
      <nav class="nav">
        <ul class="topnav">
          <li class="change">
            <a class="active" @click="onClickTop">SampleApplication</a>
          </li>
          <li class="right"><a @click="onClickLogout">Logout</a></li>
          <li class="right"><a @click="onClickSetting">Setting</a></li>
        </ul>
      </nav>
      <button type="button" id="navbtn" v-on:click="showFlg = !showFlg"></button>
      <div class="container">
        <div class="title-box">
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { commonApi } from "@/api";

export default {
  name: 'AdminHeader',
  props: {
    title: String,
    isAdmin: Boolean,
    isRoot: Boolean,
  },
  data: () => {
    return {
      showFlg: false,
    };
  },
  methods: {
    onClickTop() {
      this.$router.push('/menu');
    },
    async onClickLogout() {
      try {
        await commonApi.post('logout').json();
      } catch (error) {
        // エラーを無視する
      }
      this.$router.push('/login');
    },
    onClickSetting() {
      this.$router.push('/setting');
    }
  }
}
</script>

<style>
  .admin-header {
    background-color:#242424;
    color: white;
    width: 100%;
    height: 48px;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>