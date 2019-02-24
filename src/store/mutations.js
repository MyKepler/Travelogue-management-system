/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */
export default {
  login (state, payload) {
    sessionStorage.setItem('user', payload)
    sessionStorage.setItem('isLogin', true)
    state.user = payload
    state.isLogin = true
  },
  logout (state) {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isLogin')
    state.user = undefined
    state.isLogin = false
  }
}
