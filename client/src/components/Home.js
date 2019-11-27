import React, { useState } from "react";

import PLACES from "../data/places";
import AddPlace from "./AddPlace";
import Places from "./Places";

const Home = () => {
  const [places, setPlaces] = useState(PLACES);
  return (
    <>
      <AddPlace places={places} setPlaces={setPlaces}></AddPlace>
      <Places places={places} setPlaces={setPlaces}></Places>
    </>
  );
};

export default Home;
