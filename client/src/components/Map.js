import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

class Map extends Component {
  state = {
    viewport: {
      width: 200,
      height: 150,
      latitude: this.props.center[1],
      longitude: this.props.center[0],
      zoom: 8
    },
    mounted: false
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { viewport, mounted } = this.state;
    const { REACT_APP_MAPBOX_ACCESS_TOKEN: TOKEN } = process.env;
    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => mounted && this.setState({ viewport })}
      >
        {this.props.children}
      </ReactMapGL>
    );
  }
}

export default Map;
