import axios from 'axios'
const baseUrl = 'https://api.apixu.com/v1/current.json?key=47358c224cd846a5b67151831192903&q='

const getWeather = (location) => {
    const request = axios.get(`${baseUrl}${location}`)
    return request.then(response => response.data)
}

export default {getWeather}