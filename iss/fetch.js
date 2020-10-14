let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000 // 10000 = 10 seconds for our set interval function
let maxFailedAttempts = 3
let issMarker

let icon = L.icon({
    iconUrl: 'noun_iss_956251.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25] // Where the icon displays relative to the acutal point on the map
})

// Grab the div of where we want the map, dont need a #. Center map view at 0,0 with a zoom level of 1
let map = L.map('iss-map').setView([0,0], 1)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Call function one time to start
iss(maxFailedAttempts) 
// We'll call our ISS function using setInterval
// setInterval(iss, update) 

// We need to make a request to the ISS API every 10 seconds, that's why we have it in a function
function iss(attempts) { // Modified our function to take a parameter attempts, every time there is an error...
    
    if (attempts <= 0 ) {
        alert('Failed to contact the ISS Server after several attempts')
        return
    }
    
    // fetch(url).then( res => res.json() )

    // OR

    // This is the fetch method call. It expects one arguement the url
    // Returns something called a promise, a JavaScript object which will be fufilled or rejected
    // Add a then chain on the function call which returns a response from the server
    fetch(url).then( (res) => {
        // json another JavaScript method 
        return res.json() // process response into JSON
    // Once the above is done then we process our JSON response
    }).then( (issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
        
        // Create marker if it doesn't exist
        // Move marker if it does exist
        if (!issMarker) {
            // Create marker
            issMarker = L.marker([lat, long], {icon: icon} ).addTo(map) // set what the issMarker is above, where marker is, is the array of lat, long
        } else { // else we can move the marker
            issMarker.setLatLng([lat, long])
        }

        let now = Date() // set a variable equal to date so we can use it later
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}` // From our div paragraph tag id, put this statement into it

    }).catch( (err) => {
        attempts = attempts - 1 // When there is an error subtract 1 from the number of attempts
        // or attempts--
        console.log('ERROR!', err)
    }).finally( () => {
        setTimeout(iss, update, attempts) // Update is ten seconds remember, updates 10 seconds after the last request is done to not annoy the API server as much
        // list any parameters in setTimeout
    })
}