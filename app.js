const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

let apiKey;
let unit;

// fetch data from API
async function fetchData(location) {
    apiKey = '4HMHSPKW4Q8RWJSAE2N84NCF5';
    unit = 'metric'; //us for imperial units
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("could not fetch data... Use valid city names");   
        }

        const data = await response.json();
        displayData(data);
        searchBar.value = "";
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

    tempText.textContent = `Tempreature: ${data.currentConditions.temp}`;
    precipprobText.textContent = `Precipitation Probability: ${data.currentConditions.precipprob}`;
    locationText.textContent = `Location: ${data.address}`;
    descText.textContent = `Description: ${data.description}`;
    weatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.currentConditions.icon}.png`;
    weatherIcon.style.color = "#FF8C00";
}

searchBar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fetchData(getSearchData());
    }
});