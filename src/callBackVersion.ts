import https from 'https'
import * as dotenv from 'dotenv';

dotenv.config(); 

function fetchWeatherUrl(callback: (error: Error | null, weatherUrl?: string) => void) {
    console.log("Fetching weather url...")
    setTimeout(() => {
        const weatherUrl = process.env.WEATHER_API_URL;
        callback(null, weatherUrl)
    }, 1000)
}

function getWeatherResponse(weatherUrl: string, callback: (error: Error | null, rawWeatherData?: string) => void) {
    console.log("Fetching weather response from API via HTTPS...")
    setTimeout(() => {
        https.get(weatherUrl, (response) => {
            if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                return callback(new Error(`Request Failed, status code: ${response.statusCode}`));
            }

            let rawWeatherData = '';
            response.setEncoding('utf8')

            response.on('data', (chunk) => { rawWeatherData += chunk; });

            response.on('end', () => {
                callback(null, rawWeatherData)
            });
        })

    }, 2000)
}

function fetchNewsUrl(callback: (error: Error | null, newsUrl?: string) => void) {
    console.log("Fetching news url via HTTPS...")
    setTimeout(() => {
        const newsUrl = process.env.NEWS_API_URL;
        callback(null, newsUrl)
    }, 1000)
}

function getNewsResponse(newsUrl: string, callback: (error: Error | null, rawNewsData?: string) => void) {
    console.log("Fetching news Response from API")

    setTimeout(() => {
         https.get(newsUrl, (response)=>{
            if (response.statusCode && (response.statusCode < 200 || response.statusCode>= 300)){
                return callback(new Error(`Request Failed, Status Code: ${response.statusCode}`))
            }

            let rawNewsData ='';
            response.setEncoding('utf8')

            response.on('data', (chunk) => {rawNewsData += chunk});

            response.on('end', () =>{
                callback(null, rawNewsData)
            })

         })  

    }, 2000)
};

fetchWeatherUrl((error, weatherUrl) => {
    if (error) {
        console.error("Error fetching weather url:", error.message);
        return;
    }

    if (weatherUrl) {
        getWeatherResponse(weatherUrl, (error, rawWeatherData) => {
            if (error) {
                console.error("Error fetching weather response:", error.message);
                return;
            }

            if (rawWeatherData) {
                try {
                    // Structure raw weather data
                    console.log("====Structuring raw data====")
                    const weatherObj = JSON.parse(rawWeatherData);
                    const current = weatherObj.current_weather;

                    console.log("===  STRUCTURED WEATHER ===");
                    console.log(`location: ${current.location}`)
                    console.log(`Temperature:   ${current.temperature}°C`);
                    console.log(`Wind Speed:    ${current.windspeed} km/h`);
                    console.log(`Coordinates:   ${weatherObj.latitude}°S, ${weatherObj.longitude}°E`);
                    console.log("=============================");
                } catch (parseError) {
                    console.error("Failed to parse weather JSON");
                }

                fetchNewsUrl((error, newsUrl) => {
                    if (error) {
                        console.error("Error fetching news url:", error.message);
                        return;
                    }

                    if (newsUrl) {
                        getNewsResponse(newsUrl, (error, rawNewsData) => {
                            if (error) {
                                console.error("Error fetching news response:", error.message);
                                return;
                            }

                            if (rawNewsData) {
                                try {
                                    // Structure raw data
                                    console.log("====Structuring raw data====")
                                    const newsObj = JSON.parse(rawNewsData);

                                    console.log("===  TOP STORIES ===");
                                    newsObj.posts.forEach((post: any, index: number) => {
                                        console.log(`${index + 1}. ${post.title}`);
                                        console.log(`   Likes: ${post.reactions?.likes || 0} | Views: ${post.views || 0}`);
                                    });
                                    console.log("======================");
                                } catch (parseError) {
                                    console.error("Failed to parse news JSON");
                                }

                                console.log("All operations completed successfully.");
                            }
                        })
                    }
                })
            }
        })
    }
})