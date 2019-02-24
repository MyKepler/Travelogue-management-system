/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */
export default {
  isLogin: state => {
    if (!state.isLogin) {
      state.isLogin = sessionStorage.getItem('isLogin')
      state.user = sessionStorage.getItem('user')
    }
    return state.user
  }
}
