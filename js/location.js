export const GEO = {
    options: {
        enableHighAccuracy: true, 
        maximumAge: 1000 * 60 * 5, 
        timeout:  20000,
    },
    change(accuracy, timeout, maximumAge){
        GEO.options.enableHighAccuracy = accuracy;
        GEO.options.maximumAge = maximumAge;
        GEO.options.timeout = timeout;
        console.log(timeout);
    },
    location(loadMap, failure) {
        if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadMap, failure, GEO.options)  
        } else {
            alert("Can not find your Location");
        } 
    },
}
