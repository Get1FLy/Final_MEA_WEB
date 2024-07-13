import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
// import '../LoginRoutes/login.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import './viewquery.css'
import { FaShoppingCart, FaPenAlt, FaMapMarkerAlt, FaNotesMedical, FaUserSecret, FaTimes, FaSave, FaPersonBooth, FaBook, FaStar, FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';

const ReplyQuery = ({ user_id, role }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        msg_id: null,
        text: '',
        user_id: user_id
    });

    const [editItemId, setEditItemId] = useState(null);

    const [isedit, setIsEdit] = useState(false);


    useEffect(() => {


        const getMessages = async () => {
            try {

                const timeout = setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                let response = '';
                if (role == 1) {
                    response = await axios.get(`http://localhost:4000/get_admin_replied_msg`);


                }
                else {
                    response = await axios.get(`http://localhost:4000/get_replied_msg/${user_id}`);

                }
                setData(response.data);
                console.log("Replied Data: ", response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getMessages();
    }, []);

    const handleChange = (text, msg_id) => {
        setFormData({ ...formData, text, msg_id });

    };

    const handleEdit = (msg_id) => {
        setIsEdit(true);
        setEditItemId(msg_id);
    };
    const handleCancel = () => {
        setIsEdit(false);
        setEditItemId(null);
    };

    const handleSubmit = () => {
        try {
            console.log(formData);
            axios.post(`http://localhost:4000/update_message`, formData)
                .then(response => {

                    if (response.status == 200) {
                        console.log(response.data);
                        toast.success(response.data.msg)
                        window.location.reload()
                    }
                    else if (response.status == 500) {
                        console.log(response.data);
                        toast.warning(response.data.msg)
                    }
                    else {
                        console.log(response.data);
                        toast.error("Kuch to gadbad hai")
                    }
                    setFormData({
                        msg_id: null,
                        text: '',
                        user_id: user_id
                    });
                })
                .catch(error => {

                    console.error('Error:', error);
                    toast.warning(error.message || 'An error occurred');
                });

            console.log("Data to send:", formData)

        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">

            <div className="view_query_section">
                {isLoading ?
                    (
                        <div className='d-flex justify-content-center' style={{ marginTop: '50px' }}>

                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>

                    ) : (
                        <>

                            <div className="main_query_info">
                                <div className="heading d-flex flex-column justify-content-center align-items-center  rounded-start-pill rounded-end-pill">
                                    <h3 className='font-style-italic' id="query_head">Replied Queries</h3>
                                    <p style={{ color: 'grey' }}>See Replied Queries here...</p>
                                </div>

                                <div className="d-flex gap-5 justify-content-center flex-wrap">
                                    {data.map((item, i) => (
                                        <div className="event_card" key={i}>
                                            <div className="card" style={{ width: '20rem', height: 'fit-content' }}>
                                                <div className="card-body" style={{ width: '20rem', height: 'fit-content' }}>
                                                    <p className="card-text" style={{ fontSize: '15px', textAlign: 'start' }}>
                                                        <b>{`Query ${i + 1} : `}</b><br />{item.text}
                                                    </p>
                                                    <label for="exampleFormControlTextarea1" class="form-label mt-2"><b>Answer : </b></label>
                                                    {isedit ? (
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" onChange={(e) => handleChange(e.target.value, item.msg_id)} rows="3" placeholder='Reply here...'></textarea>

                                                    ) : (
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" value={item.reply} rows="3" placeholder='Reply here...' ></textarea>

                                                    )}
                                                    <br />
                                                    <p style={{ fontSize: '15px' }}>Replied by : ~ {item.first_name} {item.last_name}</p>
                                                    {/* {!isedit ? (
                                                        <button className='btn btn-danger mt-3 btn-sm' onClick={(i)=>handleEdit(i)}>Edit</button>

                                                    ) : (
                                                        <>

                                                            <button className='btn btn-danger mt-3 btn-sm' id="save_btn" onClick={handleSubmit}><FaSave className='mx-1' />Save</button>
                                                            <button className='btn btn-danger mt-3 btn-sm mx-3' onClick={handleCancel}><FaTimes className='mx-1' />Cancel</button>

                                                        </>

                                                    )} */}

                                                    {isedit && editItemId === item.msg_id ? (
                                                        <>
                                                            <button className='btn btn-danger mt-3 btn-sm' id="save_btn" onClick={handleSubmit}>
                                                                <FaSave className='mx-1' />Save
                                                            </button>
                                                            <button className='btn btn-danger mt-3 btn-sm mx-3' onClick={handleCancel}>
                                                                <FaTimes className='mx-1' />Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button className='btn btn-danger mt-3 btn-sm' onClick={() => handleEdit(item.msg_id)}>Edit</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <Toaster position='top-center' richColors />

        </div>
    );
};

export default ReplyQuery;
