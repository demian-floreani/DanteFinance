const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    // deploy tomb
    const Dante = await ethers.getContractFactory("Dante");
    const dante = await Dante.deploy();
  
    console.log("dante address:", dante.address);

    // deploy tshare
    const Grail = await ethers.getContractFactory("Grail");
    const grail = await Grail.deploy(
        1643995990,  // start time
        "0x0000000000000000000000000000000000000001",  // treasury
        "0x0000000000000000000000000000000000000001");  // dev fund
  
    console.log("grail address:", grail.address);

    // deploy tbond
    const DBond = await ethers.getContractFactory("DBond");
    const dbond = await DBond.deploy();
  
    console.log("dbond address:", dbond.address);


    // TombGenesisRewardPool
    const DanteGenesisRewardPool = await ethers.getContractFactory("DanteGenesisRewardPool");
    const danteGenesisRewardPool = await DanteGenesisRewardPool.deploy(
        dante.address,
        1743996169
    );
  
    console.log("danteGenesisRewardPool address:", danteGenesisRewardPool.address);

    // TombRewardPool
    const DanteRewardPool = await ethers.getContractFactory("DanteRewardPool");
    const danteRewardPool = await DanteRewardPool.deploy(
        dante.address,
        1743996169
    );
  
    console.log("danteRewardPool address:", danteRewardPool.address);

    // TShareRewardPool
    const GrailRewardPool = await ethers.getContractFactory("GrailRewardPool");
    const grailRewardPool = await GrailRewardPool.deploy(
        grail.address,
        1743996169
    );
  
    console.log("grailRewardPool address:", grailRewardPool.address);


    // Masonry
    const Paradise = await ethers.getContractFactory("Paradise");
    const paradise = await Paradise.deploy();
      
    console.log("paradise address:", paradise.address);
    
    // Treasury
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy();
      
    console.log("treasury address:", treasury.address);
    


    const fs = require("fs");

    fs.writeFileSync(
        "../dantefinancegui/src/tomb-finance/deployments/deployments.localhost.json",
        JSON.stringify(
            { 
                Dante: {
                    "address": dante.address,
                    "abi": artifacts.readArtifactSync("Dante").abi
                },
                DBond: {
                    "address": dbond.address,
                    "abi": artifacts.readArtifactSync("DBond").abi
                },
                Grail: {
                    "address": grail.address,
                    "abi": artifacts.readArtifactSync("Grail").abi
                },
                DanteGenesisRewardPool: {
                    "address": danteGenesisRewardPool.address,
                    "abi": artifacts.readArtifactSync("DanteGenesisRewardPool").abi
                },
                DanteRewardPool: {
                    "address": danteRewardPool.address,
                    "abi": artifacts.readArtifactSync("DanteRewardPool").abi
                },
                GrailRewardPool: {
                    "address": grailRewardPool.address,
                    "abi": artifacts.readArtifactSync("GrailRewardPool").abi
                },
                Paradise: {
                    "address": paradise.address,
                    "abi": artifacts.readArtifactSync("Paradise").abi
                },
                Treasury: {
                    "address": treasury.address,
                    "abi": artifacts.readArtifactSync("Treasury").abi
                }
            }, undefined, 2)
    );

}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });