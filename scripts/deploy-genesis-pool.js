const { ethers } = require("hardhat");

async function main() {

    const __startTime = 1644508764;
    const __dante = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
    const __treasury = "";

    const DummyToken = await ethers.getContractFactory("DummyToken");
    const dummy = await DummyToken.deploy();

    // TombGenesisRewardPool
    const DanteGenesisRewardPool = await ethers.getContractFactory("DanteGenesisRewardPool");
    const danteGenesisRewardPool = await DanteGenesisRewardPool.deploy(
        __dante,
        __treasury,
        __startTime
    );
    
    console.log("danteGenesisRewardPool address:", danteGenesisRewardPool.address);

    // add pool
    await danteGenesisRewardPool.add(
        100,
        dummy.address,
        true,
        0
    );
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });