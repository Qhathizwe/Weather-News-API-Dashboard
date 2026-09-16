import https from 'https'
import * as dotenv from 'dotenv';

dotenv.config(); 

function promiseFetchWeatherUrl(): Promise<string> {
    console.log("Fetching weather url...")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const weatherUrl = process.env.WEATHER_API_URL!;
            resolve(weatherUrl)
        }, 1000)
    })
}

function promiseGetWeatherData(weatherUrl: string): Promise<{ weatherData: string }> {
    console.log("Fetching weather data from API")
    return new Promise((resolve, rejects) => {
        setTimeout(() => {
            https.get(weatherUrl, (response) => {
                if (response) {
                    let rawWeatherData = '';
                    response.setEncoding('utf8')

                    response.on('data', (chunk) => { rawWeatherData += chunk });

                    response.on('end', () => { resolve({ weatherData: rawWeatherData }); })
                        .on('error', (err) => {
                            rejects(err);
                        });
                }
            })
        }, 1000)
    })
}

function promiseFetchNewsUrl(): Promise<string> {
    console.log("Fetching new url...")
    return new Promise((resolve, rejects) => {
        setTimeout(() => {
            const newsUrl = process.env.NEWS_API_URL!;
            resolve(newsUrl)
        }, 1000)
    })

}


function promiseGetNewsData(newsUrl: string): Promise<{ newsData: string }> {
    console.log(" Fetching news data from API...");
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            https.get(newsUrl, (response) => {

                let rawNewsData = '';
                response.setEncoding('utf8');
                response.on('data', (chunk) => { rawNewsData += chunk; });
                response.on('end', () => { resolve({ newsData: rawNewsData }); });
            }).on('error', (err) => {
                reject(err);
            });
        }, 1000)
    });
}

function displayWeather(weatherData: string): void {
    console.log("==========================================================================");
    console.log("==== Structuring Raw Weather Data ====");
    console.log("==========================================================================");
    const weatherObj = JSON.parse(weatherData);
    const current = weatherObj.current_weather;
    console.log(` Location Coordinates: ${weatherObj.latitude}°S, ${weatherObj.longitude}°E`);
    console.log(`Temperature: ${current.temperature}°C`);
    console.log(` Wind Speed: ${current.windspeed} km/h`);
    console.log("==========================================================================");
}

function displayNews(newsData: string): void {
    console.log("==========================================================================");
    console.log("==== Structuring Raw News Data ====");
    console.log("==========================================================================");
    const newsObj = JSON.parse(newsData);
    newsObj.posts.forEach((post: any, index: number) => {
        console.log(`${index + 1}. ${post.title}`);
    });
    console.log("==========================================================================");
}


// --- 1. Promise Chain Way  ---

function promiseChainMethod(): Promise<void> {
    console.log(" STARTING CHAIN METHOD");


    return promiseFetchWeatherUrl()
        .then((weatherUrl) => promiseGetWeatherData(weatherUrl))
        .then(({ weatherData }) => {
            displayWeather(weatherData);
            return promiseFetchNewsUrl();
        })
        .then((newsUrl) => promiseGetNewsData(newsUrl))
        .then(({ newsData }) => {
            displayNews(newsData);
            console.log("✅ CHAIN METHOD COMPLETE");
        })
        .catch((err) => console.error("Error in chain:", err));
}


// --- 2. Promise all Method  ---

function promiseAllMethod(): Promise<void> {
    console.log("==========================================================================");
    console.log("=== STARTING PROMISE.ALL METHOD ===");

    const weatherPipeline = promiseFetchWeatherUrl().then((url) => promiseGetWeatherData(url));
    const newsPipeline = promiseFetchNewsUrl().then((url) => promiseGetNewsData(url));


    return Promise.all([weatherPipeline, newsPipeline])
        .then(([{ weatherData }, { newsData }]) => {
            displayWeather(weatherData);
            displayNews(newsData);
            console.log("✅ PROMISE.ALL METHOD COMPLETE");
        })
        .catch((err) => console.error("Error in Promise.all:", err));
}


// --- 3. Promise.race Way ---

function promiseRaceMethod(): Promise<void> {
    console.log("==========================================================================");
    console.log(" STARTING PROMISE RACE METHOD");

    const weatherPipeline = promiseFetchWeatherUrl()
        .then((url) => promiseGetWeatherData(url))
        .then(({ weatherData }) => { displayWeather(weatherData); return "Weather won!"; });

    const newsPipeline = promiseFetchNewsUrl()
        .then((url) => promiseGetNewsData(url))
        .then(({ newsData }) => { displayNews(newsData); return "News won!"; });

    return Promise.race([weatherPipeline, newsPipeline])
        .then((winnerMessage) => {
            console.log(`--- ✅ PROMISE.RACE COMPLETE. Winner: 🏁 ${winnerMessage} ---`);
            console.log("==========================================================================");
        })
        .catch((err) => console.error("Error in Promise.race:", err));
}


// --- Controlled Execution Trigger ---

promiseChainMethod()
    .then(() => promiseAllMethod())
    .then(() => promiseRaceMethod());