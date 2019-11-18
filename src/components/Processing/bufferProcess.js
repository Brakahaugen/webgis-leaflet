import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createBuffer(input, dist) {


  
  //Creating a simple featurecollection in geojson,
  //and populating by the features from the leaflet layers.
  var collection = {
    "type": "FeatureCollection",
    "features": [],
  } 
  input.layer.eachLayer(function (layer) {
    collection.features.push(layer.feature)
  });
  console.log(input)
  console.log(collection)

  try {
    var buffered = turf.buffer(
      collection,
      dist,
      {units: "kilometers"},
    )
    console.log(JSON.stringify(buffered));
    return buffered;
    
  } catch {
    console.log("not today bro")
    return null;
  }

}
