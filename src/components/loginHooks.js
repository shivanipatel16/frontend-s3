import React from "react";
import { useGoogleLogin } from "react-google-login";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";
import GoogleIcon from "../assets/google.svg"
import SignUp from "../pages/signUpForm";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "1029189840786-4j07jl0eal7jusjrp4oaoic49ok9ujil.apps.googleusercontent.com";

function LoginHooks({ setSignedIn }) {
  let navigator = useNavigate();
  const cookie = new Cookies();
  console.log("Login hooks");
  
  const onSuccess = async res => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully! Welcome ${res.profileObj.givenName}`
    );

    let {email, familyName, givenName} = res.profileObj;
    cookie.set("email", email);
    setSignedIn(true);
    // Get user 
    console.log(`http://18.222.24.97:5000/api/login/users?email=${email}`);
    console.log("request url");
    let response = await axios.get(`http://18.222.24.97:5000/api/login/users?email=${email}`);
    console.log(response);
    const { userInfo = [] } = response;
    console.log(userInfo);
    console.log(userInfo.length);
    console.log("above is userInfo");
    if (userInfo.length != 0) {
      console.log("User exists");
      cookie.set("user", userInfo.get("data"));
      navigator('/');
    }else{
      console.log("User not exists");
      navigator('/login');
    }
  };

  const onFailure = res => {
    console.log("on fail");
    console.log("Login failed: res:", res);
    alert(`Failed to login. `);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true
  });

  return (
    <button onClick={signIn} className="button">
      <img src={GoogleIcon} alt="google login" className="icon"></img>
      <span className="buttonText">Login</span>
    </button>
  );
}




export default LoginHooks;