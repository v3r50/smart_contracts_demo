// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Token20 is ERC20, ERC20Capped, Ownable {

    constructor(uint256 cap_, uint256 initialSupply) 
        ERC20("LexToken", "LEX") 
        ERC20Capped(cap_)
        Ownable(msg.sender)
        {
            _mint(msg.sender, initialSupply);
        }

    function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
    }

    function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Capped)
    {
        super._update(from, to, value);
    }   
}
