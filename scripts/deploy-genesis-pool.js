const { ethers } = require("hardhat");

async function main() {

    const __startTime = 1644508764;
    const __dante = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

    const DummyToken = await ethers.getContractFactory("DummyToken");
    const dummy = await DummyToken.deploy();

    // TombGenesisRewardPool
    const DanteGenesisRewardPool = await ethers.getContractFactory("DanteGenesisRewardPool");
    const danteGenesisRewardPool = await DanteGenesisRewardPool.deploy(
        __dante,
        __startTime
    );
    
    console.log("danteGenesisRewardPool address:", danteGenesisRewardPool.address);

    // add pool
    /*
    uint256 _allocPoint,
    IERC20 _token,
    bool _withUpdate,
    uint256 _lastRewardTime
*/
    await danteGenesisRewardPool.add(
        100,
        dummy.address,
        true,
        0
    );




    //const DanteGenesisRewardPoolFactory = await ethers.getContractFactory("DanteGenesisRewardPool");
    //const DanteGenesisRewardPool = await DanteGenesisRewardPoolFactory.attach('0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');

    //console.log(await DanteGenesisRewardPool.poolInfo(0));

    /*
        uint256 _allocPoint,
        IERC20 _token,
        bool _withUpdate,
        uint256 _lastRewardTime
    */
    /*
    await DanteGenesisRewardPool.add(
        '100',
        '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
        'true',
        '0'
    );
    */
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });