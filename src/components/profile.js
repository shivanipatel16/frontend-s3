import React, { useEffect, useState } from "react";
import "./profile.css";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const cookie = new Cookies();
  const navigator = useNavigate();
  const [user, setUser] = useState({});
  const email = cookie.get("email");
  const {
    phone,
    firstName,
    lastName,
    state,
    city,
    address1,
    address2,
    zipcode
  } = user;

  useEffect(() => {
    async function getProfile() {
      console.log("profile component");
      console.log(cookie.get("user"));
      let { firstName, lastName, phone, address1, address2, zipcode, country, state, city } = cookie.get("user");
      console.log(cookie);
      setUser({
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        state: state,
        city: city,
        address1: address1,
        address2: address2,
        zipcode: zipcode,
      });
    }
    getProfile();
  }, [email]);



  const handleClick = () => {

    navigator('/login', { state: user });
  };

  const details = [
    {
      title: "First Name",
      value: firstName
    },
    {
      title: "Last Name",
      value: lastName
    },
    {
      title: "Phone Number",
      value: phone
    },
    {
      title: "Address 1",
      value: address1 
    },
    {
      title: "Address 2",
      value: address2 
    },
    {
      title: "City",
      value: city
    },
    {
      title: "State",
      value: state 
    },
    {
      title: "Zipcode",
      value: zipcode
    }

  ];
  return (
    <div className="formContainer">
      <h4>User Profile</h4>
      <div className="detailsWrapper">
        {details.map(item => (
          <div className="detail" key={item.title}>
            <div className="detailTitle">{item.title}</div>
            <div className="detailValue">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button className="cancelButton" onClick={handleClick}>
            <span className="buttonText">Edit</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;