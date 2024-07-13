import { React, useState, useEffect } from 'react'
import './login.css'
import emp from '../images/emp_logo.png';
import admin from '../images/admin_logo.png';
import axios from 'axios'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import admin_login from '../images/user_login.jpg'
import OTPInput from '../OTPInput/OTPInput';


const Login = ({ handleLogin, token }) => {

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

    const [isNext,setIsNext]=useState(false);

    const navigate = useNavigate()

    // const navigate = useNavigate();

    if (token) {
        navigate('/');

    }

    const showSignup = () => {
        // navigate('/register')
        setShowLogin(true);
    };


    const showLoginSection = () => {
        setShowLogin(true);
    };

    const handleOTPChange = (otp) => {
        setFormData((prevState) => ({
            ...prevState,
            otp
        }));
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
            const apiEndpoint = 'http://localhost:4000/login';
            console.log(formData);
            const res = await axios.post(apiEndpoint, {
                email: formData.email,
                password: formData.password
            });

            handleLogin(res.data.token, res.data.uid, res.data.status, res.data.user_type, navigate('/'));

            localStorage.setItem("uid", res.data.uid);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("status", res.data.status);
            localStorage.setItem("user_type", res.data.user_type);

            console.log("uid", res.data.uid, res.data.status);

            // Show success toast message
            toast.success("Logged In Successfully");
        } catch (error) {
            console.error(error);
            // Show error toast message for invalid credentials
            toast.error("Invalid Credentials!");

            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("An error occurred during login.");
            }
        }
    };

    const handleForgetPassword = () => {
        setShowLogin(false)
    }

    const handleNext=(e)=>{
        e.preventDefault();
        setIsNext(true)
    }

    return (

        <>
            <Toaster position='top-center' richColors />
            <div className="login-box">

                <div className="outer_super_login">
                    <div className="super_login">
                        <img src={admin_login} />
                        <form className='mt-2 admin_form'>
                            <h2 className="mb-3" style={{ fontSize: '30px', color: 'navy' }}>Welcome User</h2>
                            <p style={{ color: 'grey', fontSize: '15px', padding: '0px' }}>( Login with your ID and Password )</p>
                            {showLogin ? (
                                <>
                                    <label htmlFor="email">Employee ID:</label>
                                    <input type="text" id="email" name="email" onChange={handleChange} required />
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" onChange={handleChange} required />

                                    <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                        <button className="btn btn-primary w-100 mt-2" style={{ backgroundColor: '#0c0c54' }} type="submit">Login</button>
                                        <p onClick={handleForgetPassword}>Forget Password?</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {isNext ? (
                                        <>
                                            <label htmlFor="otp">Enter OTP:</label>
                                            {/* <input type="number" id="otp" name="otp" onChange={handleChange} required /> */}
                                            <OTPInput length={6} onChange={handleOTPChange} />
                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                <button className="btn btn-primary w-100 mt-2" style={{ backgroundColor: '#0c0c54' }} type="submit">Verify</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <label htmlFor="email">Register Email ID:</label>
                                            <input type="text" id="email" name="email" onChange={handleChange} required />
                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                <button className="btn btn-primary w-100 mt-2" style={{ backgroundColor: '#0c0c54' }} type="button" onClick={(e)=>handleNext(e)}>Next</button>
                                                <p onClick={showSignup}>Back</p>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                        </form>
                    </div>
                </div>

                {/* <div className="forgot-password">
                    <a href="#">Forgot Password?</a>
                </div> */}
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

export default Login
