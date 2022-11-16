// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MT"){
        _mint(msg.sender, 1000000);
    }
}

