<template>
  <div v-bind:class="{ open: showFlg }">
    <header class="common-header">
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
<style>
</style>