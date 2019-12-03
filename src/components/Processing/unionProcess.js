import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createUnion(input, dist, toggleSnack) {
    console.log(input)
    try {
    //Extract all single features. Must be polygons
    var features = []
    input.forEach(param => {
        console.log(param)    
            param.layer.eachLayer(function (layer) {
                features.push(layer.feature)
            });
        });
    } catch {
        toggleSnack("Inputs are not valid...", "error")
        return
    }
    
    try {
    //Do the operations on all polygons
    var union = turf.union(...features)
    return union
    } catch {
        toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
        return null
    }
}
