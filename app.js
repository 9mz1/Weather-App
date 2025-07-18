const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");
const settingsMenu = document.querySelector(".settings-menu");
const settingsBtn = document.querySelector("#settings-btn");
const closeBtn = document.querySelector("#close-btn");
const metricBtn = document.querySelector("#metric");
const imperialBtn = document.querySelector("#imperial");

let apiKey;
let unit = 'metric';

// fetch data from API
async function fetchData(location) {
    apiKey = '4HMHSPKW4Q8RWJSAE2N84NCF5';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("could not fetch data... Use valid city names");   
        }

        const data = await response.json();
        displayData(data);
        // searchBar.value = "";
        console.log(data);
        console.log(data.currentConditions.conditions);
        console.log(data.currentConditions.temp);
        console.log(data.currentConditions.precipprob);
        console.log(data.address);
        console.log(data.description);
    }

    catch(error) {
        console.error(error);
        alert(error);
    }
}

function getSearchData() {
    const searchBarValue = searchBar.value.trim().toLowerCase();
    console.log(searchBarValue);
    return searchBarValue;
}

function displayData(data) {
    const tempText = document.querySelector("#temp");
    const precipprobText = document.querySelector("#precipprob");
    const locationText = document.querySelector("#location");
    const descText = document.querySelector("#desc");
    const weatherIcon = document.querySelector('#weather-icon');

    tempText.textContent = `${data.currentConditions.temp}°`;
    precipprobText.textContent = data.currentConditions.precipprob;
    locationText.textContent = data.address;
    descText.textContent = data.description;
    weatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.currentConditions.icon}.png`;
    weatherIcon.style.color = "#FF8C00";
}

searchBar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fetchData(getSearchData());
    }
});

settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    settingsMenu.classList.remove('hidden');
});

closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    settingsMenu.classList.add('hidden');
});

metricBtn.addEventListener("click", () => {
    unit = 'metric';
    metricBtn.classList.add('active');
    imperialBtn.classList.remove('active');
    fetchData(getSearchData());
    console.log('Metric');
});

imperialBtn.addEventListener("click", () => {
    unit = 'us';
    imperialBtn.classList.add('active');
    metricBtn.classList.remove('active');
    fetchData(getSearchData());
    console.log('Imperial');
});