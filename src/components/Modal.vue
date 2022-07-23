<template>
  <div id="overlay">
    <div id="content" class="modal-card">
      <header class="modal-card-head">
        <strong>{{ title }}</strong>
      </header>
      <div class="slotbody">
        <slot class="modal-card-body"></slot>
      </div>
      <div class="content-header"></div>
      <footer class="modal-card-foot" id="btn bgskew" @click="closeModal">
        <a>閉じる</a>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Modal",
  props: {
    title: String,
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
});
</script>

<style scoped>
#overlay {
  /* 要素を重ねた時の順番 */
  z-index: 10;
  /* 画面全体を覆う設定 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 画面の中央に要素を表示させる設定 */
  display: flex;
  align-items: center;
  align-content: center;
}
#content {
  z-index: 11;
  border-radius: 20px;
  background: #fff;
  margin: 1em;
  animation-name: smoothAnime;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  transform-origin: left;
  opacity: 0;
}
.clear-decoration {
  background: transparent; /* 背景の灰色を消す */
}
.content-header {
  float: right;
}
.slotbody {
  margin: 1em;
  overflow: auto;
}

@keyframes smoothAnime {
  from {
    transform: translate3d(0, 100%, 0) skewY(12deg);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) skewY(0);
    opacity: 1;
  }
}

/*== ボタン共通設定 */
.modal-card-foot {
  /* アニメーションの起点とするためrelativeを指定 */
  position: relative;
  overflow: hidden;
  /* ボタンの形状 */
  text-decoration: none;
  display: inline-block;
  padding: 10px 30px;
  text-align: center;
  outline: none;
  /* アニメーションの指定 */
  transition: ease 0.2s;
  width: 100%;
}
/* ボタン内のaの形状 */
.modal-card-foot a {
  position: relative;
  z-index: 3; /* z-indexの数値をあげて文字を背景よりも手前に表示 */
  color: #333;
}
.modal-card-foot:hover a {
  color: #fff;
}

/*== 背景が流れる（斜め） */
.dialog-btns::before {
  content: "";
  /* 絶対配置で位置を指定 */
  position: absolute;
  top: 0;
  left: -130%;
  /* 色や形状 */
  background: #fff;
  width: 120%;
  height: 100%;
  transform: skewX(-25deg);
}
/* hoverした時のアニメーション */
.dialog-btns:hover::before {
  animation: skewanime 0.6s forwards; /* アニメーションの名前と速度を定義 */
}
@keyframes skewanime {
  100% {
    left: -10%; /* 画面の見えていない左から右へ移動する終了地点 */
  }
}
</style>
