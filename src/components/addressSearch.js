import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from 'react-bootstrap';

let autoComplete;

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
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const address = addressObject.formatted_address;
  updateQuery({ address });
  console.log(addressObject);
}

function AddressSearch({ address, setUserInput }) {
  // const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setUserInput, autoCompleteRef)
    );
  }, []);

  return (
    <TextField
      inputRef={autoCompleteRef}
      required
      id="outlined-required"
      label="Address"
      name="address"
      value={address}
      onChange={event => setUserInput({ address: event.target.value })}
      variant="outlined"
      margin="normal"
      size="small"
    />
  );
}

export default AddressSearch;