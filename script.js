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

  const jsonString = JSON.stringify(data, null, 2);

  try {
      const handle = await window.showSaveFilePicker({
          suggestedName: 'formData.json',
          types: [{
              description: 'JSON Files',
              accept: {'application/json': ['.json']}
          }]
      });

      const writable = await handle.createWritable();
      await writable.write(jsonString);
      await writable.close();

      document.getElementById("demo").innerHTML = `Data saved to formData.json`;
  } catch (error) {
      console.error('Error saving file:', error);
      document.getElementById("demo").innerHTML = `Error saving file: ${error.message}`;
  }
});

