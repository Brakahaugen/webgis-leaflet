import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createIntersect(input, dist, toggleSnack) {

    try {
    //Extract all single features. Must be polygons TODO: add a question if it is polygon or not:
    var features1 = []
    var features2 = []

    console.log(input)
    input[0].layer.eachLayer(layer => {    
        //Puts a minimal buffer around the feature to make a polygon of it. 
        //Turf requires polygons for the intersection operator.
        //features1.push(turf.buffer(layer.feature, 0.0001, {units: "kilometers"}))
        features1.push(layer.feature)
        
    });
    input[1].layer.eachLayer(layer => {    
        //Puts a minimal buffer around the feature to make a polygon of it. 
        //Turf requires polygons for the intersection operator.
        //features2.push(turf.buffer(layer.feature, 0.0001, {units: "kilometers"}))
        features2.push(layer.feature)
    });
    
    } catch {
        toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
    }
    
    try {
    //For all features, find the intersection with all features. Computationnally extremely costly.
    var intersections = []    
    features1.forEach(f1 => {
        features2.forEach(f2 => {
            var conflict = null;
            // try {
            //     conflict = turf.intersect(f1,f2);
            // } catch {
                try {
                    conflict = turf.difference(f1, turf.difference(f1, f2))
                } catch {
                }
            // }
            if (conflict !== null) {
                intersections.push(conflict);
            }   
        })
    })

    let name = "new_"
    if (input[0].layer.name) {
        name = input[0].layer.name
    }

    var intersect = {
        "type": "FeatureCollection",
        "name": name + " intersection",
        "features": intersections,
      } 

    console.log(intersections)
    console.log(intersect)
    return intersect
    
    } catch {
        toggleSnack("Could not generate the intersection. Contact your highest superior", "error")
        return null
    }
}
