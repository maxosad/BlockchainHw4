contracts for tokens
MyToken.sol
YourToken.sol


put your key in .env
.env example 

```
ALCHEMY_API_KEY=123456789qwertyuiasdfghjkzxcvbnw
```

Test
Creates 2 tokens.
Creates uniswap pair for them
add liquidity for that pair 
make swap 


```
npx hardhat test

  Swap
    √ Create Token, Create Pair, Swap (6553ms)


  1 passing (7s)
```
