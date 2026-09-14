const apiKey = 'YTN65YNWYXNGZ6MURLTGR2ELK';
const newsApiKey = '8069bc50324c42bebd6eafb4ec7a5ccb';

function fetchWeatherUrl(callback: (error: Error | null, weatherUrl?: string) => void) {
    console.log("Fetching weather url and apiKey")
    setTimeout(() => {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=-29.6168&longitude=30.3928&current_weather=true`;
        callback(null, weatherUrl)
    },1000)
}

function getWeatherResponse(weatherUrl: string, callback: (error: Error | null, weatherData?: string) => void) {
    console.log("Fetching weather response from API")
    setTimeout(() => {
        const weatherResponse = fetch(weatherUrl)
        weatherResponse
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fetching weather Response failed: ${response.status}`);
                }
                return response.text();
            })
            .then(weatherData => {
                callback(null, weatherData);
            })
            .catch(error => {
                callback(error);
            });
    }, 2000)
}

function fetchNewsUrl(callback: (error: Error | null, newsUrl?: string) => void) {
    console.log("Fetching news url and apiKey")
    setTimeout(() => {
        const newsUrl = `https://dummyjson.com/posts?limit=5`;
        callback(null, newsUrl)
    },1000)
}

function getNewsResponse(newsUrl: string, callback: (error: Error | null, newsResponse?: string) => void) {
    console.log("Fetching news Response from API")

    setTimeout(()=>{
        const newsResponse = fetch(newsUrl)

        newsResponse
        .then(response => {
            if (!response.ok){
                throw new Error (`Failed to fetch response from API: ${response.status} `)
            }
            return response.text();
        })
        .then(weatherData => {
            callback(null, weatherData)
        })
        .catch(error =>{
            callback(error)
        })

    }, 20000)
};

fetchWeatherUrl((error, weatherUrl) =>{
    if (error){
        console.error("Error fetching weather url", error.message);
    }
    if (weatherUrl){
        getWeatherResponse(weatherUrl, (error, weatherData) =>{
            if (error){
                console.error("Error fetching weather response.", error.message)
            }
            if (weatherData){
                console.log(weatherData)
                fetchNewsUrl((error, newsUrl) =>{
                    if (error) {
                     console.error("Error fetching news url", error.message);   
                    }
                    if (newsUrl){
                        getNewsResponse(newsUrl, (error, newsData) => {
                            if (error){
                            console.error("Error fetching news response.", error.message)    
                            }
                            if (newsData){
                                console.log(newsData)
                                console.log("All operations completed successfully.")
                            }
                        })
                    }
                })
            }
        })
    }
})
