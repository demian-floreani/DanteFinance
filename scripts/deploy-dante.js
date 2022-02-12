/**
 * Deploy $TOKEN & $DBOND tokens
 */

const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    // deploy tomb
    const Dante = await ethers.getContractFactory("Dante");
    const dante = await Dante.deploy();
  
    console.log("dante address:", dante.address);

    // deploy tbond
    const DBond = await ethers.getContractFactory("DBond");
    const dbond = await DBond.deploy();
  
    console.log("dbond address:", dbond.address);

    // deploy tbond
    const DummyToken = await ethers.getContractFactory("DummyToken");
    const dummy = await DummyToken.deploy();
  
    console.log("dummy address:", dummy.address);

    const constract = await ethers.getContractAt("Dante", dante.address);

    console.log(await constract.name());
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });