//import statements
import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

//import our nodejs CODE
import { geocode } from "./utils/geocode.js";
import { weather } from "./utils/weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//initilization
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

//routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Muhammad Mamooji",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Muhammad Mamooji",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Muhammad Mamooji",
    helpText: "Follow me to the light",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location: geoLocation } = {}) => {
      if (error) {
        return res.send({ error });
      }
      weather(latitude, longitude, (error, weatherData) => {
        if (error) {
          return res.send(error);
        }
        return res.send({
          forecast: weatherData,
          location: geoLocation,
          address: req.query.address,
        });
      });
    }
  );

  // if (!req.query.address) {
  //   return res.send({
  //     error: "You must provide an address",
  //   });
  // }
  // res.send({
  //   forecast: "is is snowing",
  //   location: "new york",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Muhammad Mamooji",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Muhammad Mamooji",
  });
});

//server startup
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
