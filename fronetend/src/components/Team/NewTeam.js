
import './newteam.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useScroll } from "framer-motion"

import person from '../images/person.png'

const NewTeam = () => {

    const { scrollYProgress } = useScroll();


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

        <>

            <div className="outer_team_section">
                <div className="team_section">

                    <div className="heading d-flex flex-column justify-content-center align-items-center rounded-start-pill rounded-end-pill" style={{ marginTop: '50px' }}>
                        <motion.div style={{ scaleX: scrollYProgress }} />

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
                    <div className="just_one d-flex align-items-center justify-content-center">
                        <div className="main_outer">
                            <div className="outer_card">
                             

                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((data, i) => (
                                        <div className="outer_team" key={i}>
                                            <div className="back_square"></div>

                                            <div className="mem_img">
                                                <img src={data.img ? `http://localhost:4000/${data.img}` : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}
                                                />
                                                <div className="text mt-2">
                                                    <h4>{data.first_name} {data.last_name}</h4>
                                                    <p>{data.position} ({data.blood_grp}ve)</p>
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No employees found.</p>
                                )}

                              

                            </div>

                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}

export default NewTeam
