import React from "react";
import axios from "axios";
import PLACES from "../data/places";
import AddPlace from "./AddPlace";
import Places from "./Places";
import { client } from "../Client";

const Home = () => {
  const [places, setPlaces] = React.useState([]);
  const [token] = React.useState(client.token);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/place/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.data)
      .then(({ data }) => {
        setPlaces(data)
      })
      .catch(err => {
        console.error(err);
        setPlaces([]);
      });
  }, [token])

  return (
    <>
      <AddPlace places={places} setPlaces={setPlaces} token={token}></AddPlace>
      <Places places={places} setPlaces={setPlaces} token={token}></Places>
    </>
  );
};

export default Home;
