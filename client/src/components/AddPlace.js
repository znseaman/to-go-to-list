import React, { useState } from "react";
import { Form, Button, FormField, Search } from "semantic-ui-react";
import _ from "lodash";
import { client } from "../Client";

const { REACT_APP_MAPBOX_ACCESS_TOKEN: ACCESS_TOKEN } = process.env;

const AddPlaceForm = ({ places, setPlaces }) => {
  /* @TODO: try using lens & only 1 object for the form in useState */
  const initialFormData = {
    name: "",
    results: [],
    isLoading: false,
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

  const onResultSelect = (e, { result }) => {
    if (result.clickable == '') {
      e.preventDefault();
      return false;
    }
    const { title: name, center: [longitude, latitude] } = result;
    setFormData({ ...formData, name, longitude, latitude });
  }

  const handleSearchChange = async (e, { value }) => {
    setFormData({ ...formData, isLoading: true, name: value });

    if (value.length <= 1) {
      e.preventDefault();
      setFormData({ ...formData, isLoading: false, name: value });
      return false;
    }

    const source = await client.searchPlaceName(ACCESS_TOKEN)(value);

    // add `key` for React
    // add `title` for output in the list
    source.features = await source.features.map((f, i) => {
      f.key = i;
      f.title = f.place_name;
      return f;
    });

    await setFormData({
      ...formData,
      name: value,
      isLoading: false,
      results: [...source.features, { key: 9999, title: 'Powered by Mapbox', clickable: '' }],
    });
  }

  return (
    <Form>
      <Form.Group widths="equal">
        <div className="field">
          <label>Name</label>
          <Search
            icon=""
            loading={formData.isLoading}
            onResultSelect={onResultSelect}
            onSearchChange={_.throttle(handleSearchChange, 1000, {
              leading: true,
            })}
            minCharacters={1}
            results={formData.results}
            value={formData.name}
          />
        </div>
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
