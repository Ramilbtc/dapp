const hre = require("hardhat");

const tokens = (nToken) => {
    return ethers.utils.parseUnits(nToken.toString(), "ether");
}

async function main() {
    const _initialSupply = tokens(50000000);

    const TheBlockChainCoders = await hre.ethers.getContractFactory("TheBlockchainCoders");

    const theBlockChainCoders = await TheBlockChainCoders.deploy(_initialSupply);

    await theBlockChainCoders.deployed();
    console.log(`TheBlockChainCoders: ${theBlockChainCoders.address}`);


    const _tokenPrice = tokens(1);

    const TokenSale = await hre.ethers.getContractFactory("TokenSale");
    const tokenSale = await TokenSale.deploy(theBlockChainCoders.address, _tokenPrice);

    await tokenSale.deployed();
    console.log(`tokenSale: ${tokenSale.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})