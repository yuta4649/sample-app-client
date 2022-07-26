<template>
  <div>
    <v-app-bar dark dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>SampleApplication</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- TODO: 検索機能追加 -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
  </div>
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
</style>