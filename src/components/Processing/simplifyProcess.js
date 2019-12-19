import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createSimplify(input, tol, toggleSnack) {

  try {
  //Creating a simple featurecollection in geojson,
  //and populating by the features from the leaflet layers.
  var collection = {
    "type": "FeatureCollection",
    "name": "simplified" + tol + input.layer.name,
    "features": [],
  } 
  input.layer.eachLayer(function (layer) {
    collection.features.push(layer.feature)
  });
  } catch {
    toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
  }

  try {
    var options = {tolerance: tol, highQuality: false};
    var simplified = turf.simplify(
      collection,
      options
    )
    return simplified;
    
  } catch {
    toggleSnack("Could not generate the simplified layer. Contact your highest superior", "error")
    return null;
  }
}
