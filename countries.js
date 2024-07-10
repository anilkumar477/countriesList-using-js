let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchResultsEl = document.getElementById("searchResults");

let searchInputVal = "";
let countriesList = [];



function createAndAppendCountry(country){
    let countryContainer = document.createElement("div");
    countryContainer.classList.add("col-12","col-md-5","country-container","d-flex","flex-row","mr-auto","ml-auto");
    searchResultsEl.appendChild(countryContainer);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src=country.flag;
    countryFlagEl.classList.add("country-flag");
    countryContainer.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex","flex-column","ml-4");
    countryContainer.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population");
    countryPopulationEl.textContent = country.population;
    countryInfoEl.appendChild(countryPopulationEl);
}

function displaySearchResults(){
    searchResultsEl.textContent = "";
    for (let country of countriesList){
        let countryName = country.name;
        if(countryName.includes(searchInputVal)){
            createAndAppendCountry(country);
        }
    }
}
function getResults(){
    let url="https://apis.ccbp.in/countries-data";
    let options = {
        method:"GET"

    };
    spinnerEl.classList.remove("d-none");
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        spinnerEl.classList.add("d-none");
        countriesList = jsonData;
        displaySearchResults();
    });
}


function onChangeSearchInput(event){
    searchInputVal = event.target.value;
    displaySearchResults();
}

getResults();
searchInputEl.addEventListener("keyup",onChangeSearchInput);