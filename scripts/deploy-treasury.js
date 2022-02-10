const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    const __startTime = 1234567;
    const __tbond = "0x9A676e781A523b5d0C0e43731313A708CB607508";
    const __lpAddress = "0xB7393b89e7B9E8A8f2d330103859FDFa78075721";
    const __devFund = "0x0000000000000000000000000000000000000001";

    const pair = await hre.ethers.getContractAt("IUniswapV2Pair", __lpAddress);

    const Oracle = await ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy(
        pair.address,       // LP TOKEN
        21600,              // HOW LONG IS EPOCH (6 HOURS)
        __startTime         // START TIME
    );
      
    console.log("oracle address:", oracle.address);

    // Treasury
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy();
      
    console.log("treasury address:", treasury.address);
  
    await treasury.initialize (
        await oracle.token0(),                              // $DANTE
        __tbond,                                            // $DBOND
        "0x0000000000000000000000000000000000000000",       // $TSHARE
        oracle.address,                                     // ORACLE
        "0x0000000000000000000000000000000000000000",       // MASONRY
        __startTime,                                        // START TIME
    );

    // deploy tshare
    const Grail = await ethers.getContractFactory("Grail");
    const grail = await Grail.deploy(
        __startTime,  // start time
        treasury.address,  // treasury
        __devFund);  // dev fund
    
    console.log("grail address:", grail.address);

    // Masonry
    const Paradise = await ethers.getContractFactory("Paradise");
    const paradise = await Paradise.deploy();
        
    console.log("paradise address:", paradise.address);

    await paradise.initialize (
        await oracle.token0(),
        grail.address,
        treasury.address
    );

    await treasury.setMasonry (
        paradise.address
    );

    await treasury.setTShare (
        grail.address
    );

    console.log("done");
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });