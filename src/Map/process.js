import * as turf from '@turf/turf'

function process() {
    var dc = {
        type: 'Feature',
        properties: {},
        geometry: {
        type: 'LineString',
        coordinates: [
            [-77.031669, 38.878605],
            [-77.029609, 38.881946],
            [-77.020339, 38.884084],
            [-77.025661, 38.885821],
            [-77.021884, 38.889563],
            [-77.019824, 38.892368]
        ]
        }
    };
    
    var length = turf.length(dc, { units: 'miles' });
    console.log(length)
}

export default process;
