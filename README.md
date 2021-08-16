# DeFi Options Market

## Simple options marketplace that allows anyone to sell and buy options for any ERC-20 token

![Concept Screenshot of DeFi Options Market - Light](/media/preview1.png)

### The Problem

DeFi-based options markets face a few issues today, which include:

- Lack of liquidity and trade volume
- Permissioned whitelisting of a very limited number of tokens
- Difficulty of end-user to interact with dApps

### The Solution

The following approach was taken to overcome these issues:

- Create incentives for liquidity providers by allowing them to take a hands-off approach towards providing capital and obtaining returns. LPs don't need to provide capital to specific pairs or strike prices/expirations but can provide liquidity in DAI and allow their capital to move where it's needed by both put and call options buyers dynamically earning from market order premiums.

- Allow anyone to add their (or another organization's) token to the marketplace, similar to how Uniswap allows anyone to list tokens. Uniswap had a major advantage early in the DeFi swap market because many projects could quickly list there and drive their community's liquidity there. We are taking this approach.

- An extremely simple user experience which allows a user to select the token they would like to trade short or long, and view all of the best offers (premiums) over various periods of time (1 week, 1 month, 1 year) along with an easy-to-read display of their break-even point and 2x, 5x, and 10x price points.

### Why Use This Instead Of Alternatives?

- As an options buyer, this option would be an easy choice because of its simplicity and efficiency (in flow, lowering gas costs and end-user trade wait times).

- As an options seller, this option provides the most flexibility as there are no minimum or maximum expiration dates, order sizes, or platform token thresholds for listing.


## Build: Major Methods & Contracts

- Core smart contract is in `contracts/optionsmarket.sol`

Here are the major, core functions:

- `sellOption`: allows a user to directly or on behalf of another user (if smart contract) sell an option (limit order). In the future, this can be called when a user buys an option to automatically fill their order at a predefined premium from strike price

- `buyOptionByExactPremiumAndExpiry`: allows a user to sell an option based on exact information of the seller. Soon, we will add buyById which will make this easier. The UI will query Graph Protocol to find the best options and this data could be populated in the UI... However, this would make it harder for smart contracts to directly integrate with this market, which is why market orders that match liquidity pools is needed in the future. Let's build that soon!

- `excersizeOption`: Once an option meets or exceeds its expiration date, anyone can execute the option for the user. Ideally, in the future, a user could be rewarded for doing this instead if a bot or the buyer/seller of the option does not do it within 12 hours of expiration so that buyers and sellers can take a handsoff approach.



### How To Use

- As a platform, you can fork this repo and deploy these contracts. We would be happy to work with you on your own interface and custom incentive programs.

- As an options trader, you will use partner platforms which will have the same core with various additional features.


### Test 

- Tests are written in test.js in test folder
- in optionsmarket.sol, comment out line 17 and uncomment line 18 where we have daiTokenAddress;
- un-comment the setDaiAddress function on line 68
- run truffle develop to run an instance of a local blockchain with generated accounts
- "truffle migrate --reset" or "deploy" to deploy contracts
- there are 2 test tokens created for the purpose of testing
- still within truffle develop, run "test" to run test script

### What's Next

- Adding the ability to tokenize option positions, so they can be bought and sold before expiration. This starts by making simple transfers and transferFrom functions which include the optionID as a parameter. From there, another project or this one can tokenize positions.

- Simple Graph Protocol docs for querying options data to build your trade bots

- Simple pluggable incentive programs whereby tokens can be deposited and users can set how these tokens should be distributed based on trade activity. This will be a new and useful way for projects to fundraise and/or create incentivizes for various trading activities.

- Aztec Network deployment and development for user trade privacy

- What would you like to see? You are welcome to create an issue with your suggestions.


### Contribute

- Please make all the contributions on the `develop` branch or send any questions into the Discord: https://discord.gg/7fApFnA6qW

Thanks for visiting and looking forward to collaborating with you.
