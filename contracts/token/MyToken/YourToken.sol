// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC20/ERC20.sol";

contract YourToken is ERC20 {
    constructor() ERC20("YourToken", "YT"){
        _mint(msg.sender, 1000000);
    }
}

