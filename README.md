# Crypto Sheets

This is a (javascript-based) tool to aid in creating your own crypto tracking spreadsheet.  It can automagically pull in current cryptocurrency rates, as well as your wallet balances.  It requires the use of Google Sheets and its built-in script editor.

If you want a better understanding of how it works and have no programming experience, it's never too late to learn.  Take a free course at **Codecademy** and flex your brain :muscle::fireworks:.  [Programming can open doors for you, no matter your occupation](https://www.forbes.com/sites/laurencebradford/2016/06/20/why-every-millennial-should-learn-some-code/#1231c1e270f2).
https://www.codecademy.com/learn/introduction-to-javascript

# Instructions

## Populating `Rates` sheet with currency data

1. Create [a new Google Sheets spreadsheet](https://docs.google.com/spreadsheets) and name it something, or open an existing one

    1. ![Create new spreadsheet](https://i.imgur.com/ARb3B0Dm.png)

    1. ![Name your spreadsheet](https://i.imgur.com/uJ6h43nm.png)

1. Create two new sheets called `Rates` and `Wallets`

    1. ![Rates and Wallets sheets](https://i.imgur.com/WHO747jm.png)

1. Click "Tools > Script editor..." on the menu bar, and name your script project something

    1. ![Script Editor](https://i.imgur.com/hjhZlaAm.png)

    1. ![Project Name](https://i.imgur.com/tUXLp1Pm.png)

1. Select all of the text in the right-side pane and delete it

    1. ![Delete existing code](https://i.imgur.com/RVyXaUzm.png)

1. Paste [the contents of scripteditor.js](scripteditor.js) into the right-side pane

    1. ![Paste script](https://i.imgur.com/5ktIBNom.png)

1. Add in as many currencies that you want to track

    1. ![Add currencies to track](https://i.imgur.com/SyBS19j.png)

1. Add triggers to your project ("Edit > Current project's triggers...").  This is how your spreadsheet will update automatically.
   
   1. ![Add triggers](https://i.imgur.com/d7MIO7Km.png)
   
   1. Set up a new trigger
      
     1. ![New trigger](https://i.imgur.com/AzDXGQvm.png)
   
   1. In the "Run" dropdown, choose "onOpen" and choose which triggers will refresh the data.  We recommend using "Time-driven/Minutes/Every 30", and "From spreadsheet/On open."
      
     1. ![Trigger definition](https://i.imgur.com/pk1rG2L.jpg)

1. You can manually execute the script to test it by clicking the `Select function`, selecting `onOpen`, and clicking the run button (looks like the play symbol)
   
   1. ![Manually execute script](https://i.imgur.com/zGC9Gwe.png)

## Populating `Wallets` Sheet with Account Balances
*Note: Currently supports NANO, ETH, BCH, BTC, DGB, LTC, and VTC.  Update other wallet balances manually in your spreadsheet for the time being.  Feel free to [submit an issue](https://github.com/saitei/crypto-sheets/issues) for other currencies.*

1. If you don't have a `Wallets` sheet, one will automatically be created for you

1. Scroll down to the `WALLET BALANCE CONFIGURATION` section (around line 130)
   
   1. ![wallet section](https://i.imgur.com/0ODMumfm.png)

1. Follow the instructions for each currency to add your address.  You can change the value in `getRange` to output the balance to a different cell in the `Wallets` sheet.
   1. Before configuration
      
     1. ![before wallet config](https://i.imgur.com/iZkSemq.png)
   
   1. After configuration
      
     1. ![after wallet config](https://i.imgur.com/dTLu4cC.png)

## Market Cap Data

1. A sheet called `Global` will be automatically created for you, and populated with overall Market Cap Data.

## Advanced

There are comments in the code for anything that's not covered here.  If you had to use these instructions, the safe bet is to not modify anything else.

## Using the Data

solifugo has [put together a guide](https://github.com/saitei/crypto-sheets/wiki/Easy-guide-(I-hope)-to-create-a-Portfolio-Tracker) on how to organize data from the Rates sheet.

## How to Contribute

* Help others in the cryptosheets subreddit (https://www.reddit.com/r/cryptosheets/).  You don't need to write any code to help others out.
* Hop in the gitter.im chat rooms
   * [Lobby](https://gitter.im/cryptosheets/Lobby)
   * [Development](https://gitter.im/cryptosheets/development)
* Check out the [contributing page](CONTRIBUTING.md) and become involved on GitHub
* If all else fails, give a stranger a compliment and brighten their day

### Powered By

* [CoinMarketCap](https://coinmarketcap.com/)
* [Block Explorer](https://blockexplorer.com)
* [XRB.Network](http://xrb.network/)
* [Etherscan](https://etherscan.io)
* explorer.vertcoin.info

### Acknowledgements

* solifugo
* iKrazy
* apiontek
* yukihirai0505
* Christopher Walken

### Donations

* XRB
   * **xrb_3ix8dfgn7hkz3choqi1qr6jgopoodh1jr1giwixzqaohks7d1f98dau45c11**
* ETH
   * **0x7E9DDB5343a583705Ed9ADE065C0595EFB55D681**
* VTC
   * **Vo8EXgAtxCVUtMaTQECuzLD2tZU1HqLbhT**
* BCH
   * **1Gzs8uKoUY23R7kTRE8NwAucAArAk8mdCg**

### License

This project is licensed under the GNU General Public License v3.0
