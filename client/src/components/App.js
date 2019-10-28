import React, { useState, createContext } from "react";
import "./App.css";
import Places from "./Places";
import AddPlace from "./AddPlace";
import PLACES from "../data/places";
import PlacesContext from "../context/places-context";

function App() {
  const [places, setPlaces] = useState(PLACES);
  return (
    <PlacesContext.Provider
      value={{
        places,
        setPlaces
      }}
    >
      <AddPlace></AddPlace>
      <Places></Places>
    </PlacesContext.Provider>
  );
}

export default App;
