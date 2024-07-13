import { React, useState, useEffect } from 'react'
import './login.css';
import emp from '../images/emp_logo.png';
import admin from '../images/admin_logo.png';
import axios from 'axios'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import login_vector from '../images/login_vector.jpg'

const SuperAdminLogin = ({handleLogin,token}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

 const navigate=useNavigate()

    // const navigate = useNavigate();

    if (token) {   
          navigate('/');
        
      }

    const showSignup = () => {
        // navigate('/register')
        setShowLogin(false);
    };


    const showLoginSection = () => {
        setShowLogin(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle the role dropdown separately
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const apiEndpoints = {
            //     1: `http://localhost:4000/login`,
            //     2: `http://localhost:4000/user_login`
            // };

            const apiEndpoint ='http://localhost:4000/super_admin_login';

            // if (!apiEndpoint) {
            //     setErrorMessage("Invalid role selected.");
            //     return;
            // }
            console.log(formData);
            const res = await axios.post(apiEndpoint, {
                email: formData.email,
                password: formData.password
            });

              handleLogin(res.data.token,res.data.uid,res.data.status,res.data.user_type,navigate('/'));

            // Assuming the role is part of the response data
            const role = res.data.role;

            // Save role and token to localStorage
            localStorage.setItem("uid",res.data.uid);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("status", res.data.status);
            localStorage.setItem("user_type", res.data.user_type);
            
            console.log("uid", res.data.uid,res.data.status);


            alert("Logged In Successfully");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("An error occurred during login.");
            }
        }
    };
    return (

        <>
            <div className="login-box">
                {/* <div className="text-center mb-4">
                    <img src={admin} alt="Employee Logo" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                </div> */}
                <div className="heading d-flex flex-column justify-content-center align-items-center rounded-start-pill rounded-end-pill">
                </div>
                {showLogin ? (
                    <>
                    <div className='outer_super_login'>
                    <div className="super_login">
                    <img src={login_vector}/>
                                        <form className='admin_form'>
                                        <h2 className="mb-3"  style={{ fontSize: '30px',color:'navy' }}>Welcome</h2>
                                        <p style={{ color: 'grey', fontSize: '15px',padding:'0px' }}>( Login with your ID and Password )</p>

                        <label htmlFor="username">Employee ID :</label>
                        <input type="text" id="username" name="email" onChange={handleChange} required />
                        <label htmlFor="password">Password :</label>
                        <input type="password" id="password" name="password" onChange={handleChange} required />


                        <button className="btn btn-primary w-100 mt-2" type="submit" style={{backgroundColor:'#0c0c54'}} value="Login" onClick={handleSubmit}>Login</button>


                    </form>
                    </div>
                    </div>
                    </>

                ) : (
                    <form>
                        <label htmlFor="newUsername">New Username:</label>
                        <input type="text" id="newUsername" name="newUsername" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
                        <label htmlFor="newPassword">New Password:</label>
                        <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <input type="submit" value="Signup" />


                    </form>
                )}
                <div className="forgot-password">
                    {/* <a href="#">Forgot Password?</a> */}
                </div>
                {/* <div className="signup">
                    {showLogin ? (
                        <Link to="/registeration" className="hero-btn">Signup</Link>
                    ) : (
                        <a href="#" onClick={showLoginSection} className="hero-btn">Back to Login</a>
                    )}
                </div> */}
            </div>
        </>

    )
}

export default SuperAdminLogin
