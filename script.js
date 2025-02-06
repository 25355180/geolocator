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
}
// const xmlhttp = new XMLHttpRequest();
// xmlhttp.onload = function() {
//   const myObj = JSON.parse(this.responseText);
//   document.getElementById("Output").innerHTML = myObj.name;
// };
// xmlhttp.open("GET", "json_locations.txt");
// xmlhttp.send();



// const xmlhttp = new XMLHttpRequest();
// xmlhttp.onload = function() {
//   const myArr = JSON.parse(this.responseText);
//   document.getElementById("Output").innerHTML = myArr[0];
// }
// xmlhttp.open("GET", "json_locations.txt", true);
// xmlhttp.send();