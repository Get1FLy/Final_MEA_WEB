import { React, useState, useRef, useEffect } from 'react';
import '../EditHeroSection/edithero.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Skeleton } from '@mui/material';

import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

import axios from 'axios';

const EditHeroSection = ({ token }) => {
    const [img, setImg] = useState(false);
    const fileInputRef = useRef(null);
    const uploadimg = useRef(null);
    const [editimg, setEditImg] = useState('');
    const [imgid, setImgID] = useState(0);
    const [finalimg, setFinalImg] = useState('');
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(false);

    const [visible, { toggle }] = useDisclosure(false);

    useEffect(() => {

        console.log("Token found:", token);

        const getImages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/get_herosection`);
                if (response.status === 200) {
                    setImages(response.data);
                    setLoader(true)
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        getImages();
    }, []);

    const handle_add_img = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', finalimg);

        try {
            const response = await axios.post(`http://localhost:4000/add_hero_img`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert("Photo Added Successfully!!");
                window.location.reload();
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg(URL.createObjectURL(file));
            setFinalImg(file);
        }
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(`http://localhost:4000/edit_hero_img/${imgid}`, formData);
                if (response.status === 200) {
                    alert("Photo updated Successfully!!");
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleCancel = () => {
        setImg(false);
    };

    const handleUpdateImg = (id) => {
        uploadimg.current.click();
        setImgID(id);
    };

    return (
        <>
            {
                loader ? (
                    <div className='main_notice w-100'>
                        <div className='outer_notice'>
                            <div className="heading text-center mt-5 rounded-start-pill rounded-end-pill">
                                <h3 className='font-style-italic' id="query_head">Edit Images</h3>
                                <p style={{ color: 'grey' }}>View uploaded notices to keep informed.</p>
                            </div>
                            <br />
                            <div className="view_data d-flex gap-5 my-3 flex-wrap justify-content-center">
                                <div className="view_hero_imgs">
                                    {images.map((data) => (
                                        <div className="hero_img_card" key={data.id}>
                                            <img
                                                src={data.img ? `http://localhost:4000/${data.img}` : 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}
                                                width="100%"
                                                height="100%"
                                                aria-hidden="true"
                                                preserveAspectRatio="xMidYMid slice"
                                                focusable="false"
                                            />
                                            <div>
                                                <p className='text-center mt-2' style={{ fontSize: '13px' }}>Page-{data.id + 1}</p>
                                            </div>
                                            <div className="overlay">
                                                <CloudUploadIcon className="overlay-icon" onClick={() => handleUpdateImg(data.id)} />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={uploadimg}
                                                    style={{ display: 'none' }}
                                                    onChange={uploadImage}
                                                />
                                                <DeleteIcon className="overlay-icon" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div className="add_hero_imgs">
                                <div className="heading text-center mt-5 rounded-start-pill rounded-end-pill">
                                    <h3 className='font-style-italic' id="query_head">Add New Images</h3>
                                    <p style={{ color: 'grey' }}>Add new images here.</p>
                                </div>
                                <div className="add_hero_section">
                                    <div className="add_img_card" onClick={handle_add_img}>
                                        <AddBoxIcon sx={{ fontSize: 40 }} />
                                    </div>
                                    {img && (
                                        <div className="added_img_card">
                                            <img
                                                src={img}
                                                width="100%"
                                                height="100%"
                                                aria-hidden="true"
                                                preserveAspectRatio="xMidYMid slice"
                                                focusable="false"
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="add_img_btn">
                                    <button className='btn btn-danger' onClick={handleSubmit}>Add Image</button>
                                    {img && (
                                        <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='skeleton'>
                            <Skeleton height={50} circle mb="xl" />
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton height={80} mt={6} width="70%" radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton height={80} mt={6} width="70%" radius="xl" />
                            <Skeleton height={80} mt={6} width="70%" radius="xl" />
                            <Skeleton height={50} circle mb="xl" />

                        </div>
                        
                    </>
                )
            }
        </>

    );
}

export default EditHeroSection;
