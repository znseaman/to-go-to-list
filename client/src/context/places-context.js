import { createContext } from "react";

const PlacesContext = createContext({
  places: [],
  setPlaces: () => {}
});
PlacesContext.displayName = "PlacesContext";

export default PlacesContext;
