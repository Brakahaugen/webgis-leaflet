import * as turf from '@turf/turf';
import L from 'leaflet';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { fail } from 'assert';
import intersectProcess from './intersectProcess'

export default function createClip(input, mask, toggleSnack) {
  
 
  toggleSnack("Validating input...", "info")
  try {
    var inputCollection = {
      "type": "FeatureCollection",
      "name":  input.layer.name + "_clipped",
      "features": [],
    }

    console.log(input)
    console.log(input.layer)
    var inputType;
    //parsing the input
    input.layer.eachLayer(function (layer) {
      inputType = layer.feature.geometry.type;
      console.log(layer)
      console.log(layer.feature.geometry.type)
      console.log(inputCollection)
      inputCollection.features.push(layer.feature)
      console.log(inputCollection)
    });
    console.log("Done with the inputs")
    //parsing the mask
    var clipMask = null

    console.log(clipMask)
    mask.layer.eachLayer(function (layer) {
      var inputType = layer.feature.geometry.type;
      console.log(layer)
      console.log(layer.feature.geometry.type)
      if ((inputType != "Polygon") && (inputType != "MultiPolygon")) {
        fail();
      }
      clipMask = layer.feature
    });



    toggleSnack("Validation complete. Continuing with buffer-operation...", "info")
    
  } catch {
    toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
    return null
  }

  //Starting with the process.
  if (inputType == "Point") {
    return turf.pointsWithinPolygon(inputCollection, clipMask);
  } else if ((inputType == "Polygon") || (inputType == "MultiPolygon")) {
    return intersectProcess([input, mask], toggleSnack)
  } else if (inputType == "LineString") {

    var splits = []
    //Split each line on intersections of a polygon
    //Splitt hver linje når den treffer et polygon:
    inputCollection.features.forEach((line) => {

      var split = turf.lineSplit(line, clipMask)

      //For each of these linesegments check if they are inside the polygon:  
      //For hvert linjesegment sjekk om den er innenfor eller utenfor polygonet ved bruk av punktene.
      split.features.forEach((lineSegment) => {
        var lineCoordinates = lineSegment.geometry.coordinates;
        var linePoint;

        //Hvis linjesegmentet er rett og kun definert av start og slutt, bruk midtpunkt av linjen
        if (lineCoordinates.length == 2 ) {
            linePoint = turf.center(lineSegment);         
            //Hvis ikke; sjekk om det 2 punktet som definerer linjen er innenfor.              
        } else {
            linePoint = turf.point(lineCoordinates[1]);
        }

        //Hvis punktet er innenfor polygonet returnerer det en liste større enn 0:
        if(turf.pointsWithinPolygon(linePoint, clipMask).features.length > 0) {
          //legger derfor til linjesegmentet som er innenfor polygonet.
            splits.push(lineSegment)
        }
      })
    })
    inputCollection.features = splits
    return inputCollection
  }

}