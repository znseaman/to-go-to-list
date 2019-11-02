import React, { useState } from "react";
import { Form, Button, FormField } from "semantic-ui-react";
import v4 from "uuid/v4";

import PlacesContext from "../context/places-context";

const AddPlaceForm = () => {
  /* @TODO: try using lens & only 1 object for the form in useState */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "photo":
        setPhoto(value);
        break;
      case "latitude":
        /* @TODO: Add checks if number is actually possible to be a latitude */
        setLatitude(+value);
        break;
      case "longitude":
        /* @TODO: Add checks if number is actually possible to be a longitude */
        setLongitude(+value);
        break;
    }
  };

  const resetFields = () => {
    const value = "";
    setName(value);
    setDescription(value);
    setPhoto(value);
    setLatitude(value);
    setLongitude(value);
  };

  return (
    <PlacesContext.Consumer>
      {({ places, setPlaces }) => (
        <Form>
          <Form.Group widths="equal">
            <FormField
              label="Name"
              control="input"
              name="name"
              value={name}
              onChange={onChange}
            />
            <FormField
              label="Description"
              control="input"
              name="description"
              value={description}
              onChange={onChange}
            />
            <FormField
              label="Photo Url"
              control="input"
              name="photo"
              value={photo}
              onChange={onChange}
            />
            <FormField
              label="Latitude"
              control="input"
              name="latitude"
              value={latitude}
              onChange={onChange}
            />
            <FormField
              label="Longitude"
              control="input"
              name="longitude"
              value={longitude}
              onChange={onChange}
            />
            <Button
              onClick={e => {
                e.preventDefault();
                const hasImage = photo !== "";
                const newPlace = {
                  id: v4(),
                  name,
                  description,
                  photo,
                  hasImage,
                  latitude: latitude,
                  longitude: longitude
                };
                setPlaces([...places, newPlace]);
                resetFields();
              }}
              primary
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      )}
    </PlacesContext.Consumer>
  );
};

export default AddPlaceForm;
