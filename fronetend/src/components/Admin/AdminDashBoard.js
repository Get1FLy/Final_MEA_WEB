import React from 'react'
import NavBar from '../NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeroSection from '../HeroSection/HeroSection'
import AddMembers from '../AddMembers'
import Team from '../Team/Team'
import NoticeBoard from '../NoticeBoard/NoticeBoard'
import AddEmployee from './AddEmployee'
import { useNavigate } from 'react-router-dom'
import EmpDetails from '../EmpDetails/EmpDetails'
import Circular from '../Circular/Circular'
import ViewCircular from '../Circular/ViewCircular'
import Notices from '../Circular/Notices'
import SuperAdminNavBar from '../NavBar/SuperAdminNavBar'
import AddAdmin from '../SuperAdmin/AddAdmin'
import AdminNavBar from '../NavBar/AdminNavBar'
import ViewQuery from '../ViewQuery/ViewQuery'
import Profile from '../Profile/Profile'
import NewTeam from '../Team/NewTeam'
import ReplyQuery from '../ViewQuery/ReplyQuery'


const AdminDashBoard = ({ handleLogout,status,user_type,user_id }) => {
 
  console.log("Status is here : ",status)
  console.log("User Type : ",user_type)

  return (
    <>
      {
        (status == 0 && user_type==3) ? (
          <>
          {/* <AdminNavBar handleLogout={handleLogout} user_id={user_id} /> */}
          <EmpDetails user_id={user_id} handleLogout={handleLogout}/>
          </>
        ) :(
          <>
            <AdminNavBar handleLogout={handleLogout} user_id={user_id} />
            {/* <NoticeBoard /> */}
            <Routes>
              <Route path='/' element={<HeroSection />} />
              <Route path='/team' element={<NewTeam />} />
              <Route path='/add_employee' element={<AddEmployee />} />
              <Route path='/view_query' element={<ViewQuery  user_id={user_id} />} />
              <Route path='/view_circular' element={<ViewCircular user_type={user_type}/>} />
              <Route path='/add_circular' element={<Circular />} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/notices' element={<Notices user_type={user_type}/>} />
              <Route path='/add_admin' element={<AddAdmin/>}/>
              <Route path='/replied_query' element={<ReplyQuery  user_id={user_id} />}/>
            </Routes>
          </>
        )
      }

    </>
  )
}

export default AdminDashBoard
