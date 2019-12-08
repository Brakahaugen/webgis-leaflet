import * as turf from '@turf/turf';
import createIntersect from './intersectProcess'
import L from 'leaflet';


export default function createDifference(input, toggleSnack) {
    console.log(input)
    try {

        var main = []
        var diff = []

        input[0].layer.eachLayer(function (layer) {
            if (layer.feature.geometry.type == "MultiPolygon") {
                main.push(layer.feature.geometry.coordinates.map(c => turf.polygon(c)))
            } 
            main.push(layer.feature)
        });
        input[1].layer.eachLayer(function (layer) {
            if (layer.feature.geometry.type == "MultiPolygon") {
                diff.push(layer.feature.geometry.coordinates.map(c => turf.polygon(c)))
            } 
            diff.push(layer.feature)
        });
        
    } catch {
        toggleSnack("Inputs are not valid...", "error")
        return
    }
    
    try {
    //Do the operations on all polygons
    console.log(main)
    console.log(diff)

    var difference = {
        "type": "FeatureCollection",
        "name": input[0].layer.name + "_diff_" + input[1].layer.name,
        "features": [],
      }


    main.forEach(poly => {

        var candidate = poly
        var anyLuck = false;

        diff.forEach(diffPoly => {
            var d = turf.difference(poly, diffPoly)
            if (d != null) {
                var intersection = turf.intersect(d, candidate);
                //if intersection led to results:
                if (intersection != null) {
                    candidate = intersection
                    anyLuck = true;
                }
            }
        })
        if (anyLuck) {
            difference.features.push(candidate)
        }
    })
    
    
    

    console.log(difference)

    toggleSnack("erased " + input[1].layer.name + " from " + input[0].layer.name, "success")
    return difference
    } catch {
        toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
        return null
    }
}
