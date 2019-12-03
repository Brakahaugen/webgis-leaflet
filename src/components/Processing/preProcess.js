export default function preProcess(input, toggleSnack, datasetnum = 1) {
    
    if (datasetnum == 1) {
        toggleSnack("Preprocessing the dataset..." , "info")
    } else if (datasetnum == 2) {
        toggleSnack("Preprocessing the " + datasetnum + "nd dataset..." , "info")
    } else if (datasetnum == 3) {
        toggleSnack("Preprocessing the " + datasetnum + "rd dataset..." , "info")
    } else {
        toggleSnack("Preprocessing the " + datasetnum + "nd dataset..." , "info")
    }

    try {
        //Extract all single features. Must be polygons
        var features = []
        input.forEach(param => {    
                param.layer.eachLayer(function (layer) {
                    features.push(layer.feature)
                });
            });
            toggleSnack("Input layers are valid", "info")
        } catch {
            toggleSnack("Failed to extract features. Control the input layers before trying again.", "error")
    }
    var collection = {
        "type": "FeatureCollection",
        "features": features,
      } 

      return collection
}