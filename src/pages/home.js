import React from 'react'
import boba from '../assets/boba.png'
const Home = () => {

    return (
        <div className="container-fluid header-color" id="aboutus">
            <div className="row justify-content-center">
                <div style={{padding: 50}}>
                    <p className="port-section black-text"> ABOUT US </p>
                    <p className="icon-body-text black-text">  MY NAME IS BOBA AND THIS IS MY SHOP! </p> 
                    <p className="icon-body-text black-text space-between-words"> GO PLACE ORDER NOW! </p>
                    <img src={boba} alt="boba" />;
                
                </div>
            </div>  
        </div>

)};

export default Home;