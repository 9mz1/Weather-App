const apiKey = '4HMHSPKW4Q8RWJSAE2N84NCF5';
const unit = 'metric'; //us for imperial units

async function fetchData() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dubai?unitGroup=${unit}&key=${apiKey}`);

        if (!response.ok) {
            throw new Error("could not fetch data");
        }

        const data = await response.json();
        console.log(data);
    }

    catch(error) {
        console.log(error);
    }
}