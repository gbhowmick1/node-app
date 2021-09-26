const request = require('request')

const prediction = (address, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key='+process.env.WEATHERSTACK_API_KEY+'&query='+address

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log("body")
            console.log(body)
            callback(undefined, `In ${body.request.query}, 
            It is currently ${body.current.temperature} degrees out, ${body.current.weather_descriptions[0]}, feels like ${body.current.feelslike} degrees`)
            // callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = prediction