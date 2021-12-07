import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap'
import LoginHooks from './loginHooks';
import LogoutHooks from './logoutHooks';
import './header.css'
import SignUp from "../pages/signUpForm";
import Profile from "./profile";
import { useNavigate } from "react-router";

const Header = ({signedIn, setSignedIn}) => {
    console.log("Header");
    console.log(signedIn);
    let navigator = useNavigate();

    const redirectToProfile = () => {
        navigator('/profile')
      };
    const redirectToOrder = () => {
        navigator('/orders')
    }
    return (
        <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
            <div className="container-fluid">
                <Navbar.Brand href="/">Boba</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {signedIn ? (
                            <Nav>
                                <button onClick={redirectToProfile} className="lightButton" style={{marginRight:8}}>
                                    <span className="buttonText">Profile</span>
                                </button>
                                <button onClick={redirectToOrder} className="lightButton" style={{marginRight:27}}>
                                    <span className="buttonText">Orders</span>
                                </button>
                                <LogoutHooks setSignedIn={setSignedIn}/>
                            </Nav> 
                            ):(
                                <LoginHooks setSignedIn={setSignedIn}/>
                            )} 
                        <button  className="lightButton">
                            <span className="buttonText">About</span>
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>

    )}

export default Header