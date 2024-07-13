import React from 'react';
import './navbar.css';
import logo from '../images/muncipal_logo.jpg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const UserNavBar = ({ handleLogout, user_id }) => {




  return (
    <div className="mynavbar fixed-top">
      {/* <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            <a className="nav-link" href="#">About us</a>
                            <Link className="nav-link" to="/team">Our Team</Link>
                            <li className="nav-item">
                                <Link className='nav-link' to='/ask_query'>
                                    <span className="red-dot"></span>Ask Query
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/notices'>
                                    <span className="red-dot"></span>Notices
                                </Link>
                            </li>

                            <Link className='nav-link' onClick={handleLogout}>Log out</Link>
                        </div>
                    </div>
                </div>
            </nav> */}
      <header className="">
        <div className="mynavbar">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <img className="bi me-2" src={logo} width="80" height="80"></img>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 link-body-emphasis">Home</Link></li>
              <li><Link to="/" className="nav-link px-2 link-body-emphasis">About Us</Link></li>
              <li><Link to="/team" className="nav-link px-2 link-body-emphasis">Our Team</Link></li>
              <li><Link to="/notices" className="nav-link px-2 link-body-emphasis">Notices</Link></li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" className="form-control" style={{ width: '350px' }} placeholder="Search..." aria-label="Search" />
            </form>

            <div className="dropdown" style={{marginRight:'2rem'}}>
              <Link to="/login_routes" className="d-block link-body-emphasis" aria-expanded="false">
                <button className='btn btn-md' style={{backgroundColor:'navy',color:'white'}}>Login</button>
              
              </Link>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserNavBar;
