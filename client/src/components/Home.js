import React from "react";
import AddPlace from "./AddPlace";
import Places from "./Places";
import { client } from "../Client";

const Home = () => {
  const [places, setPlaces] = React.useState([]);
  const [token] = React.useState(client.token);

  React.useEffect(() => {
    client.getPlaces()
      .then(({ data }) => {
        setPlaces(data)
      })
      .catch(err => {
        console.error(err);
        setPlaces([]);
      });
  }, []);

  return (
    <>
      <AddPlace places={places} setPlaces={setPlaces}></AddPlace>
      <Places places={places} setPlaces={setPlaces} token={token}></Places>
    </>
  );
};

export default Home;
