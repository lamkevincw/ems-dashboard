import React, { useState, useRef } from 'react';

function MapWrapper(props) {

  // set intial state - used to track references to OpenLayers 
  //  objects for use in hooks, event handlers, etc.
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()

  // get ref to div element - OpenLayers will render into this div
  const mapElement = useRef()
  
  return (
    <div ref={mapElement} className="map-container"></div>
  )

}

export default MapWrapper