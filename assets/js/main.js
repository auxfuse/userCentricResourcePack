$(document).ready(function() {
  function getData(id) {
    fetch(`assets/data/${id}.json`)
      .then(res => res.json())
      .then(data => {
        generateHTML(id, data);
      });
  }

  getData("resources");

  function generateHTML(id, data) {
    data.forEach(element => {
      $(`#${id}-list`).append(generateContent(id, element));
    });
  }

  function generateContent(id, data) {
    switch (id) {
      case "resources":
        return resourcesMarkup(data);
      case "tools":
        return toolsMarkup(data);
      case "additonal":
        return additonalMarkup(data);
      case "quotes":
        return quotesMarkup(data);

      default:
        break;
    }
  }

  function resourcesMarkup(data) {
    return `
    <li class="resource-list-header">
      <a
        href="${data.url}"
        target="_blank"
        rel="noopener"
        aria-label="${data.name}"
      >
        ${data.name}
      </a>
      <p class="li-subtext">${data.content}</p>
    </li>`;
  }

  function toolsMarkup(data) {
    return `
    <div class="col-sm-12 col-md-6 col-lg-3">
    <div class="card">
        <div class="card-body">
            <a href="${data.url}" target="_blank" rel="noopener" aria-label="${data.name}">
                <h5 class="card-title">${data.name}</h5>
            </a>
                <p class="card-text">${data.content}</p>
        </div>
    </div>
    </div>`;
  }
  function additonalMarkup(data) {
    return `
    <li class="resource-list-header">
      <a
        href="${data.url}"
        target="_blank"
        rel="noopener"
        aria-label="${data.name}"
      >
        ${data.name}
      </a>
      <p class="li-subtext">${data.content}</p>
    </li>`;
  }
  function quotesMarkup(data) {
    return `
    <li class="resource-list-header">
      <a
        href="${data.url}"
        target="_blank"
        rel="noopener"
        aria-label="${data.name}"
      >
        ${data.name}
      </a>
      <p class="li-subtext">${data.content}</p>
    </li>`;
  }
});
