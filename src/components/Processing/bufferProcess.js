import * as turf from '@turf/turf';
import L from 'leaflet';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

export default function createBuffer(input, dist, toggleSnack) {
  


  toggleSnack("Validating input...", "info")
  try {
    var collection = {
      "type": "FeatureCollection",
      "features": [],
    } 

    input.layer.eachLayer(function (layer) {
      collection.features.push(layer.feature)
    });
    toggleSnack("Validation complete. Continuing with buffer-operation...", "info")
    
  } catch {
    toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
    return null
  }

  try {
    var buffered = turf.buffer(
      collection,
      dist,
      {units: "kilometers"},
    )
    buffered.name =  input.layer.name + " " + dist + "km_buffer"
    return buffered;
      
  } catch {

    toggleSnack("Could not generate the buffer. Contact your highest superior", "error")
    return null;
  }
}
