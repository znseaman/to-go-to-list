import React, { useState } from "react";
import v4 from "uuid/v4";
import PlacesContext from "../context/places-context";

const AddPlace = () => {
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
        setLatitude(+value);
        break;
      case "longitude":
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
        <form
          onSubmit={e => {
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
        >
          <label htmlFor="name">
            Name:
            <input name="name" type="text" value={name} onChange={onChange} />
          </label>
          <label htmlFor="description">
            Description:
            <input
              name="description"
              type="text"
              value={description}
              onChange={onChange}
            />
          </label>
          <label htmlFor="photo">
            Photo Url:
            <input name="photo" type="text" value={photo} onChange={onChange} />
          </label>
          <label htmlFor="latitude">
            Latitude:
            <input
              name="latitude"
              type="text"
              value={latitude}
              onChange={onChange}
            />
          </label>
          <label htmlFor="longitude">
            Longitude:
            <input
              name="longitude"
              type="text"
              value={longitude}
              onChange={onChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </PlacesContext.Consumer>
  );
};

export default AddPlace;
