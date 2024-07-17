import React from 'react'
import { Outlet, Navigate } from 'react-router-dom' 
// outlet is a placeholder for nested routes 主要作用是在嵌套路由中渲染子路由的内容
import { useSelector } from 'react-redux'


const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)
  return (
    userInfo ? <Outlet /> : <Navigate to='/login' replace/> // replace: replace the current entry in the history stack instead of adding a new one
    // replace: 当你重定向用户到登录页面时，replace 属性会替换当前的历史记录，而不是在历史记录中添加一个新条目。这意味着用户在登录后点击浏览器的返回按钮时，不会再回到需要保护的路由，而是会回到他们之前的页面。
  )
}

export default PrivateRoute
