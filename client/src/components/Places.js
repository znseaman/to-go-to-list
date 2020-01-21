import React from "react";
import { Grid, Icon, Image, GridRow, GridColumn, Button } from "semantic-ui-react";
import Map from "./Map";
import { Popup, Marker } from "react-map-gl";
import Pin from "./Pin";
import { client } from "../Client";

const Places = ({ places, setPlaces }) => {
  const onClick = id => {
    const updatedPlaces = places.map(p => {
      if (p.id === id) {
        p.hasImage = !p.hasImage;
      }
      return p;
    });
    setPlaces(updatedPlaces);
  };

  const handleDelete = id => {
    return client.deletePlace(id)
      .then(({ data: id }) => {
        setPlaces(places.filter(p => p.id != id));
      });
  }

  const handleImgLoad = ({ target: img }, id) => {
    // add to places.dimensions = {height: img.offsetHeight, width: img.offsetWidth}
    const updatedPlaces = places.map(p => {
      if (p.id == id) {
        p.dimensions = {
          height: img.offsetHeight,
          width: img.offsetWidth
        }
      }
      return p;
    })
    setPlaces(updatedPlaces);
  }

  return (
    <Grid celled>
      {places.length > 0 && places.map(place => (
        <GridRow key={place.id}>
          <GridColumn width={6}>
            {place.hasImage ? (
              <Image
                src={place.photo}
                title={'Click to see the place on a map'}
                style={{ cursor: 'pointer' }}
                alt={`${place.name}`}
                onClick={() => onClick(place.id)}
                onLoad={e => handleImgLoad(e, place.id)}
              />
            ) : (
                <Map
                  width="auto"
                  height={place.dimensions && place.dimensions.height ? place.dimensions.height : 120}
                  center={[place.longitude, place.latitude]}
                  zoom={1}
                >
                  <Marker
                    key={place.id}
                    longitude={place.longitude}
                    latitude={place.latitude}
                  >
                    <Pin onClick={() => onClick(place.id)}></Pin>
                  </Marker>
                  <Popup
                    anchor="top"
                    longitude={place.longitude}
                    latitude={place.latitude}
                    closeButton={false}
                    closeOnClick={false}
                  >
                    <div>Click to see an image of the place</div>
                  </Popup>
                </Map>
              )}
          </GridColumn>
          <GridColumn width={10}>
            <h3>{place.name}</h3>
            <p
              className="truncate-overflow"
              style={{
                // allow for appending "..." for text overflow
                position: "relative",
                paddingRight: "15px"
              }}
            >
              {place.description}
            </p>
            <Button negative onClick={() => handleDelete(place.id)}><Icon name='trash' />Delete</Button>
          </GridColumn>
        </GridRow>
      ))}
    </Grid>
  );
};

export default Places;
