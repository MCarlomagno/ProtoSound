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
    // In Polygon Mumbai 0x8aBF788e78Bf7A28DC05118346080db7BC35B200
    address vrfConsumerAddress ;

    // artistAddress => (collectionId => Collection)
    mapping(address => mapping(uint256 => Collection)) public artistsReleases;

    struct Collection {
        uint256 price;
        uint256[] tokenIds;
    }

    event CollectionReleased(address owner, uint256 collectionId, uint256 price, uint256[] tokenIds);

    constructor(address _vrfConsumerAddress) ERC721("SongCover", "SC") {
        vrfConsumerAddress = _vrfConsumerAddress;
    }

    /**
     * @dev Mints a new collection of NFTs for the artist.
     */
    function multiMint(address to, uint256 price, string[] memory uris) public {
        uint256 collectionId = _collectionIdCounter.current();
        artistsReleases[to][collectionId].price = price;

        for (uint i = 0; i < uris.length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uris[i]);

            // adds the new token to the artist collection release.
            artistsReleases[to][collectionId].tokenIds.push(tokenId);
        }
        _collectionIdCounter.increment();
        emit CollectionReleased(
            to,
            collectionId,
            artistsReleases[to][collectionId].price,
            artistsReleases[to][collectionId].tokenIds
        );
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
    * @dev Transfers the ownership of a given token to another address.
    */
    function transferFromArtistCollection(address from, address to, uint256 collectionId) public {
        uint256[] memory tokenIds = artistsReleases[from][collectionId].tokenIds;
        require(tokenIds.length > 0, "No more tokens available for this release");

        // gets a random index from the release collection.
        uint256 randomNumber = _getRandomNumber();
        uint256 randomIndex = randomNumber % tokenIds.length;
        uint256 tokenId = tokenIds[randomIndex];

        // checks that the receiver is approved for transfering the token.
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
    
        _transfer(from, to, tokenId);
        _removeArtistReleasedTokenId(from, collectionId, randomIndex);
    }

    /**
    * @dev Removes the token id from the artist collection release 
    *      to avoid minting the same token twice.
    */
    function _removeArtistReleasedTokenId(address owner, uint256 collectionId, uint256 index) private {
        uint256[] memory tokenIds = artistsReleases[owner][collectionId].tokenIds;

        // replaces the index to delete by the 
        // last element and pops the array.
        tokenIds[index] = tokenIds[tokenIds.length - 1];
        artistsReleases[owner][collectionId].tokenIds = tokenIds;
        artistsReleases[owner][collectionId].tokenIds.pop();
    }

    /**
    * @dev Gets last random uint256 from a chainlink VRF oracle
    */
    function _getRandomNumber()
        private
        view
        returns(uint256)
    {
        VRFv2Consumer vrfConsumerContract = VRFv2Consumer(vrfConsumerAddress);
        uint256 lastReqId = vrfConsumerContract.lastRequestId();
        (bool success, uint256 randomWord) = vrfConsumerContract.getRequestStatus(lastReqId);
        if (!success) {
            revert("Random word not fulfilled");
        }
        return randomWord;
    }

    /**
    * @dev Requests a new random uint256 to chainlink VRF oracle
    */
    function _requestRandomNumber() private {
        VRFv2Consumer vrfConsumerContract = VRFv2Consumer(vrfConsumerAddress);
        vrfConsumerContract.requestRandomWords();
    }

    /**
    * @dev returns the URI for a given token ID.
    */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
    * @dev returns the price for the collectionId
    */
    function collectionPrice(address owner, uint256 collectionId)
        public
        view
        returns(uint256 price)
    {
        return artistsReleases[owner][collectionId].price;
    }

    function release(address _address, uint256 _collectionId)
        public
        view
        returns(uint256 price, uint256[] memory tokenIds)
    {   
        Collection memory collection = artistsReleases[_address][_collectionId];
        return (collection.price, collection.tokenIds);
    }
}