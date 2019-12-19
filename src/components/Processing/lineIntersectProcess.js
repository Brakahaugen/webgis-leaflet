import * as turf from '@turf/turf';
import L from 'leaflet';


export default function createLineIntersect(input, clipFeature, toggleSnack) {

    try {
    //Extract all single features. Must be polygons TODO: add a question if it is polygon or not:
    var features1 = []
    var features2 = []

    input.layer.eachLayer(layer => {    
        features1.push(layer.feature)
        
    });
    clipFeature.layer.eachLayer(layer => {
        features2.push(layer.feature)
    });
    
    } catch {
        toggleSnack("something went wrong while loading the layers. Check your inputs before trying again...", "error")
    }
    
    try {
        var split = turf.lineSplit(features1, features2);
        split.name = input.name + " splitted lines"
        return split
        
    } catch {
        toggleSnack("Could not generate the intersection. Contact your highest superior", "error")
        return null
    }
}
