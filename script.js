function geocodeLatLng(geocoder, map, infowindow) {
  const input = document.getElementById("latlng").value;
  const latlngStr = input.split(",", 2);
  const latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };
}

const x = document.getElementById("demo");

function getLocation() {
try {
    navigator.geolocation.getCurrentPosition(showPosition);
} catch {
    x.innerHTML = err;
}
}

function showPosition(position) {
x.innerHTML = "Latitude: " + position.coords.latitude + 
"<br>Longitude: " + position.coords.longitude;
}

function initMap() {
  // Create a map object centered at a specific location
  var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.508742, lng: -0.120850 }, // Example coordinates
      zoom: 10
  });
  
  // Create a marker object
  var marker = new google.maps.Marker({
      position: { lat: 51.508742, lng: -0.120850 }, // Same coordinates as the map center
      map: map,
  });
}