/**
 * Deploy $TOKEN & $DBOND tokens
 */

 const { ethers } = require("hardhat");

 async function main() {
     const [deployer] = await ethers.getSigners();
   
    
    //const UniswapV2Factory = await ethers.getContractAt("IUniswapV2Factory", "0x5D479c2a7FB79E12Ac4eBBAeDB0322B4d5F9Fd02");
    //console.log(UniswapV2Factory.address);
    //await UniswapV2Factory.createPair(
    //    "0x9Fb1b3c8279C702f74dA2865C54DbA1bdfbb86dd",
    //    "0xcFde8542708c5cB6373780411087B202bc385421");
        

    const Dante = await ethers.getContractAt("Dante", "0x6299897f5E9e5867833cc53dAea9bE11f52FAB0f");
    const Dummy = await ethers.getContractAt("Dante", "0xa09619Cc5c0FA0955E0ae89f33ed738e5C109ecD");
    const Pair = await ethers.getContractAt("IUniswapV2Pair", "0x9e17Bd714375243C7912DA9147E5526a32Efbd4C");


    console.log(await Pair.getReserves());
    //console.log("1");
    /*await Dante.approve(
        "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d",
        "1157969984665640564039457584007913129639935"
    );
    await Dummy.approve(
        "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d",
        "1157969984665640564039457584007913129639935"
    );
    await Pair.approve(
        "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d",
        "1157969984665640564039457584007913129639935"
    );*/
    
    //console.log(await Dante.name());
    //console.log("2");
    //console.log(await Pair.token0());
    //console.log(await Pair.token1());s

    /*const UniswapV2Router = await ethers.getContractAt("IUniswapV2Router", "0xcCAFCf876caB8f9542d6972f87B5D62e1182767d");

    //(Math.floor(Date.now() / 1000) + 2).toString()
    const result = await UniswapV2Router.addLiquidity(
        "0x6299897f5E9e5867833cc53dAea9bE11f52FAB0f",
        "0xa09619Cc5c0FA0955E0ae89f33ed738e5C109ecD",
        "1000000000000000000",
        "1000000000000000000",
        "1000000000000000000",
        "1000000000000000000",
        "0x65d3c08aB4acC7FDe49b982CC511296b44dF308D",
        (Math.floor(Date.now() / 1000) + 100).toString()
    );*/

    //console.log(Math.floor(Date.now() / 1000) + 2);

    /*
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    */
 }
   
 main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });