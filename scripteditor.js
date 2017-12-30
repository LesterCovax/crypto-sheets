var queryString = Math.random();
var ss = SpreadsheetApp.getActiveSpreadsheet();

// ======
// !!!
// IMPORTANT: Create a sheet called 'Rates'.  This is where the values will be written
// !!!
// ======
var ssRates = ss.getSheetByName('Rates');

// ====== Set the target currency =======
// Don't change if using USD
// Possible values: 
  // "aud", "brl", "cad", "chf", "clp", "cny", "czk", "dkk", "eur", "gbp", "hkd", "huf", 
  // "idr", "ils", "inr", "jpy", "krw", "mxn", "myr", "nok", "nzd", "php", "pkr", "pln", 
  // "rub", "sek", "sgd", "thb", "try", "twd", "usd", "zar"
// ======================================
var targetCurrency = 'usd'

// Grabs all CoinMarketCap data
if (typeof targetCurrency == 'undefined' || targetCurrency == '') {targetCurrency = 'usd'};
var coins = getCoins();

function getData() {

  // ===== Coins to Track ======
  // Enter the coins you want tracked, each one on a new line, in single quotes, followed by a comma
  // Use the value in the 'symbol' field here: https://api.coinmarketcap.com/v1/ticker/?limit=0
  // ===========================
  var myCoins = [
    'ARK',
    'BTC',
    'BCH',
    'ETH',
    'XRB',
    'XMR',
  ]

  // Creates column headers.  Don't change unless you know what you're doing.
  // If there is data you don't want, just hide the column in your spreadsheet, or simply don't reference it
  // DO NOT TOUCH
  ssRates.getRange('A1').setValue("ID");
  ssRates.getRange('B1').setValue("Name");
  ssRates.getRange('C1').setValue("Symbol");
  ssRates.getRange('D1').setValue("Rank");
  ssRates.getRange('E1').setValue("Price USD");
  ssRates.getRange('F1').setValue("Price BTC");
  ssRates.getRange('G1').setValue("24H Volume USD");
  ssRates.getRange('H1').setValue("Market Cap USD");
  ssRates.getRange('I1').setValue("Available Supply");
  ssRates.getRange('J1').setValue("Total Supply");
  ssRates.getRange('K1').setValue("Max Supply");
  ssRates.getRange('L1').setValue("Percent Change 1H");
  ssRates.getRange('M1').setValue("Percent Change 24H ");
  ssRates.getRange('N1').setValue("Percent Change 7D");
  ssRates.getRange('O1').setValue("Last Updated");
  // Adds in extra column headers if non-USD currency was chosen
  if (typeof targetCurrency !== 'usd') {
    ssRates.getRange('P1').setValue("Price " + targetCurrency.toUpperCase());
    ssRates.getRange('Q1').setValue("24H Volume " + targetCurrency.toUpperCase());
    ssRates.getRange('R1').setValue("Market Cap " + targetCurrency.toUpperCase());
  };


  // Creating new Object with our coins for later use.  
  // Each Object's key is the coin symbol
  var myCoinsObj = {};
  var myCoinsCount = myCoins.length;
  for (var i = 0; i < myCoinsCount; i++) {
    var n = 0;
    while (coins[n]['symbol'] !== myCoins[i]) {
      n++;
    }
    
    myCoinsObj[coins[n]['symbol']] = coins[n];
        
    ssRates.getRange('A'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['id']);
    ssRates.getRange('B'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['name']);
    ssRates.getRange('C'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['symbol']);
    ssRates.getRange('D'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['rank']);
    ssRates.getRange('E'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['price_usd']);
    ssRates.getRange('F'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['price_btc']);
    ssRates.getRange('G'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['24h_volume_usd']);
    ssRates.getRange('H'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['market_cap_usd']);
    ssRates.getRange('I'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['available_supply']);
    ssRates.getRange('J'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['total_supply']);
    ssRates.getRange('K'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['max_supply']);
    ssRates.getRange('L'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_1h']);
    ssRates.getRange('M'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_24h']);
    ssRates.getRange('N'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_7d']);
    ssRates.getRange('O'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['last_updated']);
    if (typeof targetCurrency !== 'usd') {
      ssRates.getRange('P'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['price_' + targetCurrency]);
      ssRates.getRange('Q'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['24h_volume_' + targetCurrency]);
      ssRates.getRange('R'+(i+2).toString()).setValue(myCoinsObj[myCoins[i]]['market_cap_' + targetCurrency]);
    };
  }

  // ===== VTC wallet balances =======
  // Add more as needed with different variable names
  // Change the value in getRange() to match the cell in spreadsheet
  // Change the value in setValue() to match the variable above
  // =================================

  //
  // Uncomment variables to use
  //

  //var VtcWallet = getVtcBalance("yourAddressHere");
  //ssRates.getRange('E3').setValue(VtcWallet);

  // ===== Ethereum Wallet Balances =====
  //Create an account on Etherscan.io
  // Create an API key at https://etherscan.io/myapikey
  // Put your API key in below, replacing yourEtherscanApiKey
  // Add Ethereum address, replacing yourEthAddress
  // Change the value in setValue() to match the variable above
  // ====================================
  
  //
  // Uncomment variables and follow instructions above to use
  //

  //var EthApiKey = "yourEtherscanApiKey";
  //var EthWallet = getEthBalance(EthApiKey,"yourEthAddress");
  //ssRates.getRange('E1').setValue(EthWallet);
}
  
  //
  // DON'T TOUCH ANYTHING BELOW
  // IT MAKES THE MAGIC HAPPEN
  //

function getCoins() {

  var url = 'https://api.coinmarketcap.com/v1/ticker/?convert=' + targetCurrency + '&limit=0?';
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  return data;
}

function getEthBalance(ethApiKey,ethAddress) {

  var obj = JSON.parse (UrlFetchApp.fetch("https://api.etherscan.io/api?module=account&action=balance&address="+ethAddress+"&tag=latest&apikey="+ethApiKey));
  var data = (obj.result);
  
  return data * Math.pow(10,-18);
}

function getVtcBalance(vtcAddress) {

  var obj = UrlFetchApp.fetch("http://explorer.vertcoin.info/ext/getbalance/"+vtcAddress);     
  
  return obj;
}

//
// !!! DEPRECATED !!!
//

function getRate(currencyId) {

  if (typeof targetCurrency !== 'undefined') {conversionRate = 'usd'};

  var url = 'https://api.coinmarketcap.com/v1/ticker/' + currencyId + '/?convert=' + targetCurrency;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);
  var obj = parseFloat(data[0]['price_' + targetCurrency]);

  return obj;
}

function getWebRate(currencyId) {
  //Example Output: 
  // '=IMPORTXML("https://coinmarketcap.com/currencies/zeeyx?3908288283","//span[@id=\'quote_price\']")';	
  
  var coinScrape1 = '=IMPORTXML("https://coinmarketcap.com/currencies/';
  var coinScrape2 = '","//span[@id=\'quote_price\']")';
  
  return coinScrape1 + currencyId + '?' + queryString + coinScrape2;
}
