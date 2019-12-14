const loadingSpinner = $("#loading-spinner");
const mainbody = $("main");
$(document).ready(function() {
  function getData(id) {
    $(mainbody).css("display", "none");
    $(loadinSpinner).css("display", "block");
    loadingSpinner.css();
    fetch(`assets/data/${id}.json`)
      .then(res => res.json())
      .then(data => {
        generateHTML(id, data);
      })
      .catch(error => console.log(error));
  }

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
        return;
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
    <li class="additional-list-header">
    <a
      href="${data.url}"
      target="_blank"
      rel="noopener"
      aria-label="${data.name}"
      >${data.name}</a
    >
    <p class="li-subtext">
      ${data.content}
    </p>
  </li>`;
  }
  function quotesMarkup(data) {
    return `
    <div class="col-sm-12 col-md-6 col-lg-3">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <p class="quote-owner">${data.name}</p>
        </div>
        <div class="flip-card-back">
          <p class="quote">${data.text}</p>
        </div>
      </div>
    </div>
  </div>`;
  }
  getData("resources");
  getData("tools");
  getData("additional");
  getData("quotes");
});
