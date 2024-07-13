import React from 'react'
import NavBar from '../NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeroSection from '../HeroSection/HeroSection'
import AddMembers from '../AddMembers'
import Team from '../Team/Team'
import NoticeBoard from '../NoticeBoard/NoticeBoard'
import AddEmployee from '../Admin/AddEmployee'
import { useNavigate } from 'react-router-dom'
import EmpDetails from '../EmpDetails/EmpDetails'
import Circular from '../Circular/Circular'
import ViewCircular from '../Circular/ViewCircular'
import Notices from '../Circular/Notices'
import SuperAdminNavBar from '../NavBar/SuperAdminNavBar'
import AskQuery from '../AskQuery/AskQuery'
import UserNavBar from '../NavBar/UserNavBar'
import RoleLogin from '../LoginRoutes/RoleLogin'
import AdminLogin from '../LoginRoutes/AdminLogin'
import Login from '../LoginRoutes/Login'
import SuperAdminLogin from '../LoginRoutes/SuperAdminLogin'
import LoginRoutes from '../LoginRoutes/LoginRoutes'
import Profile from '../Profile/Profile'
import NewTeam from '../Team/NewTeam'



const UserDashBoard = ({ handleLogout,handleLogin,status,user_type,user_id }) => {
 
  console.log("Status is here : ",status)
  console.log("User Type : ",user_type)

  return (
    <>
      
          <>
            <UserNavBar handleLogout={handleLogout} />
            <Routes>
              <Route path='/' element={<HeroSection />} />
              <Route path='/team' element={<NewTeam />} />
              {/* <Route path='/ask_query' element={<AskQuery user_id={user_id}/>} /> */}
              <Route path='/notices' element={<Notices user_type={user_type}/>} />
              <Route path='/login_routes'element={<LoginRoutes handleLogin={handleLogin}/>}/>
              <Route path='/user_login' element={<Login handleLogin={handleLogin}/>}/>
              <Route path='/admin_login' element={<AdminLogin handleLogin={handleLogin}/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/superadmin_login' element={<SuperAdminLogin handleLogin={handleLogin}/>}/>
            </Routes>
          </>

    </>
  )
}

export default UserDashBoard
