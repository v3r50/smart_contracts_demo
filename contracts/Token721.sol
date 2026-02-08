// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token721 is ERC721, Ownable {
    constructor() ERC721("LexNFT", "LEX") Ownable(msg.sender) {}

    event Minted(address indexed to, uint256 indexed tokenId);

    uint256 private _nextTokenId = 1;

    function mint(address to) external onlyOwner {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(to, tokenId);

        emit Minted(to, tokenId);
    }

    string private _baseTokenURI;
    
    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}