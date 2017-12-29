var queryString = Math.random();

function getData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  //
  //IMPORTANT: Create a sheet called 'Rates'.  This is where the values will be written
  //
  var ssRates = ss.getSheetByName('Rates');

  //This fetches all the data from CoinMarketCapAPI
  //IMPORTANT: DO NOT TOUCH THIS LINE
  var apiObj = getApiObj();

  //Grabbing values from CoinMarketCapAPI data
  //Change the variable name to match the trading symbol
  //Change the name in the quotes (e.g. are-bees-carebears) to match the 'id' field from https://api.coinmarketcap.com/v1/ticker/
  //Copy/paste to add more lines as needed
  
  var ABC = getRate('are-bees-carebears', apiObj);
  var BCD = getRate('berry-cool-doge', apiObj);
  var CDE = getRate('coin-dank-enigma', apiObj);
  
  //Grabbing values that are on CoinMarketCap but not in the API
  //Change the variable name to match the trading symbol
  //Go to the CoinMarketCap page for the currency (e.g. https://coinmarketcap.com/currencies/zeeyx)
  //Change the name in quotes (e.g. zeeyx) to match the end of the URL for your currency
  //Copy/paste to add more lines as needed
  
  var ZYX = getWebRate('zeeyx');
  var YXW = getWebRate('yaaxw');
  var XWV = getWebRate('xoowv');

  //Setting values in a sheet called 'Rates' (defined at the top)
  //Change the values in getRange() to match the cells in the 'Rates' sheet you want to userAgent
  //Use the coin symbols from above in setValue()

  ssRates.getRange('B1').setValue(ABC);
  ssRates.getRange('B2').setValue(BCD);
  ssRates.getRange('B3').setValue(CDE);
  
  ssRates.getRange('B4').setValue(ZYX);
  ssRates.getRange('B5').setValue(YXW);
  ssRates.getRange('B6').setValue(XWV);

  //VTC wallet balances
  //Add more as needed with different variable names

  var VtcWallet = getVtcBalance("yourAddressHere");

  //Change the value in getRange() to match the cell in spreadsheet
  //Change the value in setValue() to match the variable above

  ssRates.getRange('E3').setValue(VtcWallet);

  //Ethereum Wallet Balances
  //Create an account on Etherscan.io
  //Create an API key at https://etherscan.io/myapikey
  //Put your API key in below, replacing yourEtherscanApiKey
  //Add Ethereum address, replacing yourEthAddress

  var EthApiKey = "yourEtherscanApiKey";
  var EthWallet = getEthBalance(EthApiKey,"yourEthAddress");

  //Putting this value in spreadsheet
  //Change the value in setValue() to match the variable above

  ssRates.getRange('E1').setValue(EthWallet);
}

  //
  // DON'T TOUCH ANYTHING BELOW
  // IT MAKES THE MAGIC HAPPEN
  //

function getEthBalance(ethApiKey,ethAddress) {

  var obj = JSON.parse (UrlFetchApp.fetch("https://api.etherscan.io/api?module=account&action=balance&address="+ethAddress+"&tag=latest&apikey="+ethApiKey));
  var data = (obj.result);

  return data * Math.pow(10,-18);
}

function getVtcBalance(vtcAddress) {

  var obj = UrlFetchApp.fetch("http://explorer.vertcoin.info/ext/getbalance/"+vtcAddress);

  return obj;
}

function getApiObj() {
  var url = 'https://api.coinmarketcap.com/v1/ticker/';
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();

  return JSON.parse(json);
}

function getRate(currencyId, apiObj) {
  var currencyData = apiObj.filter(function(obj) {
    return obj.id == currencyId;
  });

  return parseFloat(currencyData[0].price_usd);
}

function getWebRate(currencyId) {
  //Example Output: 
  // '=IMPORTXML("https://coinmarketcap.com/currencies/zeeyx?3908288283","//span[@id=\'quote_price\']")';	
	
  var coinScrape1 = '=IMPORTXML("https://coinmarketcap.com/currencies/';
  var coinScrape2 = '","//span[@id=\'quote_price\']")';
  
  return coinScrape1 + currencyId + '?' + queryString + coinScrape2;
}
