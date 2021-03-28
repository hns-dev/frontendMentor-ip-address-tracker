
/* Set variables */
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const sumbmitBtn = document.querySelector('#submit-btn');

const currentIPAddress = document.querySelector('#ip-address');
const currentLocation = document.querySelector('#location');
const currentTimezone = document.querySelector('#timezone');
const currentISP = document.querySelector('#ISP');


const domainRegex = '^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$';
const ipRegex = '^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$';

let ipAddress = '', domain = '';



// Listen to form submission
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let searchParamater = searchInput.value;

    if (searchParamater.match(ipRegex)) {

        ipAddress = searchParamater;

    } else if (searchParamater.match(domainRegex)) {

        domain = searchParamater;

    }

    // Call fetch Api
    getInfos(ipAddress, domain)

});


/* Generate a map */



async function drawMap(lng = 77, lat = 41) {
    let key = await getMapboxMap()

    mapboxgl.accessToken = `${key}`;

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        maxZoom: 22,
        zoom: 11
        });
    
    // Create a div for the marker
    var el = document.createElement('div');
    el.className = 'marker';

    // Create marker & add it to the map
    var marker = new mapboxgl.Marker(el)
                    .setLngLat([lng, lat])
        .addTo(map);

    return map;
}

// Get mapbox access token
async function getMapboxMap() {
    const res = await fetch(`/.netlify/functions/get-mapbox-token`);
    const data = await res.json();

    return data;
}

// // Get IP info from API
async function getInfos(ipAddress, domain) {
    const res = await fetch(`/.netlify/functions/get-ipAddress-infos?ip=${ipAddress}&domain=${domain}`);
    const data = await res.json();

    const { ip, location: ipLocation, isp } = data
    
    updateInformation(ip, ipLocation, isp)

    drawMap(ipLocation.lng, ipLocation.lat)

    return data;
}


// Get user/visitor ip address
async function getUserIP(){

    const res = await fetch(`https://api.ipify.org?format=json`);
    const data = await res.json();
    
    return data
}

function updateInformation(ip, location, isp) {
    currentIPAddress.textContent = ip 
    currentLocation.textContent = `${location.country}, ${location.city} ${location.postalCode}`
    currentTimezone.textContent = location.timezone
    currentISP.textContent = isp
}

// Display user/visitor's IP address
async function DisplayUserIPInfo() {
    // Get user IP address
    const { ip: userIP } = await getUserIP();

    // Call fetch Api
    getInfos(userIP, '')
}

DisplayUserIPInfo()


// Map
/*

1 - get Mapbox Token     ==>  Fetch from netlify function
2 - Draw the map
        - set center
        - add marker

*/

// Display user ip address information
/*

1- get user ip address   ==> fetch from API
2- get ip infos          ==> fetch from ipify
3- update display infos
4- update location & marker on map

*/

// Display information from form input/submit
/*

1- get ip/domain         ==> from input vlaue
2- get ip infos          ==> fetch from ipify
3- update display infos
4- update location & marker on map

*/