/**
 * @OnlyCurrentDoc
 */

// XXXXXXXXX DONT TOUCH XXXXXXXXXXXXX
var queryString = Math.random();
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// ======
// !!!
// IMPORTANT: If you do not already have a sheet called 'Rates' this will create it for you.  This is where the values will be written.
// !!!
// ======
var ss = SpreadsheetApp.getActiveSpreadsheet();
var ssRates = ss.getSheetByName('Rates');
if (ssRates === null) {
  ssRates = ss.insertSheet('Rates');
}

// =+=+= Set the target currency =+=+=+=+
// Don't change if using USD
// Possible values: 
  // "aud", "brl", "cad", "chf", "clp", "cny", "czk", "dkk", "eur", "gbp", "hkd", "huf", 
  // "idr", "ils", "inr", "jpy", "krw", "mxn", "myr", "nok", "nzd", "php", "pkr", "pln", 
  // "rub", "sek", "sgd", "thb", "try", "twd", "usd", "zar"
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
var targetCurrency = 'usd'

// XXXXXXXX DONT TOUCH XXXXXXXXXX
// Grabs all CoinMarketCap data
if (typeof targetCurrency == 'undefined' || targetCurrency == '') {targetCurrency = 'usd'};
var coins = getCoins();
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function getData() {

  // =+=+=+ Coins to Track =+=+=+
  // Enter the coins you want tracked, one per line, in single quotes, followed by a comma
  // Use the value in the 'id' field here: https://api.coinmarketcap.com/v1/ticker/?limit=0
  // If you're getting errors, you may be using the wrong 'id'.  Double-check the values.
  // =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
  
  var myCoins = [
    'ark',
    'bitcoin-cash',
    'bitcoin',
    'ethereum',
    'digibyte',
    'litecoin',
    'monero',
    'raiblocks',
    'vertcoin'
  ]

  // XXXXXXXX DONT TOUCH UNLESS WIZARD XXXXXXXXXXX
  //
  // Creates column headers.  Don't change unless you know what you're doing.
  // If there is data you don't want, just hide the column in your spreadsheet
  // ...or simply don't reference it
  //   \/     \/    \/    \/    \/    \/    \/
  
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
  if (targetCurrency !== 'usd') {
    ssRates.getRange('P1').setValue("Price " + targetCurrency.toUpperCase());
    ssRates.getRange('Q1').setValue("24H Volume " + targetCurrency.toUpperCase());
    ssRates.getRange('R1').setValue("Market Cap " + targetCurrency.toUpperCase());
  };
  
  //   /\      /\      /\      /\       /\  
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


  // XXXXXXXX DONT TOUCH UNLESS WIZARD XXXXXXXXXX
  //
  // Creating new Object with our coins for later use.  
  // Each Object's key is the coin symbol
  //
  //      \/       \/     \/     \/     \/
  
  var myCoinsObj = {};
  var myCoinsCount = myCoins.length;
  for (var i = 0; i < myCoinsCount; i++) {
    var c = i+2;
    var n = 0;
    while (coins[n]['id'] !== myCoins[i]) {
      n++;
    }
    
    myCoinsObj[coins[n]['id']] = coins[n];
        
    ssRates.getRange('A'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['id']);
    ssRates.getRange('B'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['name']);
    ssRates.getRange('C'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['symbol']);
    ssRates.getRange('D'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['rank']);
    ssRates.getRange('E'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['price_usd']);
    ssRates.getRange('F'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['price_btc']);
    ssRates.getRange('G'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['24h_volume_usd']);
    ssRates.getRange('H'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['market_cap_usd']);
    ssRates.getRange('I'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['available_supply']);
    ssRates.getRange('J'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['total_supply']);
    ssRates.getRange('K'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['max_supply']);
    ssRates.getRange('L'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_1h']);
    ssRates.getRange('M'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_24h']);
    ssRates.getRange('N'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['percent_change_7d']);
    ssRates.getRange('O'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['last_updated']);
    if (targetCurrency !== 'usd') {
      ssRates.getRange('P'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['price_' + targetCurrency]);
      ssRates.getRange('Q'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['24h_volume_' + targetCurrency]);
      ssRates.getRange('R'+(c).toString()).setValue(myCoinsObj[myCoins[i]]['market_cap_' + targetCurrency]);
  
  //  /\     /\     /\     /\     /\     /\
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    };
  }

  //
  // =================================
  //
  //   WALLET BALANCE CONFIGURATION
  //
  // =================================

  
  //
  // ===== Wallet Sheet Creator ========================================
  // Uncomment the lines of code below
  // It will create the Wallets sheet for you
  // If using the Wallets sheet ALWAYS leave it uncommented
  // ===================================================================

  //var ssWallets = activeSpreadsheet.getSheetByName('Wallets');
  //if (ssWallets === null) {ssWallets = activeSpreadsheet.insertSheet('Wallets');}


  //
  // ===== BCH Wallet Balances =========================================
  // Uncomment the lines of code below
  // Set the variable by pasting your Address inside of the ("") 
  // Change getRange('A1') and getRange('B1') to match the row you want
  // ===================================================================

  //var bchWallet = getBchBalance("Your BCH Address");
  //ssWallets.getRange('A1').setValue("BCH Wallet");
  //ssWallets.getRange('B1').setValue(bchWallet);


  //
  // ===== BTC Wallet Balances =========================================
  // Uncomment the lines of code below
  // Set the variable by pasting your Address inside of the ("") 
  // Change getRange('A2') and getRange('B2') to match the row you want
  // ===================================================================

  //var btcWallet = getBtcBalance("Your BTC Address");
  //ssWallets.getRange('A2').setValue("BTC Wallet");
  //ssWallets.getRange('B2').setValue(btcWallet);  
  

  //
  // ===== Ethereum Wallet Balances ====================================
  // Create an account on Etherscan.io
  // Create an API key at https://etherscan.io/myapikey
  // Uncomment the lines of code below
  // Set the API key variable by pasting your API key inside of the ("") 
  // Set the address variable by pasting your Address inside of the ("") 
  // Change getRange('A3') and getRange('B3') to match the row you want
  // ===================================================================

  //var ethApiKey = "Your Etherscan API Key";
  //var ethWallet = getEthBalance(ethApiKey,"Your ETH Address");
  //ssWallets.getRange('A3').setValue("ETH Wallet");
  //ssWallets.getRange('B3').setValue(ethWallet);
  
  
  //
  // ===== DGB wallet balances =========================================
  // Uncomment the lines of code below
  // Set the variable by pasting your Address inside of the ("") 
  // Change getRange('A4') and getRange('B4') to match the row you want
  // ===================================================================

  //var dgbWallet = getDgbBalance("Your DGB Address");
  //ssWallets.getRange('A4').setValue("DGB Wallet");
  //ssWallets.getRange('B4').setValue(dgbWallet);

  
  //
  // ===== LTC wallet balances =========================================
  // Uncomment the lines of code below
  // Set the variable by pasting your Address inside of the ("") 
  // Change getRange('A5') and getRange('B5') to match the row you want
  // ===================================================================

  //var ltcWallet = getLtcBalance("Your LTC Address");
  //ssWallets.getRange('A5').setValue("LTC Wallet");
  //ssWallets.getRange('B5').setValue(ltcWallet);

  
  //
  // ===== VTC wallet balances =========================================
  // Uncomment the lines of code below
  // Set the variable by pasting your Address inside of the ("") 
  // Change getRange('A5') and getRange('B5') to match the row you want
  // ===================================================================

  //var vtcWallet = getVtcBalance("Your VTC Address");
  //ssWallets.getRange('A6').setValue("VTC Wallet");
  //ssWallets.getRange('B6').setValue(vtcWallet);
  
 
}

// XXXXXXXXXX DONT TOUCH UNLESS WIZARD XXXXXXXXXXXXX
//
// DON'T TOUCH ANYTHING BELOW UNLESS WIZARD
//       IT MAKES THE MAGIC HAPPEN
//
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function getCoins() {

  var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0&convert='+targetCurrency;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);
    
  return data;
}


function getBchBalance(bchAddress) {
    
  var url = 'https://bitcoincash.blockexplorer.com/api/addr/'+bchAddress+'/balance';
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var balance = response.getContentText();
  //Pause to not trigger API limit for multiple wallets
  Utilities.sleep(300);
    
  return balance * Math.pow(10,-8);
}


function getBtcBalance(btcAddress) {
    
  var url = 'https://blockexplorer.com/api/addr/'+btcAddress+'/balance';
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var balance = response.getContentText();
  //Pause to not trigger API limit for multiple wallets
  Utilities.sleep(300);
    
  return balance * Math.pow(10,-8);
}


function getEthBalance(ethApiKey,ethAddress) {
  
  var url = 'https://api.etherscan.io/api?module=account&action=balance&address='+ethAddress+'&tag=latest&apikey='+ethApiKey;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var obj = JSON.parse(json);
  var balance = obj.result;
  //Pause to not trigger API limit for multiple wallets
  Utilities.sleep(300);
    
  return balance * Math.pow(10,-18);
}


function getDgbBalance(dgbAddress) {

  var url = 'https://chainz.cryptoid.info/dgb/api.dws?q=getbalance&a='+dgbAddress;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var balance = response.getContentText();
  //Pause to not trigger API limit for multiple wallets
  Utilities.sleep(300);

  return balance;
}


function getLtcBalance(ltcAddress) {
  
  var url = 'https://chainz.cryptoid.info/ltc/api.dws?q=getbalance&a='+ltcAddress;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var balance = response.getContentText();
  //Pause to not trigger API limit for multiple wallets
  Utilities.sleep(300);

  return balance;
}


function getVtcBalance(vtcAddress) {
  
  var url = 'http://explorer.vertcoin.info/ext/getbalance/'+vtcAddress;
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var balance = response.getContentText();
  //Pause to not trigger API limit for multiple wallets
  Utilities.sleep(300);
    
  return balance;
}


// XXXXXXXXXXXXXXXXXXXXXXX
// !!! DEPRECATED !!!
// USE AT YOUR OWN RISK
// XXXXXXXXXXXXXXXXXXXXXXX

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

function getCurrencyConversion(currencyOne, currencyTwo) {

  var url = 'https://api.fixer.io/latest?symbols='+currencyOne.toUpperCase()+','+currencyTwo.toUpperCase();
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  return parseFloat(data['rates'][currencyTwo]);
}
