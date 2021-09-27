function updateLocationFilter() {
    var loc = document.getElementById("location-filter").value;
    window.location.href="/search?location="+loc;  
}