async function main() {
    const [deployer] = await ethers.getSigners();
  
    const Tomb = await ethers.getContractFactory("Tomb");
    const tomb = await Tomb.deploy();
  
    console.log("tomb address:", tomb.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });