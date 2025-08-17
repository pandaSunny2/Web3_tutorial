// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat");

async function main() {
    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("deploying contract...");
    // deploy contract from factory
    const fundMe = await fundMeFactory.deploy(300);
    // wait for deployment
    await fundMe.waitForDeployment();
    console.log("contract has been deployed successfully,contract address is" + fundMe.target);
    console.log(`contract has been deployed successfully,contract address is: ${fundMe.target}`);

    // verify contract
    if(hre.network.config.chainId == 11155111 && ETHERSCAN_API_KEY) {
        console.log("waiting for 5 confirmations...");
        await fundMe.deploymentTransaction().wait(5);  //等5个区块
        await verifyFundMe(fundMe.target, [300]);
    }else{
        console.log("verification skipped ......");    
    }


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

}

async function verifyFundMe(fundMeAddress, args) {
    // hre : is hardhat runtime environment
    await hre.run("verify:verify", {
        address: fundMeAddress,
        constructorArguments: args
    });
}

main().then().catch((error) => {
    console.error(error);
    process.exit(1);   // 0:正常退出，1：非正常退出
})