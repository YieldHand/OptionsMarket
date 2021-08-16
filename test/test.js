const Web3 = require('web3');
const OptionsMarket = artifacts.require('Core');
const Usdc = artifacts.require('Usdc');
const Dai =  artifacts.require('Dai');
const daiABI = require('./ABI/dai.json');
const usdcABI = require('./ABI/usdt.json');

const core = require('../build/contracts/Core.json');
const coreABI = core.abi

contract('Core', async(accounts)=> {
    let coreContractAddress;
    let dai_address;
    let usdc_address;
    let usdcDeployed;
    let daiDeployed;
    let coreDeployed;
    let coreContractInstance;
    let buyer = accounts[1];
    let seller = accounts[0];



    before(async()=> {
        coreDeployed = await OptionsMarket.deployed();
        usdcDeployed = await Usdc.deployed();
        daiDeployed  = await Dai.deployed();
        usdc_address = usdcDeployed.address;
        coreContractAddress = coreDeployed.address;
        dai_address = daiDeployed.address;


        //set dai token address
        await coreDeployed.setDaiAddress(dai_address);

        //addresses should mint tokens
        await daiDeployed.mint(buyer, 10000000);

        await usdcDeployed.mint(seller, 10000000);
        console.log(daiDeployed.address, 'yes!!!!');
       
    })


    it('should deploy core contract,usdc contract and addresses can mint test token', async()=> {
        
        assert(coreDeployed.address !=='');
        assert(usdcDeployed.address !=='');

        //check balance of dai in buyer address and usdt in seller address
        const daiBalance = (await daiDeployed.balanceOf(buyer)).toNumber();
        const usdcBalance = (await usdcDeployed.balanceOf(seller)).toNumber();

        console.log(daiBalance, usdcBalance, 'balances');

        assert(daiBalance !== 0);
        assert(usdcBalance !== 0);
        console.log(coreDeployed.address, usdcDeployed.address, 'deployed successfully');
    })


   it('should call sellOption function properly', async()=> {
        //check lastorderId
        const last_order_id_before_tx = (await coreDeployed.lastOrderId()).toNumber();
        console.log(last_order_id_before_tx, 'order id')

        //approve core contract to spend usdt token
         await usdcDeployed.approve(coreDeployed.address, 50, {from: seller});
     
      
       // call the sellOption function after approval
       const tx = await coreDeployed.sellOption(seller, usdc_address, true, 10, 10, 0, 30, {from: seller});
        
        //check that last orderID increments
        const last_order_id_after_tx = (await coreDeployed.lastOrderId()).toNumber();

        console.log(last_order_id_after_tx, last_order_id_before_tx, 'order id')
        assert(last_order_id_after_tx - last_order_id_before_tx == 1);
        assert(tx.logs[0].event == "OptionOffer");
    }) 

/*  it('should buy option by ID', async()=> {
         //check lastorderId
         const last_order_id_before_tx = (await coreDeployed.lastOrderId()).toNumber();
         console.log(last_order_id_before_tx, 'order id')
 
         //approve core contract to spend usdt token
          await usdcDeployed.approve(coreDeployed.address, 50, {from: seller});
      
       
        // call the sellOption function after approval
        const tx = await coreDeployed.sellOption(seller, usdc_address, true, 10, 10, 5, 30, {from: seller});
         
         //check that last orderID increments
         const last_order_id_after_tx = (await coreDeployed.lastOrderId()).toNumber();
     
         assert(last_order_id_after_tx - last_order_id_before_tx == 1);
         assert(tx.logs[0].event == "OptionOffer");


        //test for buyOptionsByExactPremiumAndExpiry
        //check for lastPurchaseId
        const last_Purchase_Id_before_tx = (await coreDeployed.lastPurchaseId()).toNumber();
        //approve contract to spend daiToken 
        await daiDeployed.approve(coreContractAddress, 100, {from: buyer});
        console.log((await coreDeployed.daiTokenAddress()), daiDeployed.address, 'dai test address')

        //call the buyOptionsByExactPremiumAndExpiry method
     const reciept = await coreDeployed.buyOptionByID(buyer,1, 15, {from: buyer});
        console.log(reciept, 'buy reciept');
        const last_Purchase_Id_after_tx = (await coreDeployed.lastPurchaseId()).toNumber();

       //check that purchase id incremented
       assert(last_Purchase_Id_after_tx - last_Purchase_Id_before_tx == 1);
       assert(reciept.logs[0].event == "OptionPurchase");

    }) 
        */


})