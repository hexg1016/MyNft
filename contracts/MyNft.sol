//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface ConsumeToken {
    function transfer(address to, uint256 value) external returns (bool success); 
    function balanceOf(address account) external returns (uint256); 
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) ;
}

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    ConsumeToken mt;
    Counters.Counter private _tokenIds;

    constructor()  ERC721("MyNFT", "NFT") {
        mt=ConsumeToken(0xc46533A8c02aA8C516Eb6Fc27104d69945414630);
    }

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    function buyNFT(uint256 ammount, string memory tokenURI)
        public payable
        returns (uint256)
    {
        require(mt.balanceOf(msg.sender)>ammount,"balance not enough" );
        mt.transferFrom(msg.sender,0x2EEAd985920f690232a3AC68EA64f96D638F5Eda, ammount);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
