function getData(id) {
  fetch(`assets/data/${id}.json`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      generateHTML(id, data);
    })
    .then(html => console.log(html));
}

getData("tools");

function generateHTML(id, data) {
  data.forEach(element => {
    $(`${id}-list`).append(generateContent(id, element));
  });
}

function generateContent(id, data) {
  switch (id) {
    case "resource":
      return ` <li class="resource-list-header"><a href="${data.url}" target="_blank" rel="noopener" aria-label="${data.name}">${data.name}</a>
    <p class="li-subtext">${data.context}</p>
</li>`;
    case "tools":
      return `
<div class="col-sm-12 col-md-6 col-lg-3">
<div class="card">
    <div class="card-body">
        <a href="${data.url}" target="_blank" rel="noopener" aria-label="${data.name}">
            <h5 class="card-title">${data.name}</h5>
        </a>
            <p class="card-text">${data.context}</p>
    </div>
</div>
</div>`;
    default:
      break;
  }
}
