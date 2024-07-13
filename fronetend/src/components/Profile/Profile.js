import React, { useState, useEffect,useRef} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import logo from '../images/muncipal_logo.jpg';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart, FaPenAlt, FaMapMarkerAlt, FaNotesMedical, FaUserSecret, FaTimes, FaSave, FaPersonBooth, FaBook, FaStar, FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';

const Profile = ({ user_id, handleLogout }) => {
    const [userData, setUserData] = useState([]);
    const [editIndex, setEditIndex] = useState(false);
    const [nameEditMode, setNameEditMode] = useState(false);
    const [addressEditMode, setAddressEditMode] = useState(false);
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [pass, setPass] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        user_id: user_id,
        name: '',
        image: null,
        year_of_joining: '',
        address: '',
        blood_grp: '',
        email: '',
        dept_id: '',
        position: '',
        password: '',
        confirmPassword: ''
    });

    const location = useLocation();
    const id = location.state?.id || [];

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/get_user_details/${id}`);
                setUserData(res.data);
                console.log("User Data : ", res.data)
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetails();
    }, []);

    const handleEdit = () => {
        setEditIndex(true);
        // if (field === 'name') {
        //     setNameEditMode(true);
        //     setAddressEditMode(false);
        //     setEmailEditMode(false);
        // } else if (field === 'address') {
        //     setNameEditMode(false);
        //     setAddressEditMode(true);
        //     setEmailEditMode(false);
        // } else if (field === 'email') {
        //     setNameEditMode(false);
        //     setAddressEditMode(false);
        //     setEmailEditMode(true);
        // }
    };

    const handleCancel = () => {
        setEditIndex(false);

    };

    const handleCancelPass = () => {
        setPass(false);

    };

    const handleChangePass = () => {
        // Implement your update logic here
       setPass(true);
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setUpdatedInfo(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSavePersonalDetails = async () => {

        console.log("Updated Info:", updatedInfo)
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/update_personal_details/${id}`, updatedInfo);
            // setInfo(res.data);
            console.log("Updated Info : ", res.data)
            window.location.reload()
            setEditIndex(false);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }


    };

    const handleUpdatePass= async () => {

        console.log("Updated Password:", updatedInfo)
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/update_password/${id}`, updatedInfo);
            // setInfo(res.data);
            console.log("Updated Info : ", res.data)
            window.location.reload()
            setEditIndex(false);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }


    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        console.log("Img Path: ",file);
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/update_user_photo/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(response.status==200) {
                alert("Profile Photo updated Successfully!!")
                window.location.reload()
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    



    return (
        <div className="container">
            <div className="profile_section">
                <h3 className='text-center'><b>Profile Section</b></h3>
<hr/>
                <div className="user_info">

                    <div className="user_main">
                        <div className="user_img">
                            {userData.map((data, i) => (
                                <img
                                    key={i}
                                    src={data.img ? `http://localhost:4000/${data.img}` : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}
                                    alt="mdo"
                                    style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover' }}
                                    className="rounded-circle"
                                />
                            ))}

                            <button className='btn btn-danger' onClick={handleButtonClick}>Edit</button>
                            <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />                        </div>
                        <div className="vertical-line"></div>
                        <div className="user_data">
                            {userData.map((data, i) => (
                                <>
                                    <p><b>Name : </b>{data.first_name} {data.mid_name} {data.last_name}</p>
                                    <p><b>Employee ID : </b>{data.user_id}</p>
                                    <p><b>Email : </b>{data.email}</p>
                                    <p><b>Position : </b>{data.position}</p>
                                </>
                            ))}

                        </div>
                    </div>

                    <hr />
                </div>

                {/* Details */}

                {userData.map((data, i) => (
                    <div className="row main_user_info">

                        <div className="row mb-3">
                            <h4 className='text-center'><b>Personal Details</b></h4>
                        </div>

                        <div className="inter_details">

                            <div class="col mb-3">
                                {!editIndex ? (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.first_name}  readOnly /></>
                                ) : (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updatedInfo.emp_name} onChange={(e) => handleInputChange(e, 'emp_name')} /></>
                                )}

                            </div>

                            <div class=" col mb-3">
                                {!editIndex ? (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Blood Group</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.blood_grp} readOnly /></>
                                ) : (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Blood Group</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updatedInfo.blood_grp} onChange={(e) => handleInputChange(e, 'blood_grp')} /></>
                                )}
                            </div>


                            <div class="col mb-3">

                                {!editIndex ? (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Address</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.address} readOnly /></>
                                ) : (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Address</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updatedInfo.address} onChange={(e) => handleInputChange(e, 'address')} /></>
                                )}
                            </div>

                            <div class="col mb-3">

                                {!editIndex ? (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.email} readOnly /></>
                                ) : (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updatedInfo.email} onChange={(e) => handleInputChange(e, 'email')} /></>
                                )}
                            </div>

                            <div class="col mb-3">

                                {!editIndex ? (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.phonenumber} readOnly /></>
                                ) : (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updatedInfo.phonenumber} onChange={(e) => handleInputChange(e, 'phonenumber')} /></>
                                )}
                            </div>



                            <div class="col mb-3">
                                {!editIndex ? (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Year Of Joining</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={data.year_of_joining} readOnly /></>
                                ) : (
                                    <>
                                        <label for="exampleFormControlInput1" class="form-label">Year Of Joining</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updatedInfo.year_of_joining} onChange={(e) => handleInputChange(e, 'year_of_joining')} /></>
                                )}
                            </div>


                        </div>
                        {!editIndex ? (
                            <>
                                <div class="d-flex justify-content-center mb-3">
                                    <button className='btn btn-primary' onClick={() => handleEdit()}><FaPenAlt className='mx-2' />Edit Profile</button>
                                </div>

                            </>
                        ) : (
                            <>

                                <div class="d-flex gap-2 justify-content-center mb-3">
                                    <button className='btn btn-primary mx-2' onClick={handleSavePersonalDetails}><FaSave className='mx-2' />Save</button>
                                    <button className='btn btn-danger' onClick={() => handleCancel()}><FaTimes className='mx-2' />Cancel</button>
                                </div></>
                        )}


                        <hr />

                        <div class="col mb-3">
                            <h4 className='text-center'><b>Other Details</b></h4>
                        </div>
                     
                    <div className='inner_details'></div>
                        <div className="col mb-3">

                            <div className="other_details">
                                {pass ? (<>
                                    <div>
                                <label for="exampleFormControlInput1" class="form-label">Enter Password</label><label type="button" className="btn btn-link" onClick={() => handleEdit('address')}>
                                </label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Password" name='password' onChange={(e) => handleInputChange(e, 'password')}/>                            
                                
                                </div>
                                </>):(<>
                                    <div>
                                <label for="exampleFormControlInput1" class="form-label">Password</label><label type="button" className="btn btn-link" onClick={() => handleEdit('address')}>
                                </label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Password" value='******' readOnly />                            
                                
                                </div>
                                </>)}
                               

                               {pass ? (<>
                                <div class="d-flex gap-2 justify-content-center mb-3 mt-4">
                                    <button className='btn btn-primary mx-2' onClick={handleUpdatePass}><FaSave className='mx-2' />Save</button>
                                    <button className='btn btn-danger' onClick={() => handleCancelPass()}><FaTimes className='mx-2' />Cancel</button>
                                </div>
                               </>)
                               :
                               (<>
                                <div>
                                <button className='btn btn-danger mt-4' onClick={handleChangePass}>Change Password</button>
                                </div>
                               </>)}
                               


                                </div>
                          
                        </div>




                    </div>
                ))}

            </div>
        </div>
    );
};

export default Profile;
