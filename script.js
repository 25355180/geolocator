function convertToJson() {
  let form = document.getElementById("yourlocation");
  let formData = {};
  for (let i = 0; i < 3; i++) {
      let element = form.elements[i];
      if (element.type !== "submit") {
          formData[element.name] = element.value;
      }
  }
  let jsonData = JSON.stringify(formData);
  let jsonOutput = document.getElementById("jsonOutput");
  jsonOutput.innerHTML = "<pre>" + jsonData +"</pre>";
};
// function gets data from the yourlocation element then turns it to json
function getData() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    console.log(this.responseText); 
    const locations = JSON.parse(this.responseText);

    let output = ""; 
    locations.forEach(location => {
      output += location.name; 
      showPositions(location); 
    });//grabs data from the json file
  // tutorial from: https://www.w3schools.com/js/js_api_geolocation.asp
    document.getElementById("Output").innerHTML = output; 
    let index = 0; 
    function displayNext() {
      if (index < locations.length) {
        const location = locations[index];
        document.getElementById("Output").innerHTML = location.name + " "; 
        showPositions(location); 
        index++; 
      }
    }
    document.getElementById("Next").addEventListener("click", displayNext);
  };

  xmlhttp.open("GET", "json_locations.txt", true);
  xmlhttp.send();
}
//reads locations in json file and displays output when you press next


function showPositions(myObj) {
  if (myObj && myObj.latitude && myObj.longitude) {  
    let latitude = myObj.latitude;
    let longitude = myObj.longitude;
    document.getElementById("demo").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

    let mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(latitude, longitude),
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      icon: 'friend_icon.png',
      map: map
    });
    marker.setMap(map);
  }
}//positions markers on map based off of json file locations


document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const name = document.getElementById('name').value;
  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;
  const data = {
      name: name,
      latitude: latitude,
      longitude: longitude
  };

  const jsonString = JSON.stringify(data);
  localStorage.setItem('formData', jsonString);


  const storedData = JSON.parse(localStorage.getItem('formData'));
  document.getElementById("demo").innerHTML = `Name: ${storedData.name}, Latitude: ${storedData.latitude}, Longitude: ${storedData.longitude}`;
});
 //stores data