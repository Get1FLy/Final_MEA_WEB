import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
// import '../LoginRoutes/login.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import './viewquery.css'
const ViewQuery = ({ user_id }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        msg_id: null,
        text: '',
        user_id: user_id
    });

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/get_messages_admin`);
                setData(response.data);
                setIsLoading(false)

            } catch (error) {
                console.error('Error:', error);
            }
        }
        getMessages();
    }, []);

    const handleChange = (text, msg_id) => {
        setFormData({ ...formData, text, msg_id });
    };

    const handleSubmit = () => {
        try {
            setIsLoading(true)
            console.log(formData);
            // Send the FormData object to the server
            axios.post(`http://localhost:4000/reply_message`, formData)
                .then(response => {
                   
                    if(response.status==200) {
                        console.log(response.data);
                        toast.success(response.data.msg)
                        setTimeout(async () => {
                            const response = await axios.get(`http://localhost:4000/get_messages_admin`);
                            setData(response.data);
                            setIsLoading(false);
                        }, 1000);
                    
                    }
                    else if(response.status==500) {
                        console.log(response.data);
                        toast.warning(response.data.msg)
                    }
                    else{
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
                    // Handle any errors
                    console.error('Error:', error);
                    toast.warning(error.message || 'An error occurred');
                });
                

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
                    <div className='d-flex justify-content-center' style={{marginTop:'50px'}}>
                      
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only"></span>
                    </div>
                    </div>

                ):(
                    <>

                    <div className="main_query_info">
                    <div className="heading d-flex flex-column justify-content-center align-items-center  rounded-start-pill rounded-end-pill">
                <h3 className='font-style-italic' id="query_head">View Query</h3>
                <p style={{ color: 'grey' }}>Reply to the Queries here...</p>
            </div>
         
            <div className="d-flex gap-5 justify-content-center flex-wrap">
                {data.map((item, i) => (
                    <div className="event_card" key={i}>
                        <div className="card" style={{ width: '20rem', height: 'fit-content' }}>
                            <div className="card-body"  style={{ width: '20rem', height: 'fit-content' }}>
                                <p className="card-text" style={{ fontSize: '15px', textAlign: 'start' }}>
                                    <b>{`Query ${i + 1} : `}</b><br/>{item.text}
                                </p>
                                    <label for="exampleFormControlTextarea1" class="form-label mt-2"><b>Answer : </b></label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" onChange={(e) => handleChange(e.target.value, item.msg_id)} rows="3" placeholder='Reply here...' ></textarea>
                                    <button className='btn btn-danger mt-2 btn-sm' onClick={handleSubmit}>Reply</button>
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
            <Toaster position='top-center' richColors/>
            
        </div>
    );
};

export default ViewQuery;
