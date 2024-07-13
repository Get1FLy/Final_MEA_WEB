import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import HeroSection from './components/HeroSection/HeroSection';
import Login from './components/LoginRoutes/Login';
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import RoleLogin from './components/LoginRoutes/RoleLogin';
import LoginRoutes from './components/LoginRoutes/LoginRoutes';
import Team from './components/Team/Team';
import AdminDashBoard from './components/Admin/AdminDashBoard';
import SuperAdminDashBoard from './components/SuperAdmin/SuperAdminDashBoard';
import UserDashBoard from './components/User/UserDashBoard';
import NewTeam from './components/Team/NewTeam';
import logo_3 from '../src/components/images/muncipal_logo.jpg'
import loadingVideo from '../src/components/images/intro_video.mp4'
// import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function App() {
  // const navigate=useNavigate();

  const [token, setToken] = useState("");
  const [status_id, setStatus] = useState("");
  const [user_id, setUID] = useState(0);
  const [email,setEmail] = useState('');
  const [usertype,SetUserType]=useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const [istoken,setIstoken]=useState('');


  const handleLogout = () => {
    // setToken("");
    window.localStorage.clear();
    window.location.href = '/'; // Navigate to the root URL in the current tab/window
  };
  

  const handleLogin = (newToken,uid,status,user_type) => {
    setToken(newToken);

    window.localStorage.setItem("uid", uid);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem('user_type',user_type);

    console.log("Status : ",status);
  };

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    setIstoken(storedToken)
    if (storedToken) {
      setToken(storedToken);
     
      const uid=window.localStorage.getItem('uid');
      const status=window.localStorage.getItem('status');
      const user_type=window.localStorage.getItem('user_type');
      console.log("User Type: ",user_type)
      // const email_id=window.localStorage.getItem('email');
      
      if (token) {
      
        setUID(uid);
        setStatus(status);
        SetUserType(user_type)
        
        // setEmail(email_id);
      }
      // if(fac_id) { setFaculty_ID(fac_id)}
    }
   
    console.log("Faculty_ID : ",user_id);
  }, [token]);


  useEffect(() => {
    const loadValue = localStorage.getItem('load');

    if (!loadValue || loadValue === '0') {
        localStorage.setItem('load', '1');

        // Play the video programmatically
        // if (videoRef.current) {
        //     videoRef.current.play();
        // }

       
    } else {
        // setIsLoading(false);
    }
}, []);


useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
}, 7800);
}, [])


//   useEffect(() => {
//     const loadValue = localStorage.getItem('load');

//     if (!loadValue || loadValue === '0') {
//         localStorage.setItem('load', '1');
//         setTimeout(() => {
//             setIsLoading(false);
//         }, 7900);
//     } else {
//         // setIsLoading(false);
//     }
// }, []);


  return (
    <>

        <BrowserRouter>
        {
          usertype==2 ? (
            <DashBoard handleLogout={handleLogout} status={status_id} user_type={usertype} user_id={user_id}/>
            
          )
          : usertype==1 ? (
            <>
            <SuperAdminDashBoard handleLogout={handleLogout} status={status_id} user_type={usertype} user_id={user_id} token={istoken}/>
            </>
          ): usertype==3 ?(
            <AdminDashBoard handleLogout={handleLogout} status={status_id} user_type={usertype} user_id={user_id}/>
    
          ):(
            // <LoginRoutes handleLogin={handleLogin}/>
            <UserDashBoard handleLogout={handleLogout} handleLogin={handleLogin} status={status_id} user_type={usertype} user_id={user_id}/>
          )
        }
        
        </BrowserRouter>
    
    
    </>
  );
}

export default App;
