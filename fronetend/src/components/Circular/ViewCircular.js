import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './viewcircular.css'
import CustomModal from './CustomModal'

const ViewCircular = ({user_type}) => {


    const [data, setData] = useState([]);
    const [eventdata, setEventData] = useState([]);
    const [newsdata, setNewsData] = useState([]);

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedpath,setSelectedPath] = useState(null);
    const [id,setID] = useState(null);
    const [type,setType]=useState(null);

    useEffect(() => {
        const getteamdata = async () => {
            try {
                const res = await axios.get('http://localhost:4000/get_circular_data');
                console.log(res.data);
                setData(res.data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }


            try {
                const res = await axios.get('http://localhost:4000/get_events_data');
                console.log(res.data);
                setEventData(res.data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }

            try {
                const res = await axios.get('http://localhost:4000/get_news_data');
                console.log(res.data);
                setNewsData(res.data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }

        };

        getteamdata();
    }, []);


    const openModal = (document,path,id,type) => {
        console.log(id)
        setSelectedDocument(document);
        setSelectedPath(path);
        setID(id);
        setType(type)
    };

    const closeModal = () => {
        setSelectedDocument(null);
    };


    return (
        <>

            <div className="container">

            <div className="heading d-flex flex-column justify-content-center align-items-center mt-5 rounded-start-pill rounded-end-pill">
                    <h2 className='font-style-italic'>Notices</h2>
                    <p style={{ color: 'grey' }}>View uploaded notices.</p>
                </div>

                <div className="view_data d-flex gap-5 justify-center">
                  

                <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" style={{width:'25rem'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <b>Circulars</b>
                                </button>
                            </h2>
                            {data.map((data, i) => (
                                <>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body d-flex align-items-center">
                                            <div className="notice-item" onClick={() => openModal(data.name,data.file,data.circular_id,data.id)} key={i}>
                                                <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />
                                                <strong>{data.name}</strong>
                                            </div>

                                            {/* <div>
                                                <li className='text-decoration-underline list-unstyled' style={{ color: "red" }}>Remove</li>
                                            </div> */}
                                        </div>




                                    </div>
                                    {/* <hr /> */}
                                </>
                            ))}
                        </div>

                    </div>

                    <div className="accordion" id="accordionTwoExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" style={{width:'25rem'}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                   <b> Events </b>
                                </button>
                            </h2>
                            {eventdata.map((data, i) => (
                                <>
                                    <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionTwoExample">
                                        <div className="accordion-body d-flex align-items-center">
                                            <div className="notice-item" onClick={() => openModal(data.name,data.file,data.event_id,data.id)} key={i}>
                                                <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />
                                                <strong>{data.name}</strong>
                                            </div>

                                            {/* <div>
                                                <li className='text-decoration-underline list-unstyled' style={{ color: "red" }}>Remove</li>
                                            </div> */}
                                        </div>




                                    </div>
                                    {/* <hr /> */}
                                </>
                            ))}
                        </div>

                    </div>

                    <div className="accordion" id="accordionThreeExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" style={{width:'25rem'}}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                    <b>News</b>
                                </button>
                            </h2>
                            {newsdata.map((data, i) => (
                                <>
                                    <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionThreeExample">
                                        <div className="accordion-body d-flex align-items-center">
                                            <div className="notice-item" onClick={() => openModal(data.name,data.file,data.news_id,data.id)} key={i}>
                                                <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />
                                                <strong>{data.name}</strong>
                                            </div>

                                            {/* <div>
                                                <li className='text-decoration-underline list-unstyled' style={{ color: "red" }}>Remove</li>
                                            </div> */}
                                        </div>




                                    </div>
                                    {/* <hr /> */}
                                </>
                            ))}
                        </div>

                    </div>
                </div>

                {selectedDocument && (
                <CustomModal
                    document={selectedDocument}
                    path={selectedpath}
                    id={id}
                    type={type}
                    user_type={user_type}
                    onClose={closeModal}
                />
            )}
            </div>

        </>
    )
}

export default ViewCircular
