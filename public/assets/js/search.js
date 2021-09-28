
 function applyFilters() {
    const cb = document.querySelectorAll('.location-checkbox');
    const rbCategory = document.querySelectorAll('.category-radio');
    const rb_2 = document.querySelectorAll('.')
    for(var i = 0; i< cb.length; i++){
         if(cb[i].checked){
             console.log(cb)
         }
    }
    for(var i = 0; i <rbCategory.length; i++) {
        if(rbCategory[i].checked){
            console.log(rbCategory)
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