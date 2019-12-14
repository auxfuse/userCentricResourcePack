const loadingSpinner = $(".loader");
const mainbody = $("main");
const assetsList = ["resources", "tools", "additional", "quotes"];

$(document).ready(function() {
  $("body").scrollspy({ target: "#navbar" });
  assetsList.forEach(item => getData(item));

  /**
   * Will loop over the data append to the list from the id.
   * @param {string} id
   * @param {Array} data - This is the JSON data
   */
  function generateHTML(id, data) {
    data.forEach(element => {
      $(`#${id}-list`).append(generateContent(id, element));
    });
    mainbody.css("display", "block");
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
          <p class="quote">${data.content}</p>
        </div>
      </div>
    </div>
  </div>`;
  }
  function getData(id) {
    mainbody.css("display", "none");
    fetch(`assets/data/${id}.json`)
      .then(res => res.json())
      .then(data => {
        generateHTML(id, data);
        loadingSpinner.css("display", "none");
      })
      .catch(error => console.log(error));
  }
});
