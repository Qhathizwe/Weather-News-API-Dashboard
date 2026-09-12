const apiKey = 'YTN65YNWYXNGZ6MURLTGR2ELK';
const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Pietermaritzburg/today?key=${apiKey}`;
const newsUrl = `https://newsapi.org/v2/everything?q=SouthAfrica&apiKey=8069bc50324c42bebd6eafb4ec7a5ccb`;


const fetchWeatherAndNews = async () => {
    console.log('Fetching Weather and News Data starting...')

    try {
        //Fetching Weather only
        console.log('Fetching Weather response...')
        const weatherResponse = await fetch(weatherUrl)

        if (!weatherResponse.ok) {
            console.log("Error fetching weather data:");
        }

        console.log("Unpacking weather data into Json...")
        const weatherData = await weatherResponse.json()
        console.log(weatherData)

        //Fetching News only
        console.log("Fetching news data...")
        const newsResponse = await fetch(newsUrl)

        if (!newsResponse.ok) {
            console.log("Error fetching news data...")
        }

        console.log("Unpacking weather data into Json")
        const newsData = await newsResponse.json()
        console.log(newsData)

        console.log("Weather and News fetched Successfully.")

    } catch (error) {
        console.error("Error Fetching data:", error)
    }
    console.log('Fetching Weather and News Data completed.');
}
fetchWeatherAndNews();

