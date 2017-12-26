function getData() {
  var queryString = Math.random();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssRates = ss.getSheetByName('Rates');

  //Grabbing values that are on CoinMarketCap but not in the API

  var ZYX = '=IMPORTXML("https://coinmarketcap.com/currencies/zyx?' + queryString + '","//span[@id=\'quote_price\']")';
  var YXW = '=IMPORTXML("https://coinmarketcap.com/currencies/yxw?' + queryString + '","//span[@id=\'quote_price\']")';
  var XWV = '=IMPORTXML("https://coinmarketcap.com/currencies/xwv?' + queryString + '","//span[@id=\'quote_price\']")';

  //Grabbing values from CoinMarketCapAPI

  var ABC = getRate('are-bees-carebears');
  var BCD = getRate('berry-cool-doge');
  var CDE = getRate('coin-dank-enigma');

  //Setting values in a sheet called 'Rates' (defined at the top)

  ssRates.getRange('B1').setValue(ABC);
  ssRates.getRange('B2').setValue(BCD);
  ssRates.getRange('B3').setValue(CDE);

  //VTC balances using function below 

  var VtcMining = getVtcBalance("yourAddressHere");

  //Putting this value in spreadsheet

  ssRates.getRange('E3').setValue(VtcMining);

  //ETH Balances using function below

  var EthApiKey = "yourEtherscanApiKey";
  var EthMew = getEthBalance(EthApiKey,"yourEthAddress");

  //Putting this value in spreadsheet

  ssRates.getRange('E1').setValue(EthBalance);
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

function getRate(currencyId) {

  var url = 'https://api.coinmarketcap.com/v1/ticker/' + currencyId + '/';
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);

  return parseFloat(data[0]['price_usd']);
}
