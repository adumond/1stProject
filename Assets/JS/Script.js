var userTickerInput = document.querySelector("#userInputTicker");
var submitButton = document.querySelector("#submitButton");

function searchTicker() {
  console.log(userTickerInput.value);
  fetch(
    "https://financialmodelingprep.com/api/v3/quote/" +
      userTickerInput.value +
      "?apikey=2d1a1c7c741d940e02d0caa1d05e8726",
    {
      method: "GET", //GET is the default.
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
submitButton.addEventListener("click", searchTicker);
