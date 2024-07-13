import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
// import './login.css';
import './ask_query.css'
import axios from 'axios';
import { Toaster, toast } from 'sonner'



const AskQuery = ({ user_id }) => {
    const [circularModalShow, setCircularModalShow] = useState(false);
    const [eventsModalShow, setEventsModalShow] = useState(false);
    const [newsModalShow, setNewsModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [selectimg, setSelectImg] = useState(null)
    const [formData, setFormData] = useState({
        text: ''
    });

    const [data, setData] = useState([])

    // console.log("Modal ID: ", title)

    useEffect(() => {

        // /get_messages/:user_id
        const getmessages = async () => {
            try {
               
                // Send the FormData object to the server
                axios.get(`http://localhost:4000/get_messages/${user_id}`)
                    .then(response => {
                        // Handle the response from the server
                        console.log(response.data);
                        setData(response.data)
                        setIsLoading(false);
                    })
                    .catch(error => {
                        // Handle any errors
                        console.error('Error:', error);
                    });

            } catch (error) {
                // Handle any errors
                console.error('Error:', error);
            }
        }

        getmessages()

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log("Message : ", formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            console.log(formData);
            // Send the FormData object to the server
            const response = await axios.post(`http://localhost:4000/add_message/${user_id}`, formData);
    
            if (response.status === 200) {
                toast.success("Query Asked");
                console.log("Toast: ",response.data.msg)
    
                setTimeout(async () => {
                    const response = await axios.get(`http://localhost:4000/get_messages/${user_id}`);
                    setData(response.data);
                    setIsLoading(false);
                }, 1000);
            } else {
                toast.error('Failed to submit the query');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong');
            setIsLoading(false);
        }
    };
    

    return (
        
        <div className="main_ask">
            <div className="outer_container_ask">
        <div className="container">
            {isLoading ? (
               
                    <div className='d-flex justify-content-center' style={{marginTop:'150px'}}>
                      
                    <div className="spinner-border text-danger mb-5" role="status">
                        <span className="sr-only"></span>
                    </div>
                    </div>

            ):(
                <>
                 <Toaster position="top-center" richColors />
            <div className="heading d-flex flex-column justify-content-center align-items-center mt-5 rounded-start-pill rounded-end-pill">
                <h2 className='font-style-italic'>Ask Query</h2>
                <p style={{ color: 'grey' }}>Enter the query that you want to ask.</p>
            </div>
            <div className="input_sub">

                <input type="text" className="form-control" name='text' placeholder="Enter the message..." onChange={handleChange} aria-label="Recipient's username" aria-describedby="button-addon2" />

                <button className="btn btn-danger h-46" type="button" id="submitbtn" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="heading d-flex flex-column justify-content-center align-items-center mt-5 rounded-start-pill rounded-end-pill">
                <h3 className='font-style-italic' style={{ fontWeight: '700' }}> See Queries</h3>
                <p style={{ color: 'grey' }}>Asked Queries will be displayed here.</p>
            </div>
            <div className="main_accordion">
                {data.map((item, i) => (
                    <div className="accordion" id="accordionExample">

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" style={{ width: '20rem' }} id="accord_head" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${i}`} aria-expanded="true" aria-controls={`collapseOne${i}`}>
                                    {item.text}
                                </button>
                            </h2>
                            <div id={`collapseOne${i}`} className="accordion-collapse collapse show" data-bs-parent={`#accordionExample${i}`}>
                                <div className="accordion-body" style={{ width: '20rem', height: '10rem', overflowY: 'auto' }}>
                                    {item.reply ? (
                                        <>
                                            <strong>Answer: </strong> <br /> {item.reply}
                                        </>
                                    ) : (
                                        <>
                                            <strong>Answer: </strong> <br /> No Reply till...
                                        </>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
                </>
            )}
           
        </div>
        </div>
        </div>
    );
};

export default AskQuery;
