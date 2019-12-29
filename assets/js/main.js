// Variables
const loadingSpinner = $(".loader");
const mainbody = $("main");
const assetsList = ["resources", "tools", "additional", "quotes"];

$(document).ready(function() {
  $("body").scrollspy({ target: "#navbar" });
  assetsList.forEach(item => getData(item));

  /**
   * This will fetch the correct data files from assets/data
   * This can be changed to fetch from a database at a later time
   * @param {string} id the id from assetsList
   */
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

/**
 * Will loop over the data append to the dom from the id.
 * @param {string} id from the assetsList
 * @param {Array} data - This is the fetched data
 */
function generateHTML(id, data) {
  data.forEach(element => {
    $(`#${id}-list`).append(generateContent(id, element));
  });
  mainbody.css("display", "block");
}

/**
 * Generates markup for resource json file
 * @param {Array} data Json data
 */
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

/**
 * Generates markup for tools json file
 * @param {Array} data Json data
 */
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

/**
 * Generates markup for additonal json file
 * @param {Array} data Json data
 */
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

/**
 * Generates markup for quotes json file
 * @param {Array} data Json data
 */
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

/**
 * Logic to find out what resource to be used.
 * @param {string} id from the assetsList
 * @param {Array} data - This is the fetched data
 * @fires The correct function depending on id
 */
function generateContent(id, data) {
  switch (id) {
    case "resources":
      return resourcesMarkup(data);
    case "tools":
      return toolsMarkup(data);
    case "additional":
      return additonalMarkup(data);
    case "quotes":
      return quotesMarkup(data);
    default:
      return;
  }
}
