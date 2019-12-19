import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createIntersect(input, toggleSnack) {

    //Extract all single features. Must be polygons TODO: add a question if it is polygon or not:
    var features1 = []
    var features2 = []

    try {
    var pieces = []
    input[0].layer.eachLayer(layer => {    
        //Puts a minimal buffer around the feature to make a polygon of it. 
        //Turf requires polygons for the intersection operator.
        if ((layer.feature.geometry.type == "Polygon")) {
            features1.push(layer.feature)
        } else if (layer.feature.geometry.type == "MultiPolygon") {
            //split up multipolygon and add it to a a feature list.
            pieces.push(layer.feature.geometry.coordinates.map(c => turf.polygon(c)))

        } else {
            toggleSnack("...Invalid geometry-types!", "error")
            return null
        }
    });
    pieces.forEach((poly) => {
        features1.push(poly[0])
    })
    pieces = []

    input[1].layer.eachLayer(layer => {    
        //Puts a minimal buffer around the feature to make a polygon of it. 
        //Turf requires polygons for the intersection operator.
        if ((layer.feature.geometry.type == "Polygon") || (layer.feature.geometry.type == "MultiPolygon")) {
            features2.push(layer.feature)
        } else if (layer.feature.geometry.type == "MultiPolygon") {
            //split up multipolygon and add it to a a feature list.
            pieces.push(layer.feature.geometry.coordinates.map(c => turf.polygon(c)))

        } else {
            toggleSnack("...Invalid geometry-types!", "error")
            return null
        }
    });
    pieces.forEach((poly) => {
        features2.push(poly[0])
    })
    
    } catch {
        toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
    }

    //For all features, find the intersection with all features. Computationnally extremely costly.
    var intersections = []  
        try {
            features1.forEach(f2 => {
                features2.forEach(f1 => {
                    var conflict = null;
                    // try {
                    //     conflict = turf.intersect(f1,f2);
                    // } catch {
                        try {
                            conflict = turf.difference(f1, f2)
                            if(conflict == null) {

                                conflict = f1

                            } else {
                                conflict = turf.difference(f1, conflict)
                            }
                        } catch {
                        }
                    // }
                    if (conflict !== null) {
                        intersections.push(conflict);
                    }   
                })
            })
        } catch {
            toggleSnack("Could not generate the intersection. Contact your highest superior", "error")
            return null
        }
    // }
    



    let name = "new_"
    if (input[0].layer.name) {
        name = input[0].layer.name
    }

    var intersect = {
        "type": "FeatureCollection",
        "name": name + " intersection",
        "features": intersections,
    } 

    return intersect
}
