import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './details.css'



const EmpDetails = ({ user_id, handleLogout }) => {
    const [formData, setFormData] = useState({
        user_id: user_id,
        name: '',
        mid_name: '',
        last_name: '',
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

    console.log("Here is my ID : ", user_id)

    const startYear = 1900;
    const endYear = new Date().getFullYear();
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);


    const [dept, setDept] = useState([])

    const bloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
    ];


    useEffect(() => {

        const getdepart = async () => {
            try {
                const res = await axios.get('http://localhost:4000/get_department')
                console.log(res.data)
                setDept(res.data);
            } catch (error) {
                console.log(error)
            }

        }
        getdepart()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        // setSelectImg(e.target.files[0]);
        console.log("Selected img: ",e.target.files[0])
        setFormData({ image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            console.log("Data to be sent:", formData);
            axios.post(`http://localhost:4000/update_userdetails/${user_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        alert(response.data.message); // Display success message
                        handleLogout();
                    } else if (response.status === 400) {
                        alert(response.data.error); // Display validation error message
                    } else {
                        alert("An error occurred while updating user details."); // Display generic error message for other status codes
                    }
                })
                .catch(error => {
                    console.error('Error:', error);

                    if (error.response && error.response.status === 400) {
        alert(error.response.data.error); // Display validation error message
    } else {
        alert("An error occurred while updating user details."); // Display generic error message for other status codes
    }
                });
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while updating user details.");
        }
    };




    return (
        <>
            <div className="details_main d-flex justify-content-center">
                <div className="add-member-form-container">
                    <form onSubmit={handleSubmit} className="add-member-form">
                        <h3>Fill the Details</h3>
                        <hr />

                        <div className="details_card">
                            <div className="form-floating mb-3 my-1">
                                <p>*Upload the Profile Photo (Background Removed)</p>
                                <p></p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name='image'
                                    onChange={handleImageChange}
                                    className="input-field"
                                    style={{color:'rgb(7,7,50)'}}
                                />
                            </div>
                        </div>

                        <p><b>Personal Details:</b></p>
                        <div className='details_card'>


                            <div className="form-floating mb-3 my-0">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="floatingName"
                                    placeholder="Name"
                                />
                                <label htmlFor="floatingName"> First Name</label>
                            </div>

                            <div className="form-floating mb-3 my-0">
                                <input
                                    type="text"
                                    name="mid_name"
                                    value={formData.mid_name}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="floatingName"
                                    placeholder="Name"
                                />
                                <label htmlFor="floatingName"> Middle Name</label>
                            </div>

                            <div className="form-floating mb-3 my-0">
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="floatingName"
                                    placeholder="Name"
                                />
                                <label htmlFor="floatingName"> Last Name</label>
                            </div>

                            <div className="form-floating mb-3 my-0">
                                <select class="form-select" name="year_of_joining" id="floatingYear" onChange={handleChange} aria-label="Default select example">

                                    {/* <option defaultValue={true}>--Year Of Joining--</option> */}

                                    {years.map((year) => (
                                        <option value={year}>{year}</option>

                                    ))}

                                </select>
                                <label htmlFor="floatingYear">Year Of Joining</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="year"
                                />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="floatingAddress"
                                    placeholder='floatingAddress'

                                />
                                <label htmlFor="floatingAddress">Residental Address</label>
                            </div>
                            <div className="form-floating mb-3 my-2">
                                <select class="form-select" name="dept_id" onChange={handleChange} id="floatingDept" aria-label="Default select example">
                                    <option defaultValue={true}>--Select Department--</option>

                                    {dept.map((data) => (
                                        <option value={data.dept_id}>{data.dept_name}</option>

                                    ))}


                                </select>
                                <label htmlFor="floatingDept">Department</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="form-control"
                                    id="floatingPosition"
                                    placeholder="Password"
                                />
                                <label htmlFor="floatingPosition">Position</label>
                            </div>

                            <div className="form-floating mb-3 my-0">
                                <select class="form-select" name="blood_grp" id="floatingBlood" onChange={handleChange} aria-label="Default select example">

                                    {/* <option defaultValue={true}>--Year Of Joining--</option> */}

                                    {bloodGroups.map((name) => (
                                        <option value={name}>{name}</option>

                                    ))}

                                </select>
                                <label htmlFor="floatingBlood">Year Of Joining</label>
                            </div>
                        </div>
                        <br />
                        <p><b>Password:</b></p>

                        <div className="details_card">

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


                            {/* <button type="submit" className="btn btn-secondary  my-2">Back</button> */}
                        </div>
                        <div className='form_sub_btn d-flex gap-5'>


                            <button type="submit" className="btn btn-danger my-2">Submit</button>
                            <button type="submit" className="btn btn-secondary my-2">Back</button>
                        </div>

                    </form>

                </div>


            </div>
        </>
    );
};

export default EmpDetails;
