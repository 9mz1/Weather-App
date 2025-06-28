const searchBtn = document.querySelector("#search-btn");

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
            throw new Error("could not fetch data");
        }

        const data = await response.json();
        displayData(data);
        console.log(data);
        console.log(data.currentConditions.conditions);
        console.log(data.currentConditions.temp);
        console.log(data.currentConditions.precipprob);
        console.log(data.address);
        console.log(data.description);
    }

    catch(error) {
        console.log(error);
    }
}

function getSearchData() {
    const searchBarValue = document.getElementById("search-bar").value.trim().toLowerCase();
    console.log(searchBarValue);
    return searchBarValue;
}

function displayData(data) {
    const tempText = document.querySelector("#temp");
    const precipprobText = document.querySelector("#precipprob");
    const locationText = document.querySelector("#location");
    const descText = document.querySelector("#desc");

    tempText.textContent = `Tempreature: ${data.currentConditions.temp}`;
    precipprobText.textContent = `Precipitation Probability: ${data.currentConditions.precipprob}`;
    locationText.textContent = `Location: ${data.address}`;
    descText.textContent = `Description: ${data.description}`;
}

searchBtn.addEventListener("click", () => {
    fetchData(getSearchData());
});
