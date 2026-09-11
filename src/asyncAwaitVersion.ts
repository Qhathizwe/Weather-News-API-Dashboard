const apiKey = 'YTN65YNWYXNGZ6MURLTGR2ELK';
const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Pietermaritzburg/2026-08-05/2026-09-11?key=${apiKey}`;
const newsUrl = `http://dummyjson.com/news`;

async function fetchWeatherData() {
    console.log('Fetching Weather and News Data starting...');

    try{
        const weatherResponse = await fetch(weatherUrl);
        if(!weatherResponse.ok){
            console.log("Error fetching weather data:");
        }
        else{
            console.log("Weather data fetched successfully.");
            console.log(weatherResponse);
        }

        const newsResponse = await fetch(newsUrl);
        if (!newsResponse.ok) {
            console.log("Error fetching news data:");
        }
        else {
            console.log("News data fetched successfully.");
            console.log(newsResponse);
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
    console.log('Fetching Weather and News Data completed.');
    fetchWeatherData();
}
