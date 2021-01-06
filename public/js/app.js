const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg-1");
const messageDesc = document.querySelector("#msg-desc");
const messageTemp = document.querySelector("#msg-temp");
const messageThree = document.querySelector("#msg-3");
var prevTemp = null;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  addOrRemoveClass(prevTemp, "remove");

  messageOne.textContent = "Loading...";
  messageDesc.textContent = "";
  messageTemp.textContent = "";
  messageThree.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      console.log(data.forecast);
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        let tempDeg = data.forecast.temperature;
        messageOne.textContent = data.location;
        messageDesc.textContent = "it is currently";
        prevTemp = tempDeg;
        addOrRemoveClass(tempDeg, "add");
        messageTemp.textContent = data.forecast.temperature + "°";
        messageThree.textContent =
          "but it feels like " + data.forecast.feel + "°";
      }
    });
  });
});

const addOrRemoveClass = (temp, condition) => {
  if (temp === null) {
  } else {
    if (condition === "add") {
      if (temp <= 0) {
        messageTemp.classList.add("from-blue-900");
        messageTemp.classList.add("to-blue-300");
      } else if (temp <= 10) {
        messageTemp.classList.add("from-yellow-400");
        messageTemp.classList.add("to-yellow-600");
      } else if (temp > 10) {
        messageTemp.classList.add("from-yellow-600");
        messageTemp.classList.add("to-red-600");
      } else {
        messageTemp.classList.add("from-gray-900");
        messageTemp.classList.add("to-gray-900");
      }
    } else {
      if (temp <= 0) {
        messageTemp.classList.remove("from-blue-900");
        messageTemp.classList.remove("to-blue-300");
      } else if (temp <= 10) {
        messageTemp.classList.remove("from-yellow-400");
        messageTemp.classList.remove("to-yellow-600");
      } else if (temp > 10) {
        messageTemp.classList.remove("from-yellow-600");
        messageTemp.classList.remove("to-red-600");
      } else {
        messageTemp.classList.remove("from-gray-900");
        messageTemp.classList.remove("to-gray-900");
      }
    }
  }
};
