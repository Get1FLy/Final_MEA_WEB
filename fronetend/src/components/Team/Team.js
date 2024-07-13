import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './team.css';
import user from '../images/user.jpg'
import loader from '../images/loader.gif'



const Team = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('All'); // Updated initial state
    const [isLoading, setIsLoading] = useState(true);
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







        const getTeamData = async () => {
            try {
                const timeout = setTimeout(() => {
                    setIsLoading(false);
                }, 1000);

                const res = await axios.get('http://localhost:4000/get_members');
                console.log(res.data);
                setMembers(res.data);
                setFilteredMembers(res.data); // Set filtered members to all members initially
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        getTeamData();
    }, []);

    const filterByBloodGroup = (bloodGroup) => {
        setSelectedBloodGroup(bloodGroup);
        if (bloodGroup === 'All') {
            setFilteredMembers(members);
        } else {
            const filtered = members.filter(member => member.blood_grp === bloodGroup);
            setFilteredMembers(filtered);
        }
    };

    return (
        <div className="my-3">
            {isLoading ?
                (
                    <div className='d-flex justify-content-center' style={{ marginTop: '50px' }}>

                        <div className="spinner-border text-danger" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>

                ) :
                (
                    <>
                        <div className="heading d-flex flex-column justify-content-center align-items-center mt-5 rounded-start-pill rounded-end-pill">
                            <h2 className='font-style-italic'>Meet Our Team</h2>
                            <p style={{ color: 'grey' }}>Meet our team of professionals to serve you...</p>
                            <nav className="navbar">
                                <div className="container-fluid">
                                    <form className="d-flex form-floating mb-0 my-0 gap-5" role="search">
                                        <select
                                            className="form-select"
                                            name="blood_grp"
                                            id="floatingBlood"
                                            aria-label="Select Blood Group"
                                            onChange={(e) => filterByBloodGroup(e.target.value)}
                                            value={selectedBloodGroup}
                                        >
                                            <option value="All">Select Blood Group</option>
                                            {bloodGroups.map((name, index) => (
                                                <option key={index} value={name}>{name}</option>
                                            ))}
                                        </select>
                                    </form>
                                </div>
                            </nav>
                        </div>

                        <div className='outer_team_card d-flex justfy-content-center align-items-center w-100'>
                            <div className="team_card">
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((data, i) => (
                                        <div className="card" style={{ width: "18rem" }} key={i}>
                                            <img
                                                className="card-img-top"
                                                src={data.img ? `http://localhost:4000/${data.img}` : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}
                                                alt={data.name}
                                                style={{ width: "100%", height: "190px" }}
                                            />
                                            <div className="card-body">
                                                {data.position || data.emp_name || data.blood_grp ? (
                                                    <>
                                                        <p style={{ color: 'gray' }}>({data.position})</p>
                                                        <p className="card-text"><span>{data.emp_name}</span></p>
                                                        <p style={{ color: 'gray' }}>Blood Group: {data.blood_grp}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p style={{ color: 'gray' }}>No Data Available</p>

                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No employees found.</p>
                                )}
                            </div>
                        </div>
                    </>
                )}


        </div>
    );
};

export default Team;
