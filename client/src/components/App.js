import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import PLACES from "../data/places";
import PlacesContext from "../context/places-context";

import AddPlace from "./AddPlace";
import Menu from "./Menu";
import Places from "./Places";

function App() {
  const [places, setPlaces] = useState(PLACES);
  return (
    <>
      <Menu />
      <Container>
        <PlacesContext.Provider
          value={{
            places,
            setPlaces
          }}
        >
          <AddPlace></AddPlace>
          <Places></Places>
        </PlacesContext.Provider>
      </Container>
    </>
  );
}

export default App;
