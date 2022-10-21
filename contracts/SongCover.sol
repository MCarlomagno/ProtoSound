// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./VRFv2Consumer.sol";

contract SongCover is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _collectionIdCounter;

    // address of the random number oracle.
    address _vrfConsumerAddress = 0x8aBF788e78Bf7A28DC05118346080db7BC35B200;

    struct Collection {
        uint256 start;
        uint256 end;
    }

    mapping(address => mapping(uint256 => Collection)) public ownerCollections;

    constructor() ERC721("SongCover", "SC") {}

    function multiMint(address to, string[] memory uris) public onlyOwner {
        uint length = uris.length;

        Collection memory collection;
        collection.start = _tokenIdCounter.current();
        collection.end = _tokenIdCounter.current() + length - 1;

        for (uint i = 0; i < length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uris[i]);
        }

        uint256 collectionId = _collectionIdCounter.current();
        _collectionIdCounter.increment();
        ownerCollections[to][collectionId] = collection;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function transfer(address from, address to, uint256 collectionId)
        public
    {
        Collection memory currentCollection = ownerCollections[from][collectionId];
        require(currentCollection.start < currentCollection.end, "No more NFTs available");

        bool isPair = _getRandomNumber() % 2 == 0;

        uint256 tokenId;
        if (isPair) {
            tokenId = currentCollection.start;
            currentCollection.start++;
        } else {
            tokenId = currentCollection.end;
            currentCollection.end--;
        }
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        _transfer(from, to, tokenId);
    }

    function _getRandomNumber()
        private
        view
        returns(uint256)
    {
        VRFv2Consumer vrfConsumerContract = VRFv2Consumer(_vrfConsumerAddress);
        uint256 lastReqId = vrfConsumerContract.lastRequestId();
        (bool success, uint256 randomWord) = vrfConsumerContract.getRequestStatus(lastReqId);
        if (!success) {
            revert("Random word not fulfilled");
        }
        return randomWord;
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