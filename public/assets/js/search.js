
 function applyFilters() {
    const cb = document.querySelectorAll('.location-checkbox');
    for(var i = 0; i< cb.length; i++){
         if(cb[i].checked){
             console.log(cb)
         }
    }
    //console.log(cb);

        // const btn = document.querySelector('#btn');
        // btn.onclick = () => {
        //     const result = cb.value;
        //     alert(result);
        // }
    // var loc = document.getElementById("location-filter").value;
    // console.log(loc)
    // if (loc !== "Location") {
        
    // }
    //window.location.href="/search?location=Fremont";  
 }