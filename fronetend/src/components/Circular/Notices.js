import React from 'react'
import axios from 'axios'
import './viewcircular.css'
import { useEffect, useState } from 'react'
// import './Notices.css'
import CustomModal from './CustomModal'

const Notices = ({ user_type }) => {


    const [data, setData] = useState([]);
    const [eventdata, setEventData] = useState([]);
    const [newsdata, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedpath, setSelectedPath] = useState(null);
    const [id, setID] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {
        const getteamdata = async () => {
            try {

                const timeout = setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
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


    const openModal = (document, path, id, type) => {
        console.log("id is here:", id)
        console.log(document)
        setSelectedDocument(document);
        setSelectedPath(path);
        setID(id);
        setType(type)
    };

    const closeModal = () => {
        setSelectedDocument(null);
    };


    return (
        <div className='main_notice w-100'>
            <div className="d-flex justify-content-center align-items-center w-100">
                {
                    isLoading ? (
                        <div className='d-flex justify-content-center' style={{ marginTop: '50px' }}>

                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>

                    ) : (
                        <div className='outer_notice'>
                            <div className="heading text-center mt-5 rounded-start-pill rounded-end-pill">
                                <h3 className='font-style-italic' id="query_head">Notices</h3>
                                <p style={{ color: 'grey' }}>View uploaded notices to keep informed.</p>
                            </div>
                            <br />
                            <div className="view_data d-flex  gap-5 my-3 flex-wrap justify-content-center">


                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Circulars
                                            </button>
                                        </h2>
                                        {data.length > 0 ? (
                                            data.map((data, i) => (
                                                <div key={i} id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body d-flex align-items-center">
                                                        <div className="notice-item" onClick={() => openModal(data.name, data.file, data.event_id, data.id)}>
                                                            <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />
                                                            <strong>{data.name}</strong>
                                                            <p style={{ fontSize: '14px', margin: '0px 20px', color: 'grey' }}>(uploaded on {new Date(data.upload_date).toLocaleDateString('en-GB').replace(/\//g, '-')})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className="accordion-body d-flex align-items-center">
                                                    <div className="notice-item">
                                                        <strong>Not yet Posted</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div className="accordion" id="accordionTwoExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                Events
                                            </button>
                                        </h2>
                                        {eventdata.length > 0 ? (
                                            eventdata.map((data, i) => (
                                                <div key={i} id='collapseTwo' className="accordion-collapse collapse show" data-bs-parent="#accordionTwoExample">
                                                    <div className="accordion-body d-flex align-items-center">
                                                        <div className="notice-item" onClick={() => openModal(data.name, data.file, data.event_id, data.id)}>
                                                            <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />
                                                            <strong>{data.name}</strong>
                                                            <p style={{ fontSize: '14px', margin: '0px 20px', color: 'grey' }}>(uploaded on {new Date(data.upload_date).toLocaleDateString('en-GB').replace(/\//g, '-')})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className="accordion-body d-flex align-items-center">
                                                    <div className="notice-item">
                                                        <strong>Not yet Posted</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div className="accordion" id="accordionThreeExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                News
                                            </button>
                                        </h2>
                                        {newsdata.length > 0 ? (
                                            newsdata.map((data, i) => (
                                                <div key={i} id='collapseThree' className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body d-flex align-items-center">
                                                        <div className="notice-item" onClick={() => openModal(data.name, data.file, data.event_id, data.id)}>
                                                            <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />
                                                            <strong>{data.name}</strong>
                                                            <p style={{ fontSize: '14px', margin: '0px 20px', color: 'grey' }}>(uploaded on {new Date(data.upload_date).toLocaleDateString('en-GB').replace(/\//g, '-')})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionThreeExample">
                                                <div className="accordion-body d-flex align-items-center">
                                                    <div className="notice-item">
                                                        <strong>Not yet Posted</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

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
                    )
                }

            </div>


        </div>
    )
}

export default Notices
