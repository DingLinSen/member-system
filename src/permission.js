// 引入路由对象
import router from './router'

// 引入store
import store from './store'

// 创建路由守卫，实现页面拦截

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  // 判断有没有token
  if (token) {
    // 有token，判断进入的是不是登录页，是登陆页就跳转到登录之前的页面，不是就放行
    if (to.path === '/login') {
      next(from.path)
    } else {
      // 判断有没有用户信息，有用户信息放行,没有用户信息获取用户信息，获取成功的话放行，不成功跳转登录页
      let userInfo = store.getters.userInfo
      userInfo = typeof userInfo === 'object' ? JSON.stringify(userInfo) : userInfo
      if (userInfo === '{}' || userInfo === '') {
        const response = await store.dispatch('handleUserInfo')
        if (response) {
          next()
        } else {
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    // 没有token，判断去的是不是登录页，是登录页就放行，不是登录页就去登录页
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
