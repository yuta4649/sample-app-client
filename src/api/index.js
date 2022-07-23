import ky from "ky";

/**
 * 共通のAPI(ログインなど)
 */
export const commonApi = ky.create({ prefixUrl: "/api" });

/**
 * アプリケーションレイヤーのAPI
 */
export const api = ky.create({ prefixUrl: "/api/app" });

/**
 * 共通エラーハンドラー
 * @param vue {Vue} Vueインスタンス
 * @param error {Response} エラーオブジェクト
 * @param fieldError {boolean} エラーを画面上に表示
 */
export const errorHandler = async (vue, error, fieldError) => {
  let status = -1;
  // TODO i18n
  let message = "通信エラーが発生しました";
  let errorCode = "C001";
  let respMsg = null;
  try {
    status = error.response.status;
    respMsg = await error.response.json();
    if (respMsg.errors) {
      message = respMsg.errors[0].message;
      errorCode = respMsg.errors[0].code;
    }
  } catch (exError) {
    // ignore
  }
  if (fieldError && respMsg && respMsg.errors) {
    // 画面上に表示できる場合
    vue.errors = respMsg.errors;
  } else {
    vue.$emit("api-global-error", {
      status,
      message,
      errorCode,
    });
  }
};

/**
 * APIリクエストを実行する
 *
 * @param {Vue} vue Vueインスタンス
 * @param {() => void} fn
 */
export const withApi = async (vue, fn, fieldError) => {
  try {
    await fn();
  } catch (error) {
    await errorHandler(vue, error, fieldError);
  }
};
