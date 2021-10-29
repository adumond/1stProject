var userTickerInput = document.querySelector("#userInputTicker");
var submitButton = document.querySelector("#submitButton");
var currentStock = {};
var clearButton = document.querySelector("#clearLocalStorage");
var localStorageKey = "currentStocks";

async function buttonClick() {
  //empty the current stock object
  currentStock = {};
  await searchTicker();
  await ratioapi();
  await ratingapi();
  await profileapi();
  createTableEntry(currentStock);
}
// Retrieves financial info about the stock from the Quote API and adds them to the current stock object
async function searchTicker() {
  console.log(userTickerInput.value);
  return fetch(
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
      // add stock info to the current stock object
      currentStock.marketCap = data[0].marketCap;
      currentStock.symbol = data[0].symbol;
      currentStock.name = data[0].name;
      currentStock.pe = data[0].pe;
    });
}

// Retrieves financial ratio's from the Ratio API and adds them to the current stock object
async function ratioapi() {
  return fetch(
    "https://financialmodelingprep.com/api/v3/ratios/" +
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
      // Add stock info to current object
      currentStock.peg = data[0].priceEarningsToGrowthRatio;
      currentStock.cash = data[0].cashRatio;
      currentStock.debtEquity = data[0].debtEquityRatio;
      currentStock.current = data[0].currentRatio;
      currentStock.payout = data[0].payoutRatio;
    });
}
// Retrieves financial rating's from the Rating API and adds them to the current stock object
async function ratingapi() {
  return fetch(
    "https://financialmodelingprep.com/api/v3/rating/" +
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
      //Added stock rating info to the currentStock object
      currentStock.rating = data[0].ratingScore;
      currentStock.rec = data[0].ratingRecommendation;
    });
}
async function profileapi() {
  return fetch(
    "https://financialmodelingprep.com/api/v3/profile/" +
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
      //Added the stock's industry to the currentStock object
      currentStock.industry = data[0].industry;

      saveToLocalStorage();
      getFromLocalStorage();
    });
}
// Retrieves the current stock object and displays the object as an array on the html table
function renderLastSearch() {
  console.log(currentStock);
  // display stock info on the page
  mCap.textContent = currentStock.marketCap;
  ticker.textContent = currentStock.symbol;
  companyname.textContent = currentStock.name;
  pe.textContent = currentStock.pe;
  linkedCompany.setAttribute(
    "href",
    `https://finance.yahoo.com/quote/${currentStock.symbol}`
  );
  peg.textContent = currentStock.peg;
  cash.textContent = currentStock.cash;
  debtEquity.textContent = currentStock.debtEquity;
  current.textContent = currentStock.current;
  payout.textContent = currentStock.payout;

  rating.textContent = currentStock.rating;
  rec.textContent = currentStock.rec;

  industry.textContent = currentStock.industry;
}

//function that adds the currentStock to local storage in an array
function saveToLocalStorage() {
  var localStorageStocks = getFromLocalStorage();
  if (!localStorageStocks) {
    localStorageStocks = [];
  }
  localStorageStocks.push(currentStock);
  localStorage.setItem(localStorageKey, JSON.stringify(localStorageStocks));
}
//function that looks in the local storage for
function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}
//Creates a new row in the table for the currentStock object and adds each desired value from the apis into the appropiate columns on the table
function createTableEntry(currentStock) {
  isSelected = document.createElement("tr");

  ticker = document.createElement("th");
  ticker.innerHTML = currentStock.symbol;
  isSelected.appendChild(ticker);

  company = document.createElement("td");
  linkedCompany = document.createElement("a");
  linkedCompany.setAttribute(
    "href",
    `https://finance.yahoo.com/quote/${currentStock.symbol}`
  );

  linkedCompany.setAttribute("target", `blank`);
  linkedCompany.innerHTML = currentStock.name;
  company.appendChild(linkedCompany);
  isSelected.append(company);

  MarketCap = document.createElement("td");
  MarketCap.innerHTML = currentStock.marketCap;
  isSelected.appendChild(MarketCap);

  Category = document.createElement("td");
  Category.innerHTML = currentStock.industry;
  isSelected.append(Category);

  pe = document.createElement("td");
  pe.innerHTML = currentStock.pe;
  isSelected.append(pe);

  peg = document.createElement("td");
  peg.innerHTML = currentStock.peg;
  isSelected.append(peg);

  cash = document.createElement("td");
  cash.innerHTML = currentStock.cash;
  isSelected.append(cash);

  debtEquity = document.createElement("td");
  debtEquity.innerHTML = currentStock.debtEquity;
  isSelected.append(debtEquity);

  current = document.createElement("td");
  current.innerHTML = currentStock.current;
  isSelected.append(current);

  payout = document.createElement("td");
  payout.innerHTML = currentStock.payout;
  isSelected.append(payout);

  rating = document.createElement("td");
  rating.innerHTML = currentStock.rating;
  isSelected.append(rating);

  rec = document.createElement("td");
  rec.innerHTML = currentStock.rec;
  isSelected.append(rec);

  document.getElementById("table-body").prepend(isSelected);
}
//Uses the current stock objects saved in the local storage to populate the rows on the table
function populateTableFromLocalStorage() {
  currentStocks = getFromLocalStorage();
  if (currentStocks) {
    for (let i = 0; i < currentStocks.length; i++) {
      this.createTableEntry(currentStocks[i]);
    }
  }
}
//function that clears the local storage and refreshes the page to clear the table
function clearButtonClick() {
  localStorage.removeItem(localStorageKey);
  location.reload();
}
//activates the clearButtonClick fuction when the clearButton is pressed by the user
clearButton.addEventListener("click", clearButtonClick);
//activates the buttonClick function when the users clicks on the submitButton
submitButton.addEventListener("click", buttonClick);
populateTableFromLocalStorage();
