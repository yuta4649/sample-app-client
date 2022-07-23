class SessionInfoRepository {
  sessionStorage = window.sessionStorage;

  /**
   * ログイン情報を保存します
   * @param {any} userDto ユーザー情報
   */
  saveLoginInfo(userDto) {
    if (!userDto) {
      this.sessionStorage.removeItem("login-info");
    } else {
      this.sessionStorage.setItem("login-info", JSON.stringify(userDto));
    }
  }

  /**
   * ログイン情報を復元します
   */
  restoreLoginInfo() {
    const value = this.sessionStorage.getItem("login-info");
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  /**
   * ログインしているかどうか返します
   */
  isLogin() {
    return this.restoreLoginInfo() != null;
  }
}

export default new SessionInfoRepository();
