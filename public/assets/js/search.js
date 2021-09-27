function updateLocationFilter() {
    var loc = document.getElementById("location-filter").value;
    console.log(loc)
    if (loc !== "Location") {
        window.location.href="/search?location="+loc;  
    }
    
}