import React from 'react'
import './herosection.css'

import img_1 from '../images/image_1.jpg'
import img_2 from '../images/image_2.jpg'
import img_3 from '../images/2.png'
import Team from '../Team/Team'
import NewTeam from '../Team/NewTeam'
import { useNavigate } from 'react-router-dom'

const HeroSection = ({user_type}) => {

    console.log("User type:",user_type)
    const navigate=useNavigate();


    const handle_edit_hero_img=()=>{
        navigate('/edit_hero_section')
    }
    return (
        
        <div className="main_section" style={{marginTop:'5rem'}}>
            <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 1" aria-current="true"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
                </div>
                <div class="carousel-inner mt-0">
                    <div class="carousel-item active">
                        <img class="bd-placeholder-img" src='https://static.virtubox.io/project/file/20220115-055210-iuyo-banner-1_jpeg-lowress.jpg' width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" style={{objectFit:'cover'}}></img>
                        <div class="container">
                            <div class="carousel-caption text-start">
                                {/* <h1>Example headline.</h1>
                                <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
                                <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p> */}
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                    <img class="bd-placeholder-img" src='https://5.imimg.com/data5/SELLER/Default/2021/6/AX/VV/PZ/9714292/government-events-services.jpg' width="100%" height="100%" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"></img>

                        <div class="container">
                            <div class="carousel-caption">
                                {/* <h1>Another example headline.</h1>
                                <p>Some representative placeholder content for the second slide of the carousel.</p>
                                <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p> */}
                            </div>
                        </div>
                    </div>
                   
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            {user_type == 1 ? ( <div className="edit_btns d-flex justify-content-center">
                <button className='btn btn-danger' onClick={handle_edit_hero_img}>Edit Images</button>
            </div>):(<></>)}
           
            <div className='mt-0'>
            <NewTeam/>
            </div>
        </div>
    )
}

export default HeroSection
