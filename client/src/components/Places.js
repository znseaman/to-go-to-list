import React, { useState } from "react";
import Place from "./Place";
import Map from "./Map";
import { Marker } from "react-map-gl";
import Pin from "./Pin";
import PlacesContext from "../context/places-context";

const Places = () => {
  return (
    <PlacesContext.Consumer>
      {({ places, setPlaces }) => (
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
                    debugger;
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
      )}
    </PlacesContext.Consumer>
  );
};

export default Places;
