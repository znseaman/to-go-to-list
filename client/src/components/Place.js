import React from "react";
import Map from "./Map";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

const Place = ({ place }) => {
  return (
    <div>
      <h2>{place.name}</h2>
      <Map center={[place.longitude, place.latitude]}>
        <Marker
          key={place.id}
          longitude={place.longitude}
          latitude={place.latitude}
        >
          <Pin onClick={() => console.log(`${place.name} was clicked!`)}></Pin>
        </Marker>
      </Map>
    </div>
  );
};

export default Place;
