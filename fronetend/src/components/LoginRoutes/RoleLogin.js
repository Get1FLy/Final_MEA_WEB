import React from 'react';
import emp from '../images/emp_logo.png';
import admin from '../images/admin_logo.png';
import './login.css'
import logo from '../images/muncipal_logo.jpg';
import logo2 from '../images/logo_2.png';
import Login from './Login';
import { Link } from 'react-router-dom';

const RoleLogin = () => {
    return (
        <div className="container">
            <div className='d-flex justify-content-center align-items-center' style={{marginTop:'5rem'}} >
                <div className="main_card p-3">
                    <div className="text-center mb-4">
                        <img src={logo} alt="Employee Logo" style={{ width: '110px', height: '110px', borderRadius: '50%' }} /><br />
                        {/* <img src={logo2} alt="Logo 2" style={{ width: '565px', height: '90px',}} /> */}
                        <p style={{ fontWeight: '700', fontSize: '2rem', color: '#dc3545' }}> म्युनिसिपल इंजीनियर असोसिएशन, मुंबई </p>
                        <hr />
                    </div>
                    <div className="heading d-flex flex-column justify-content-center align-items-center rounded-start-pill rounded-end-pill">
                        <h2 className="mb-0" style={{ fontSize: '30px' }}>Welcome</h2>
                        <p style={{ color: 'grey', fontSize: '20px', margin: '0px' }}>Please select your login.</p>
                    </div>
                    <div className="team_card gap-50 mt-1 d-flex justify-content-center align-items-center">
                        <div className="card" style={{ width: "10rem", height: 'fit-content' }}>
                            <img className="card-img-top px-2 py-2" src={emp} alt="Employee" />
                            <div className="card-body">
                                <Link to='/user_login' className="btn btn-primary btn-md w-100 my-3" style={{ backgroundColor: '#0c0c54' }}>User</Link>
                            </div>
                        </div>

                        <div className="card" style={{ width: "10rem", height: 'fit-content' }}>
                            <img className="card-img-top px-2 py-2" src={admin} alt="Admin" />
                            <div className="card-body">
                                <Link to="/admin_login" className="btn btn-primary btn-md w-100 my-3" style={{ backgroundColor: '#0c0c54' }}>Admin</Link>
                            </div>

                        </div>
                        <div className="card" style={{ width: "10rem", height: 'fit-content' }}>
                            <img className="card-img-top px-2 py-2" src={admin} alt="Admin" />
                            <div className="card-body">
                                <Link to="/superadmin_login" className="btn btn-primary btn-md w-100 my-3" style={{ backgroundColor: '#0c0c54' }}>SuperAdmin</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleLogin;
