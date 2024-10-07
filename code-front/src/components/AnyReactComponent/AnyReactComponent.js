import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: -23.557905141623863,
      lng: -46.66177155952076
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDTCuWftmwjekaIO18jxgqMfLDu0pVSdYM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        key={"AIzaSyDTCuWftmwjekaIO18jxgqMfLDu0pVSdYM"}        
      >
        <AnyReactComponent
          lat={-23.557905141623863}
          lng={-46.66177155952076}
          text="My Marker"
          key={"AIzaSyDTCuWftmwjekaIO18jxgqMfLDu0pVSdYM"}
        />
      </GoogleMapReact>
    </div>
  );
}


