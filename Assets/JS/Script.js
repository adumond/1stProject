var userTickerInput = document.querySelector("#userInputTicker");
var submitButton = document.querySelector("#submitButton");
var mCap = document.querySelector("#MarketCap");
var ticker = document.querySelector("#ticker");
var linkedCompany = document.querySelector("#inputCompany");
var companyname = document.querySelector("#company");

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
    .then(function show(data) {
      console.log(data);
      mCap.textContent = data[0].marketCap;
      ticker.textContent = data[0].symbol;
      companyname.textContent = data[0].name;
      linkedCompany.setAttribute(
        "href",
        `https://finance.yahoo.com/quote/${data[0].symbol}`
      );
    });
}

submitButton.addEventListener("click", searchTicker);
