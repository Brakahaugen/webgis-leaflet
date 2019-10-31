import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createBuffer(input) {

  // var rect = L.rectangle(bounds).toGeoJSON();
  // L.extend(rect.properties, {
  //     itemIndex: v.itemIndex
  // });

  var collection = {
    "type": "FeatureCollection",
    "features": []
  };

  var collection2 = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [10, 10]
        },
        "properties": {
          "name": "null island"
        }
      }
    ]
  }
  input.layer.eachLayer(function (layer) {
    console.log(layer)
    collection.features.push(layer.feature)
  });
  var point1 = turf.point([-73.988214, 40.749128]);
  console.log(collection)

// var buffered = turf.buffer(
//   collection,
//   0.1,
//   "kilometers"
// );


var buffered2 = turf.buffer(
  collection2,
  0.1,
  "kilometers"
)
console.log();
}