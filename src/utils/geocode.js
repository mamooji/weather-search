//import statement
import axios from "axios";

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia3JlYW0iLCJhIjoiY2tqNHF0eXh3MDNqeDJycWdvcmd3czhwNCJ9.u9GvO4AxmhFCcmKhlFzRpQ&limit=1";

  axios
    .get(url)
    .then((response) => {
      if (response.data.features.length === 0) {
        callback("Unable to find location. Try another search", undefined);
      } else {
        const long = response.data.features[0].center[0];
        const lat = response.data.features[0].center[1];
        const loc = response.data.features[0].place_name;
        callback(undefined, {
          latitude: lat,
          longitude: long,
          location: loc,
        });
      }
    })
    .catch((error) => {
      callback("Unable to connect to location services", undefined);
    });
};

//export statement
export { geocode };
