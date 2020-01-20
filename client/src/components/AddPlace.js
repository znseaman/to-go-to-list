import React, { useState } from "react";
import { Form, Button, FormField } from "semantic-ui-react";
import { client } from "../Client";

const AddPlaceForm = ({ places, setPlaces }) => {
  /* @TODO: try using lens & only 1 object for the form in useState */
  const initialFormData = {
    name: "",
    description: "",
    photo: "",
    latitude: "",
    longitude: ""
  };
  const [formData, setFormData] = useState(initialFormData);

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "longitude":
      case "latitude":
        /* @TODO: Add checks if number is actually possible to be a latitude or longitude*/
        setFormData({
          ...formData,
          [name]: value
        });
        break;
      default:
        setFormData({
          ...formData,
          [name]: value
        });
        break;
    }
  };

  const onClick = e => {
    e.preventDefault();
    const hasImage = formData["photo"] !== "";
    const newPlace = {
      hasImage,
      ...formData
    };

    return client.createPlace(newPlace)
      .then(({ data: place }) => {
        setPlaces([place, ...places]);
        setFormData(initialFormData);
      })
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <FormField
          label="Name"
          control="input"
          name="name"
          value={formData["name"]}
          onChange={onChange}
        />
        <FormField
          label="Description"
          control="input"
          name="description"
          value={formData["description"]}
          onChange={onChange}
        />
        <FormField
          label="Photo Url"
          control="input"
          name="photo"
          value={formData["photo"]}
          onChange={onChange}
        />
        <FormField
          label="Latitude"
          control="input"
          name="latitude"
          value={formData["latitude"]}
          onChange={onChange}
        />
        <FormField
          label="Longitude"
          control="input"
          name="longitude"
          value={formData["longitude"]}
          onChange={onChange}
        />
        <Button onClick={onClick} primary>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddPlaceForm;
