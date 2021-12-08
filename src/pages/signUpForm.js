import React, { useState, useReducer, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from "axios";


let autocomplete;
let address1Field;
let address2Field;
let postalField;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementById("autocomplete").appendChild(script);
};

function initAutocomplete() {
  address1Field = document.querySelector("#address1");
  address2Field = document.querySelector("#address2");
  postalField = document.querySelector("#zipcode");
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US
  autocomplete = new window.google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }
      case "route": {
        address1 += component.short_name;
        break;
      }
      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }
      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
        document.querySelector("#city").value = component.long_name;
        break;
      case "administrative_area_level_1": {
        document.querySelector("#state").value = component.short_name;
        break;
      }
    }
  }

  address1Field.value = address1;
  postalField.value = postcode;
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.focus();
}

const SignUp = ({ isNew }) => {
  const cookie = new Cookies();
  let navigator = useNavigate();
  const location = useLocation();
  const email = cookie.get("email");
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      phone: "",
      country: "United States",
      state: "",
      city: "",
      address1: "",
      address2: "",
      zipcode: "",
    }
  );

  const changeHandler = e => {
    const { name, value } = e.target;
    
    setUserInput({ [name]: value });
  };

  const submitHandler = async e => {
    let { firstName, lastName, phone, address1, address2, zipcode, country, state, city } = userInput;

    let addressInfo = {"street_line1": address1,
                      "street_line2": address2,
                      "city": city,
                      "State": state,
                      "country": country,
                      "zipcode": zipcode};

    let userInfo = {"first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "phone_number": phone,
                    "address": addressInfo};
    
    console.log(userInfo);
    console.log("Above is info");

    try {
      let userResponse, addressResponse, userData;
      // Info update
      if (location.state) {
        console.log("update");
        userData = {"first_name": firstName,
                      "last_name": lastName,
                      "phone_number": phone};

        userResponse = await axios.put(
          `http://18.222.24.97:5000/api/login/users?email=${email}`,
          userData
        );
        let addressId = cookie.get("user")["address_id"];
        addressResponse = await axios.put(`http://18.222.24.97:5000/api/login/address/${addressId}`,
          addressInfo
        );

      } else {
        // Create 
        console.log("created");
        userResponse = await axios.post(
          `http://18.222.24.97:5000/api/login/users/new`,
          userInfo
        );
      }
    } catch (err) {
      alert("Oops, something went wrong. Please try again later.")
      console.log(err);
    }

    e.preventDefault();
    cookie.set("user", userInput);
    console.log("Submitted");
    console.log(cookie.get("user"));
    navigator("/profile");
  };

  useEffect(() => {

    if (location.state){
      let { firstName, lastName, phone, address1, address2, zipcode, state, city } = location.state;
      setUserInput({
        phone,
        firstName,
        lastName,
        state,
        city,
        address1,
        address2,
        zipcode
      });
    
    }

  }, []);

  // useEffect(() => {
  //   loadScript(
  //     `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
  //     () => initAutocomplete()
  //   );
  // }, []);

return (
  <FormContainer>
    <h2>
      Your Basic Info
    </h2>
    <Form onSubmit={submitHandler}>
      <Form.Group className="my-3" controlId="firstName" id="autocomplete">
        <Form.Label>First Name*</Form.Label>
        <Form.Control type="text" required placeholder="Enter Your First Name" name="firstName" value={userInput.firstName} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="lastName">
        <Form.Label>Last Name*</Form.Label>
        <Form.Control type="text" required placeholder="Enter Your Last Name" name="lastName" value={userInput.lastName} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="phone">
        <Form.Label>Phone Number*</Form.Label>
        <Form.Control type="text" required placeholder="Ex: 123456789" name="phone" value={userInput.phone} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="address1">
        <Form.Label>Address 1*</Form.Label>
        <Form.Control type="text" required placeholder="Enter Your Address" name="address1" value={userInput.address1} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="address2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control type="text" required placeholder="Apartment, unit, suite, or floor #" name="address2" value={userInput.address2} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="city">
        <Form.Label>City*</Form.Label>
        <Form.Control type="text" required placeholder="Enter Your City" name="city" value={userInput.city} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="state">
        <Form.Label>State*</Form.Label>
        <Form.Control type="text" required placeholder="Enter Your State" name="state" value={userInput.state} onChange={changeHandler}/>
      </Form.Group>

      <Form.Group className="my-3" controlId="zipcode">
        <Form.Label>Zipcode*</Form.Label>
        <Form.Control type="text" required placeholder="Enter Your Zipcode" name="zipcode" value={userInput.zipcode} onChange={changeHandler}/>
      </Form.Group>

      <Button variant="primary" type="submit" className="btn btn-primary">
        Submit
      </Button>

    </Form>
  </FormContainer>
)};

export default SignUp;
