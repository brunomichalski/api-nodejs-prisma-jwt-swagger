const axios = require("axios");

const apiEx = axios.create({
    baseURL: "https://api.openweathermap.org",
});

module.exports = apiEx;
