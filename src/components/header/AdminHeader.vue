<template>
  <v-card
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { commonApi } from "@/api";

export default {
  name: 'AdminHeader',
  data: () => {
    return {
      showFlg: false,
      drawer: false,
      group: null,
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