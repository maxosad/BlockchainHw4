require("@nomicfoundation/hardhat-chai-matchers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

//https://unpkg.com/@uniswap/v2-core@1.0.0/build/IUniswapV2Pair.json
const uniswapPairAbi = require("../contracts/IUniswapV2Pair.json")
//https://unpkg.com/@uniswap/v2-core@1.0.0/build/IUniswapV2Factory.json
const uniswapFactoryAbi = require("../contracts/UniswapFactoryAbi.json")
//https://unpkg.com/@uniswap/v2-periphery@1.1.0-beta.0/build/IUniswapV2Router02.json
const uniswapRouter02Abi = require("../contracts/IUniswapV2Router02.json")




const uniswapFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
const uniswapRouterAddress =  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
describe("Swap", function () {
    let owner

  it("Create Token, Create Pair, Swap", async function () {
        [owner] = await ethers.getSigners()

        const MyToken = await ethers.getContractFactory("MyToken", owner)
        const myToken = await MyToken.deploy()
        await myToken.deployed()

        const YourToken = await ethers.getContractFactory("YourToken", owner)
        const yourToken = await YourToken.deploy()
        await yourToken.deployed()
        

        const factory = await ethers.getContractAt(uniswapFactoryAbi, uniswapFactoryAddress)
        const pair = await factory.createPair(myToken.address, yourToken.address)


        await expect(pair)
                .to.emit(factory, "PairCreated")


        const swapPairMTYTAddress = await factory.getPair(myToken.address, yourToken.address)
        const swapPairMTYTContract = await ethers.getContractAt(uniswapPairAbi, swapPairMTYTAddress)
        const router02Contract = await ethers.getContractAt(uniswapRouter02Abi, uniswapRouterAddress)
        


        await myToken.approve(
          uniswapRouterAddress,
          1000000
        );
        await yourToken.approve(
          uniswapRouterAddress,
          1000000
        );

         await router02Contract.addLiquidity(myToken.address, yourToken.address,  100000, 100000, 250 , 125, owner.address,"1800000000")
  
        tx = await router02Contract.swapExactTokensForTokens(
          10000, // amountIn
          1, // amountOutMin
          [myToken.address, yourToken.address], // path
          owner.address, // to
          2000000000 // deadline
        );
      

        await expect(tx).to.emit(swapPairMTYTContract, "Swap")
  });
});