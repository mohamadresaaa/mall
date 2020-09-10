const express = require("express");
const {
    json,
    urlencoded
} = require("body-parser");
const routes = require("./routes");
const {
    apiError404,
    apiErrorHandler
} = require("./middleware/errorHandle");

const app = express();

app.use(json());
app.use(urlencoded({
    extended: true
}));

// configuration routes
app.use(routes)
app.use("*", apiError404)
app.use(apiErrorHandler)

module.exports = app;