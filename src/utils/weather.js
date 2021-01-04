import axios from "axios";

const weather = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4a5132d7f57d91b433176508c8162ae4&query=" +
    lat +
    "," +
    long;

  axios
    .get(url)
    .then((response) => {
      if (response.data.error) {
        callback("Unable to connect to Weather service!", undefined);
      } else {
        const temp = response.data.current.temperature;
        const feelsLike = response.data.current.feelslike;
        const desc = response.data.current.weather_descriptions[0];
        callback(
          undefined,
          desc +
            ". It is currently " +
            temp +
            " degrees out, but it feels like " +
            feelsLike +
            "."
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { weather };
