import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../LoginRoutes/login.css'

import axios from 'axios';

const UploadModal = ({ show, onHide, title}) => {


    const [selectimg, setSelectImg] = useState(null)
    const [formData, setFormData] = useState({
        image:null,
        name: '',
    });

    console.log("Modal ID: ",title)
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
    
    
        try {
            console.log(formData);
            // Send the FormData object to the server
            axios.post(`http://localhost:4000/add_circulars/${title}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important: Set content type to multipart/form-data
                }
            })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); 
                    alert(response.data.msg)// 
                   window.location.reload()
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                });
            
        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
        }
    };
    
    

    const handleImageChange = (e) => {
        // setSelectImg(e.target.files[0]);
        setFormData({image: e.target.files[0]});
    };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="add-member-form-container py-5">
            <form onSubmit={handleSubmit} className="add-member-form">
                <h3>Upload {title}</h3>
                <div className="form-floating mb-3 my-3">
                    <input
                        type="file"
                        accept=".pdf"
                        name='image'
                        id="pdfFile"
                        onChange={handleImageChange}
                        className="input-field"
                    />
                </div>
                <div className="form-floating mb-3">

                    <input
                        type="text"
                        name="name"
                        accept="image/*" 
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        id="floatingName"
                        placeholder="Name"
                        
                    />
                    <label htmlFor="floatingName" className='modal-text'>Name</label>
                </div>
                <div className='d-flex gap-2 w-100'>
                <button type="submit" classame="btn btn-danger w-100 my-2">Upload</button>
                <Button className="btn btn-secondary w-100 my-2"variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        </div>
            </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
     
        {/* Add your upload button or any other actions here */}
      </Modal.Footer>
    </Modal>
  );
};

const Circular = () => {

  const [circularModalShow, setCircularModalShow] = useState(false);
  const [eventsModalShow, setEventsModalShow] = useState(false);
  const [newsModalShow, setNewsModalShow] = useState(false);

  return (
    <div className="main_notice w-100">
      <div className="outer_notice">
        <div className="heading d-flex flex-column justify-content-center align-items-center mt-5 rounded-start-pill rounded-end-pill">
                    <h2 className='font-style-italic'>Add Circulars</h2>
                    <p style={{color:'grey'}}>Upload important circulars to keep everyone informed.</p>
                </div>
      <div className="d-flex gap-5 justify-content-center">
        <div className="event_card">
          {/* Circular Card */}
          <div className="card" style={{ width: '20rem', height: '22rem' }}>
            <img
              className="card-img-top px-2 py-2"
              src="https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
              alt="Employee"
            />
            <div className="card-body">
              <h5 className="card-text">Add Circular</h5>
              <p className="card-text" style={{ fontSize: '13px', textAlign: 'start' }}>
                Upload the important circular here
              </p>
              <Button variant="danger" className="btn-md w-100 my-2" onClick={() => setCircularModalShow(true)}>
                Upload
              </Button>
            </div>
          </div>
          {/* Circular Modal */}
          <UploadModal show={circularModalShow} onHide={() => setCircularModalShow(false)} title="Circular"/>
        </div>

        <div className="event_card">
          {/* Circular Card */}
          <div className="card" style={{ width: '20rem', height: '22rem' }}>
            <img
              className="card-img-top px-2 py-2"
              src="https://www.shutterstock.com/image-photo/event-word-written-wooden-cube-600nw-523706464.jpg"
              alt="Employee"
            />
            <div className="card-body">
              <h5 className="card-text">Add Event</h5>
              <p className="card-text" style={{ fontSize: '13px', textAlign: 'start' }}>
                Upload the important events here
              </p>
              <Button variant="danger" className="btn-md w-100 my-2" onClick={() => setEventsModalShow(true)}>
                Upload
              </Button>
            </div>
          </div>
          {/* Circular Modal */}
          <UploadModal show={eventsModalShow} onHide={() => setEventsModalShow(false)} title="Event"/>
        </div>


        <div className="event_card">
          {/* Circular Card */}
          <div className="card" style={{ width: '20rem', height: '22rem' }}>
            <img
              className="card-img-top px-2 py-2"
              src="https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
              alt="Employee"
            />
            <div className="card-body">
              <h5 className="card-text">Add News</h5>
              <p className="card-text" style={{ fontSize: '13px', textAlign: 'start' }}>
                Upload the important circular here
              </p>
              <Button variant="danger" className="btn-md w-100 my-2" onClick={() => setNewsModalShow(true)}>
                Upload
              </Button>
            </div>
          </div>
          {/* Circular Modal */}
          <UploadModal show={newsModalShow} onHide={() => setNewsModalShow(false)} title="News"/>
        </div>

        

        {/* Similar code for Events and News cards and modals */}

      </div>
      </div>
    </div>
  );
};

export default Circular;
