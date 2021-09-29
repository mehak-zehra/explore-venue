function searchForVenues(event) {
    const params = new URLSearchParams();
    const query = document.querySelector('#search-query');
    if (query.value) {
        params.append("search_query", query.value)
    }
    
    const location = document.querySelector('#location-select');
    let locationText = location.options[location.selectedIndex].text;
    if(locationText && locationText !== "City") {
        params.append("location", locationText)
    }

    if (params.toString()) {
        window.location.href = "/search?" + params.toString();
    }
}

async function checkForReservations(e, venue_id) {
    if (e.target.value) {
        bookVenueEl = document.querySelector("#book-venue-btn")

        const response = await fetch('/api/reservation/available', {
            method: 'post',
            body: JSON.stringify({
                venue_id: venue_id,
                event_date: e.target.value
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status == 200) {
            bookVenueEl.innerHTML = "Booked"
            bookVenueEl.setAttribute("disabled", "disabled")
        } else if(response.status == 204) {
            bookVenueEl.removeAttribute("disabled")
            bookVenueEl.innerHTML = "Book Venue"
        } else {
            alert(response.statusText);
        }
    }
}