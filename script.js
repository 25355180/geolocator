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