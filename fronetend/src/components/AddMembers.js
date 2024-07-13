import React, { useState } from 'react';
import './AddMembers.css'; // Styling for the form
import axios from 'axios';

const AddMembers = () => {

    const [selectimg, setSelectImg] = useState(null)
    const [formData, setFormData] = useState({
        image:null,
        name: '',
        position: '',
        bloodGroup: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
    
        try {
            console.log(formData);
            // Send the FormData object to the server
            axios.post('http://localhost:4000/add_members', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important: Set content type to multipart/form-data
                }
            })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // Assuming the server returns some data
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
        <div className="team_member d-flex justify-content-center">
        <div className="add-member-form-container">
            <form onSubmit={handleSubmit} className="add-member-form">
                <h3>Add Member</h3>
                <div className="form-floating mb-3 my-3">
                    <input
                        type="file"
                        accept="image/*"
                        name='image'
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
                    <label htmlFor="floatingName">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="form-control"
                        id="floatingPosition"
                        placeholder="Position"
                    />
                    <label htmlFor="floatingPosition">Position</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="form-control"
                        id="floatingBloodGroup"
                        placeholder="Blood Group"
                    />
                    <label htmlFor="floatingBloodGroup">Blood Group</label>
                </div>
                <button type="submit" className="btn btn-danger w-100 my-2">Add Member</button>
            </form>
        </div>
        </div>
    );
};

export default AddMembers;
