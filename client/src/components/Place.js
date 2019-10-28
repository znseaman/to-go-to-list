import React from "react";
import Map from "./Map";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

const Place = ({ place }) => {
  return (
    <div
      style={{
        width: "500px",
        height: "150px",
        margin: "auto",
        // flexbox the rest as well
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // styling
        border: "1px solid #333",
        padding: "1rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h3>{place.name}</h3>
        <p
          className="truncate-overflow"
          style={{
            maxWidth: "250px",
            // allow for appending "..." for text overflow
            position: "relative"
          }}
        >
          {place.description}
        </p>
      </div>
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
