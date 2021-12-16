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
import { ControlCameraOutlined } from "@material-ui/icons";

const clientId =
  "1029189840786-4j07jl0eal7jusjrp4oaoic49ok9ujil.apps.googleusercontent.com";

function LoginHooks({ setSignedIn }) {
  let navigator = useNavigate();
  const cookie = new Cookies();
  
  const onSuccess = async res => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully! Welcome ${res.profileObj.givenName}`
    );
    let { email } = res.profileObj;
    cookie.set("email", email);
    setSignedIn(true);
    // Get user 
    let response = await axios.get(`https://kbjdvhv2je.execute-api.us-east-2.amazonaws.com/dev/login/users?email=${email}`);
    const userInfo = response.data;
    if (userInfo.data.length != 0) {
      console.log("user exist");
      cookie.set("userId", userInfo.data[0].user_id);
      const firstName = userInfo.data[0].first_name;
      const lastName = userInfo.data[0].last_name;
      const phone = userInfo.data[0].phone_number;
      // Get address info
      const addressId = userInfo.data[0].address_id;
      cookie.set("addressId", addressId);
      let response = await axios.get(`https://kbjdvhv2je.execute-api.us-east-2.amazonaws.com/dev/login/address/${addressId}`);
      const addressInfo = response.data.data;
      const address1 = addressInfo[0].street_line1;
      const address2 = addressInfo[0].street_line2;
      const city = addressInfo[0].city;
      const state = addressInfo[0].state;
      const zipcode = addressInfo[0].zipcode;
      cookie.set("user", {
                "phone": phone,
                "firstName": firstName,
                "lastName": lastName,
                "state": state,
                "city": city,
                "Country": "United States",
                "address1": address1,
                "address2": address2,
                "zipcode": zipcode,
        })
      navigator('/profile');
    }else{
      console.log("user not exist; redirect to /login");
      navigator('/login');
    }
  };

  const onFailure = res => {
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