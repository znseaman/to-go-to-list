import React from "react";
import { Grid, Icon, Image, GridRow, GridColumn, Button } from "semantic-ui-react";
import axios from "axios";
import Map from "./Map";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

const Places = ({ places, setPlaces, token }) => {
  const onClick = id => {
    const updatedPlaces = places.map(p => {
      if (p.id === id) {
        p.hasImage = !p.hasImage;
      }
      return p;
    });
    setPlaces(updatedPlaces);
  };

  const handleDelete = id => {
    return axios.delete(`http://localhost:3000/api/place/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.data)
      .then(({ data: id }) => {
        setPlaces(places.filter(p => p.id != id));
      });
  }

  return (
    <Grid celled>
      {places.length > 0 && places.map(place => (
        <GridRow key={place.id}>
          <GridColumn width={6}>
            {place.hasImage ? (
              <Image
                src={place.photo}
                alt={`${place.name}`}
                onClick={() => onClick(place.id)}
              />
            ) : (
                <Map
                  width="auto"
                  height={120}
                  center={[place.longitude, place.latitude]}
                  zoom={1}
                >
                  <Marker
                    key={place.id}
                    longitude={place.longitude}
                    latitude={place.latitude}
                  >
                    <Pin onClick={() => onClick(place.id)}></Pin>
                  </Marker>
                </Map>
              )}
          </GridColumn>
          <GridColumn width={10}>
            <h3>{place.name}</h3>
            <p
              className="truncate-overflow"
              style={{
                // allow for appending "..." for text overflow
                position: "relative",
                paddingRight: "15px"
              }}
            >
              {place.description}
            </p>
            <Button negative onClick={() => handleDelete(place.id)}><Icon name='trash' />Delete</Button>
          </GridColumn>
        </GridRow>
      ))}
    </Grid>
  );
};

export default Places;
