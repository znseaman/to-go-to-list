import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import PLACES from "../data/places";

import AddPlace from "./AddPlace";
import Menu from "./Menu";
import Places from "./Places";

function App() {
  const [places, setPlaces] = useState(PLACES);
  return (
    <>
      <Menu />
      <Container>
        <AddPlace places={places} setPlaces={setPlaces}></AddPlace>
        <Places places={places} setPlaces={setPlaces}></Places>
      </Container>
    </>
  );
}

export default App;
