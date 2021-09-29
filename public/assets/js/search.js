
function getFilters() {
    const cb = document.querySelectorAll('.location-checkbox');
    let locationsArr = [];
    for (var i = 0; i < cb.length; i++) {
        if (cb[i].checked) {
            console.log(cb[i])
            locationsArr.push(cb[i].value)
        }
    }
    selectedLocations = locationsArr.toString();

    const rbCategory = document.querySelectorAll('.category-radio');
    let selectedCategory = "";
    for (var i = 0; i < rbCategory.length; i++) {
        if (rbCategory[i].checked) {
            console.log(rbCategory[i])
            selectedCategory = rbCategory[i].value;
            break; // there is only one, since its a radio button
        }
    }

    const capacityEls = document.querySelectorAll('.capacity-radio');
    let selectedCapacity = "";
    for (var i = 0; i < capacityEls.length; i++) {
        if (capacityEls[i].checked) {
            console.log(capacityEls[i])
            selectedCapacity = capacityEls[i].value;
            break; // there is only one since its a radio button
        }
    }
    return [selectedLocations, selectedCategory, selectedCapacity];
}

function searchForVenues(event) {
    
    const [selectedLocations, selectedCategory, selectedCapacity] = getFilters();

    const params = new URLSearchParams();
    if (selectedLocations) {
        params.append("location", selectedLocations)
    }

    if (selectedCategory) {
        params.append("category", selectedCategory)
    }

    if (selectedCapacity) {
        params.append("capacity", selectedCapacity)
    }

    // const date = document.querySelector('#event-date');
    // if (date.value) {
    //     params.append("date", date.value)
    // }

    const query = document.querySelector('#search-query');
    if (query.value) {
        params.append("search_query", query.value)
    }

    if (params.toString()) {
        window.location.href = "/search?" + params.toString();
    }
}

function goToSingleVenue(id) {
    const date = document.querySelector('#event-date');

    if (date.value) {
        sessionStorage.setItem('event_date', date.value);
    } 

    window.location.href = "/venue/" + id;
}