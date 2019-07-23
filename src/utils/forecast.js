const request = require('request')

const base = 'https://api.darksky.net/forecast/'
const key = '4af4c3839be81df523c39161b294fe7c/'

const forecast = (latitude, longitude, callback) => {
    const url =  base + key + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast