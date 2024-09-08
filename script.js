const search = document.querySelector("input");
const form = document.querySelector("form");
const searchResults = document.querySelector(".results"); // Corrected selector
const errorMsg = document.querySelector(".alert-alert-danger"); // Corrected selector
const line = document.querySelector("hr");
const apiURL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;
  if (searchValue === "") {
    errorMessage(
      "Search cannot find anything, please search for another topic."
    );
  } else {
    getResult(searchValue);
  }
});

function errorMessage(msg) {
  errorMsg.style.display = "block";
  line.style.display = "block";
  errorMsg.textContent = msg;
}

async function getResult(searchVal) {
  const response = await fetch(apiURL + searchVal);
  const results = await response.json();

  console.log(results);
  if (results.query.search.length === 0) {
    return errorMessage("Invalid search, please enter another search term.");
  } else {
    displayResults(results); // Corrected function call
  }
}

function displayResults(results) {
  line.style.display = "block";
  let output = "";
  results.query.search.forEach((result) => {
    let resultURL = `https://www.wikipedia.org/?curid=${result.pageid}`;
    output += `
      <div class="result p-2">
        <a href="${resultURL}" class="h3 fw-bold" target="_blank" rel="noopener">
          ${result.title}
        </a>
        <br />
        <a
          href="${resultURL}"
          class="fs-5 text-success"
          target="_blank"
          rel="noopener">
          ${resultURL}
        </a>
        <p class="fs-5">
          ${result.snippet}
        </p>
      </div>
    `;
  });
  searchResults.innerHTML = output; // Moved outside the loop
}
