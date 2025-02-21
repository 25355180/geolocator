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

function getData() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    console.log(this.responseText); 
    const myObj = JSON.parse(this.responseText);

    document.getElementById("Output").innerHTML = myObj.name;
    showPositions(myObj); 
  };
  xmlhttp.open("GET", "json_locations.txt", true);
  xmlhttp.send();
}

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
}


function sendData(){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    const myArr = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = myArr[0];
  }
  xmlhttp.open("GET", "json_demo_array.txt", true);
  xmlhttp.send();
};

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

  console.log(jsonString);
  fetch('https://example.com/save-data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: jsonString
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});
});
