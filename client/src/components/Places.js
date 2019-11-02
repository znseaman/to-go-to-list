import React from "react";
import { Grid, Image, GridRow, GridColumn } from "semantic-ui-react";

import Map from "./Map";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

const Places = ({ places, setPlaces }) => {
  const onClick = id => {
    const updatedPlaces = places.map(p => {
      if (p.id === id) {
        p.hasImage = !p.hasImage;
      }
      return p;
    });
    setPlaces(updatedPlaces);
  };

  return (
    <Grid celled>
      {places.map(place => (
        <GridRow>
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
          </GridColumn>
        </GridRow>
      ))}
    </Grid>
  );
};

export default Places;
