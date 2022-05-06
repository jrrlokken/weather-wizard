require("dotenv").config();
console.log(process.env.OW_API_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

const apiKey = process.env.OW_API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

app.post("/", function (req, res) {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (error, response, body) {
    if (error) {
      res.render("index", { weather: null, error: "Error. Please try again." });
    } else {
      const weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "Error. Please try again.",
        });
      } else {
        res.render("index", { weather: weather, error: null });
      }
    }
  });
});

app.listen(3000, function () {
  console.log("Weather app listening on port 3000");
});
