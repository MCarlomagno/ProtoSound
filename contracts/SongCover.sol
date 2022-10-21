// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SongCover is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct LastCollection {
        uint256 start;
        uint256 end;
    }

    mapping(address => LastCollection) public ownerLastMintedCollection;

    constructor() ERC721("SongCover", "SC") {}

    function safeMint(address to, string[] memory uris) public onlyOwner {
        uint length = uris.length;

        LastCollection memory lastCollection;
        lastCollection.start = _tokenIdCounter.current();
        for (uint i = 0; i < length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uris[i]);
        }
        lastCollection.end = _tokenIdCounter.current() - 1;

        ownerLastMintedCollection[to] = lastCollection;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId)
        public
        override(ERC721)
    {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        // must pick a token id between 
        // ownerLastMintedCollection[from].start - ownerLastMintedCollection[from].end
        _transfer(from, to, tokenId);
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