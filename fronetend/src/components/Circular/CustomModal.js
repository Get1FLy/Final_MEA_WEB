import React from 'react';
import axios from 'axios';


const CustomModal = ({ document, path,id,type,user_type,onClose }) => {

  const handleremove=()=>{
    console.log("Selected doc: ","ID : ",id,"Type:",type,"path:",path)

    if(type==1) {
    try {
      axios.post(`http://localhost:4000/remove_circular/${id}/${type}`)
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
        alert(response.data.msg) 
        window.location.reload()// Assuming the server returns some data
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
    } catch (error) {
      console.log(error)
    }
    }

    else if(type==2) {

      try {
        axios.post(`http://localhost:4000/remove_event/${id}/${type}`)
        .then(response => {
          // Handle the response from the server
          console.log(response.data);
          alert(response.data.msg) // Assuming the server returns some data
      })
      .catch(error => {
          // Handle any errors
          console.error('Error:', error);
      });
      } catch (error) {
        console.log(error)
      }

    }
    else if(type==3) {

      try {
        axios.post(`http://localhost:4000/remove_news/${id}/${type}`)
        .then(response => {
          // Handle the response from the server
          console.log(response.data); 
          alert(response.data.msg)// Assuming the server returns some data
      })
      .catch(error => {
          // Handle any errors
          console.error('Error:', error);
      });
      } catch (error) {
        console.log(error)
      }
    

    }
    else{
      alert("Something went wrong")
    }
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block',width:'100%',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View {document}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <embed src={`http://localhost:4000/${path}`} type="application/pdf" width="100%" height="500px" />
          </div>
          <div className='d-flex flex-start justify-center'>
          <div className="modal-footer w-100">
            {
              user_type==1 ? (
                <button type="button" className="btn btn-danger" onClick={handleremove}>Delete</button>

              ):(<></>)
            }
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
