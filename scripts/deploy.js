const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const UniSwapEthUsdc = await ethers.getContractFactory("UniSwapEthUsdc");
    const uniSwapEthUsdc = await UniSwapEthUsdc.deploy();

    console.log("Contract address:", uniSwapEthUsdc.address);
}
// 0x854F47bE40Db52af552b9B86F14fE931636f79a0 contract deployed on this address
// npx hardhat verify --network sepolia 0x854F47bE40Db52af552b9B86F14fE931636f79a0


// Successfully verified contract UniSwapEthUsdc on Etherscan.
// https://sepolia.etherscan.io/address/0x854F47bE40Db52af552b9B86F14fE931636f79a0#code


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
