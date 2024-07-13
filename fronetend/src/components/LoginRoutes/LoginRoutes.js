import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './Login'
import RoleLogin from './RoleLogin'
import AdminLogin from './AdminLogin'
import SuperAdminLogin from './SuperAdminLogin'


const LoginRoutes = ({handleLogin}) => {
  return (
    <>
        <Routes>
        <Route path='/' element={<RoleLogin/>}></Route>
          <Route path='/user_login' element={<Login handleLogin={handleLogin}/>}></Route>
          <Route path='/admin_login' element={<AdminLogin handleLogin={handleLogin}/>}></Route>
          <Route path='/superadmin_login' element={<SuperAdminLogin handleLogin={handleLogin}/>}></Route>
        </Routes>
    </>
  )
}

export default LoginRoutes
