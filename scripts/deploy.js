const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    // deploy tomb
    const Tomb = await ethers.getContractFactory("Tomb");
    const tomb = await Tomb.deploy();
  
    console.log("tomb address:", tomb.address);

    // deploy tshare
    const TShare = await ethers.getContractFactory("TShare");
    const tshare = await TShare.deploy(
        1643995990,  // start time
        "",  // treasury
        "");  // dev fund
  
    console.log("tshare address:", tshare.address);

    // deploy tbond
    const TBond = await ethers.getContractFactory("TBond");
    const tbond = await TBond.deploy();
  
    console.log("tbond address:", tbond.address);


    // TombGenesisRewardPool
    const TombGenesisRewardPool = await ethers.getContractFactory("TombGenesisRewardPool");
    const tombGenesisRewardPool = await TombGenesisRewardPool.deploy(
        tomb.address,
        1743996169
    );
  
    console.log("tomb genesis reward pool address:", tombGenesisRewardPool.address);

    // TombRewardPool
    const TombRewardPool = await ethers.getContractFactory("TombRewardPool");
    const tombRewardPool = await TombRewardPool.deploy(
        tomb.address,
        1743996169
    );
  
    console.log("tomb reward pool address:", tombRewardPool.address);

    // TShareRewardPool
    const TShareRewardPool = await ethers.getContractFactory("TShareRewardPool");
    const tShareRewardPool = await TShareRewardPool.deploy(
        tshare.address,
        1743996169
    );
  
    console.log("tshare reward pool address:", tShareRewardPool.address);


    // Masonry
    const Masonry = await ethers.getContractFactory("Masonry");
    const masonry = await Masonry.deploy();
      
    console.log("masonry address:", masonry.address);
    
    // Treasury
    //const Treasury = await ethers.getContractFactory("Treasury");
    //const treasury = await Treasury.deploy();
      
    //console.log("treasury address:", treasury.address);
    
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });