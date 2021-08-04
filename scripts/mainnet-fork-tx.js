
const daiABI = require('../ABI/dai.json');



const local_address1 = '0x4913Df37c593E3E5ff11bE4541be462DDd41A3cA';
const local_address2 = '0xe7819e4b6e55D31a9b19594Af438CbB46fDC7f6d';






const transferFunds= async()=> {
  
      //transfer dai to address 2
    await daiInstance.methods.transfer(local_address2, 100).send({from: cloned_address});
    
    //transfer usdt to address1
    await usdtInstance.methods.transfer(local_address1, 100).send({from: cloned_address});

    console.log(await daiInstance.methods.balanceOf(local_address2).call(), await usdtInstance.methods.balanceOf(local_address1).call());


    
    
}

transferFunds();



