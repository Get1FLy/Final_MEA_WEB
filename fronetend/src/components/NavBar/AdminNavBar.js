import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/muncipal_logo.jpg'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminNavBar = ({ handleLogout,user_id }) => {
  
    const [img,setImg]=useState([]);

    const navigate=useNavigate();


    useEffect(() => {

        const getProfile = async () => {
            try {
                // const timeout = setTimeout(() => {
                //     setIsLoading(false);
                // }, 1000);
                const res = await axios.get(`http://localhost:4000/get_profile/${user_id}`);
                console.log(res.data);
                setImg(res.data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        getProfile();
    }, []);
    

    
    const handlenavigate = (e)=>{
      console.log("Id is here:",user_id)
      navigate('/profile',{state:{id:user_id}})
    }
   
   

    return (
        // <div className="mynavbar">
        //     <nav className="navbar navbar-expand-lg">
        //         <div className="container-fluid">
        //             <a className="navbar-brand" href="#">Navbar</a>
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //                 <div className="navbar-nav">
        //                     <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        //                     <a className="nav-link" href="#">About us</a>
        //                     <Link className="nav-link" to="/team">Our Team</Link>
        //                     <Link className="nav-link" to='/view_query'>View Query</Link>
        //                     <Link className='nav-link' to='/add_employee'>Add Employee</Link>
        //                     <li className="nav-item dropdown">
        //                         <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        //                             Circular
        //                         </a>
        //                         <ul className="dropdown-menu">
        //                             <li><Link className="dropdown-item" to='/add_circular'>Add Circulars</Link></li>
        //                             <li><Link className="dropdown-item" to="/view_circular">View Circulars</Link></li>
        //                         </ul>

        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className='nav-link' to='/notices'>
        //                             <span className="red-dot"></span>Notices
        //                         </Link>
        //                     </li>

        //                     <Link className='nav-link' onClick={handleLogout}>Log out</Link>
        //                     <li className='nav-link'>
        //                         <li type="button" className="position-relative">
        //                             <FontAwesomeIcon icon={faBell} size="lg" color="black" />
        //                             {true ? (
        //                                 <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
        //                                     <span className="visually-hidden">New alerts</span>
        //                                 </span>
        //                             )
        //                                 : (<></>)}

        //                         </li>
        //                     </li>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
        // </div>

        <header className="">


        <div className="mynavbar fixed-top">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <img className="bi me-2" src={logo}  width="80" height="80"></img>
            </a>
    
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 link-body-emphasis">Home</Link></li>
              <li><Link to="/" className="nav-link px-2 link-body-emphasis">About Us</Link></li>
              <li><Link to="/team" className="nav-link px-2 link-body-emphasis">Our Team</Link></li>
              <li><Link to="/notices" className="nav-link px-2 link-body-emphasis">Notices</Link></li>
              <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" style={{color:'black'}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Queries
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/view_query">View Queries</Link></li>
            <li><Link className="dropdown-item" to='/replied_query'>Replied Queries</Link></li>
          </ul>
        </li>

            </ul>
    
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" className="form-control" style={{width:'400px'}} placeholder="Search..." aria-label="Search"/>
            </form>
    
            <div className="dropdown text-end" style={{marginRight:'2rem'}}>
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {img.map((data,i)=>(
            <img src={data.img ? `http://localhost:4000/${data.img}` : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'} alt="mdo" width="40" height="40" className="rounded-circle"/>
                ))}
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item"  onClick={(e)=>handlenavigate(e)}>Profile</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a></li>
          </ul>
        </div>
             
            </div>
          </div>
        
      </header>
    );
};

export default AdminNavBar;
