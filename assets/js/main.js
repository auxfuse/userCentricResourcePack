function getData(id) {
  fetch(`assets/data/${id}.json`)
    .then(res => res.json())
    .then(data => console.log(data));
}

getData("tools");


function generateHTML(id) {

}