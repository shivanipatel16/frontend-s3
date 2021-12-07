import React from "react";
import { useGoogleLogout } from "react-google-login";
import { Cookies } from "react-cookie";
import "./login.css";
import GoogleIcon from "../assets/google.svg"
import { useNavigate } from "react-router";


const clientId =
  "1029189840786-4j07jl0eal7jusjrp4oaoic49ok9ujil.apps.googleusercontent.com";

function LogoutHooks({ setSignedIn }) {
  const cookie = new Cookies();
  let navigator = useNavigate();
  const onLogoutSuccess = () => {
    console.log("Logged out succe1ssfully!");
    alert('Logged out Successfully!');
    cookie.remove("email");
    setSignedIn(false);
    navigator('/');
    
  };

  const onFailure = res => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. `);
  };

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId
  });

  return (
    <button onClick={signOut} className="button">
      <img src={GoogleIcon} alt="google login" className="icon"></img>

      <span className="buttonText">Logout</span>
    </button>
  );
}

export default LogoutHooks;