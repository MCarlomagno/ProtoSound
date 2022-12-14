// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SongAudio is ERC721, ERC721URIStorage, Ownable {     
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Mint(address to, string uri, uint256 id);

    constructor() ERC721("SongAudio", "SA") {}

    function safeMint(address to, string memory uri) public onlyOwner returns(uint256 id){
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit Mint(to, uri, tokenId);
        return tokenId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal override(ERC721)
    {
      require(from == address(0), "Soulbound tokens cannot be transferred");
      super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}