// import service from '@/services/HomePage'

// const {apiGetArticle} = service

// export default {
//   async getArticle ({ commit, dispatch }, param) {
//     const data = await apiGetArticle(param)
//     return data
//   }
// }
export default {
  login (context, payload) {
    context.commit('login', payload)
  },
  logout (context) {
    context.commit('logout')
  }
}
