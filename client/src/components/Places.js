import React, { useState } from "react";
import PLACES from "../data/places";
import Place from "./Place";
import Map from "./Map";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

const Places = () => {
  const [places, setPlaces] = useState(PLACES);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      {places.map(place => (
        <Place key={place.id} place={place}>
          {place.hasImage ? (
            <img
              src={place.photo}
              alt=""
              style={{ width: 200, height: 150 }}
              onClick={() => {
                const updatedPlaces = places.map(p => {
                  if (p.id === place.id) {
                    p.hasImage = !p.hasImage;
                  }
                  return p;
                });
                setPlaces(updatedPlaces);
              }}
            />
          ) : (
            <Map center={[place.longitude, place.latitude]}>
              <Marker
                key={place.id}
                longitude={place.longitude}
                latitude={place.latitude}
              >
                <Pin
                  onClick={() => {
                    const updatedPlaces = places.map(p => {
                      if (p.id === place.id) {
                        p.hasImage = !p.hasImage;
                      }
                      return p;
                    });
                    setPlaces(updatedPlaces);
                  }}
                ></Pin>
              </Marker>
            </Map>
          )}
        </Place>
      ))}
    </div>
  );
};

export default Places;
