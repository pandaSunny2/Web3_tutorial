
const {task} = require("hardhat/config");

task("interact-fundme").addParam("addr","fundme contract address").setAction(async (taskArgs, hre) => {

       const fundMeFactory = await ethers.getContractFactory("Fundme");
       const fundMe =  fundMeFactory.attach(taskArgs.addr);   
     // init 2 accounts
        const [firstAccount, secondAccount] = await ethers.getSigners();
        // fund contract with first account
        const fundTx= await fundMe.fund({value: ethers.utils.parseEther("0.001")});
        await fundTx.wait();
    
        // check balance of contract
        const balanceOfContract = await ethers.provider.getBalance(fundMe.target);
        console.log(`balance of contract is:   ${balanceOfContract}`);
        
        // fund contract with second account
        const fundTxSecondAccount = await fundMe.connect(secondAccount).fund({value: ethers.utils.parseEther("0.001")});
        await fundTxSecondAccount.wait();
        
        // check balance of contract
        const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target);
        console.log(`balance of contract is:   ${balanceOfContractAfterSecondFund}`);
    
    
        // check mapping fundersToAmount
        const firstAccountBalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address);
        const secondAccountBalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address);
        console.log(`Balance of  first account balance ${firstAccount.address} is:${firstAccountBalanceInFundMe}`);
        console.log(`Balance of  first account balance ${secondAccount.address} is:${secondAccountBalanceInFundMe}`);
    
});

module.exports = {};