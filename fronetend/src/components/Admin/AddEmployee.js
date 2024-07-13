import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    });

    
    
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('position', formData.position);
        formDataObj.append('password', formData.password);
        formDataObj.append('confirmPassword', formData.confirmPassword);
        console.log("Data to be send:",formData)
        try {
            axios.post('http://localhost:4000/add_employee', formData
               )
            .then(response => {
                console.log(response.data);
                alert(response.data.message)
                navigate('/')
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="team_member d-flex justify-content-center">
                <div className="add-member-form-container">
                    <form onSubmit={handleSubmit} className="add-member-form">
                        <h3>Add Employee</h3>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingName"
                                placeholder="Name"
                            />
                            <label htmlFor="floatingName">Employee ID</label>
                        </div>
                      
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                id="floatingConfirmPassword"
                                placeholder="Confirm Password"
                            />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>
                        <button type="submit" className="btn btn-danger w-100 my-2">Add Member</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
