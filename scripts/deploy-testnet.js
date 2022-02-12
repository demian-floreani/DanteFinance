/**
 * Deploy $TOKEN & $DBOND tokens
 */

 const { ethers } = require("hardhat");

 async function main() {
    const [deployer] = await ethers.getSigners();
   
    const __dev = "0x65d3c08aB4acC7FDe49b982CC511296b44dF308D";
    const __startTime = (Math.floor(Date.now() / 1000) + 1000).toString();

    // deploy dante
    const Dante = await ethers.getContractFactory("Dante");
    const dante = await Dante.deploy();
  
    console.log("dante address:", dante.address);

    // deploy tbond
    const DBond = await ethers.getContractFactory("DBond");
    const dbond = await DBond.deploy();
  
    console.log("dbond address:", dbond.address);

    // deploy dummy
    const DummyToken = await ethers.getContractFactory("DummyToken");
    const dummy = await DummyToken.deploy();
  
    console.log("dummy address:", dummy.address);
 
    const UniswapV2Factory = await ethers.getContractAt("IUniswapV2Factory", "0x5D479c2a7FB79E12Ac4eBBAeDB0322B4d5F9Fd02");

    await UniswapV2Factory.createPair(
      dante.address,
      dummy.address);

    //console.log("pair address: ", pair.address);

    await dante.approve(
        "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d",
        dante.address
    );
    await dummy.approve(
        "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d",
        dummy.address
    );
    //await Pair.approve(
    //    "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d",
    //    pair.address
    //);

    // Treasury
    console.log("deploying treasury..");
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy();
      
    console.log("treasury address:", treasury.address);

    // TombGenesisRewardPool
    const DanteGenesisRewardPool = await ethers.getContractFactory("DanteGenesisRewardPool");
    const danteGenesisRewardPool = await DanteGenesisRewardPool.deploy(
        dante.address,
        treasury.address,
        __startTime
    );
    
    console.log("danteGenesisRewardPool address:", danteGenesisRewardPool.address);

    // add pool
    //await danteGenesisRewardPool.add(
    //    100,
    //    dummy.address,
    //    true,
    //    0
    //);

    await dante.distributeReward(danteGenesisRewardPool.address);


    const UniswapV2Router = await ethers.getContractAt("IUniswapV2Router", "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d");

    const result = await UniswapV2Router.addLiquidity(
      dante.address,
      dummy.address,
      "1000000000000000000000",
      "1000000000000000000000",
      "1000000000000000000000",
      "1000000000000000000000",
      __dev,
      (Math.floor(Date.now() / 1000) + 100).toString()
    );
 }
   
 main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });