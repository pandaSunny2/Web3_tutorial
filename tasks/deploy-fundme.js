const {task} = require("hardhat/config")

task("deploy-fundme", "Deploys the contract to the network").setAction(async (taskArgs, hre) => {
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
});

async function verifyFundMe(fundMeAddress, args) {
    // hre : is hardhat runtime environment
    await hre.run("verify:verify", {
        address: fundMeAddress,
        constructorArguments: args
    });
}


module.exports = {}  
