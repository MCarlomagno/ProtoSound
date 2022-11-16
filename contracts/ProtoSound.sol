// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SongCover.sol";
import "./SongAuthorCover.sol";
import "./SongAudio.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProtoSound is Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _songIdCounter;

    // address of the SongCover NFT token.
    address public songCoverAddress;

    // address of the soulbound cover.
    address public songAuthorCoverAddress;

    // address of the soulbound audio
    address public songAuthorAudioAddress;

    mapping(address => uint256[]) public songs;

    // songId => SongMetadata
    mapping(uint256 => SongMetadata) public songMetadata;

    struct SongMetadata {
        uint256 price;
        string name;
        uint256 authorCoverTokenId;
        uint256 authorAudioTokenId;
        uint256 coverCollectionId;
    }

    constructor(address _vrfConsumerAddress) {
        SongCover songCover = new SongCover(_vrfConsumerAddress);
        songCoverAddress = address(songCover);

        SongAuthorCover songAuthorCover = new SongAuthorCover();
        songAuthorCoverAddress = address(songAuthorCover);

        SongAudio songAudio = new SongAudio();
        songAuthorAudioAddress = address(songAudio);
    }

    function mintSong(
        uint256 price,
        string memory name,
        string memory authorCoverUri,
        string memory audioUri,
        string[] memory tokenUris
    ) public {
        uint256 songId = _songIdCounter.current();

        SongCover songCover = SongCover(songCoverAddress);
        SongAuthorCover songAuthorCover = SongAuthorCover(songAuthorCoverAddress);
        SongAudio songAudio = SongAudio(songAuthorAudioAddress);

        uint256 authorCoverTokenId = songAuthorCover.safeMint(msg.sender, authorCoverUri);
        uint256 authorAudioTokenId = songAudio.safeMint(msg.sender, audioUri);
        uint256 coverCollectionId = songCover.multiMint(msg.sender, price, tokenUris, name);

        songMetadata[songId].name = name;
        songMetadata[songId].price = price;
        songMetadata[songId].authorCoverTokenId = authorCoverTokenId;
        songMetadata[songId].authorAudioTokenId = authorAudioTokenId;
        songMetadata[songId].coverCollectionId = coverCollectionId;
        songs[msg.sender].push(songId);
        _songIdCounter.increment();
    }

    function transferSongCover(address payable artist, uint256 collectionId) public payable {
        SongCover songCover = SongCover(songCoverAddress);
        uint256 price = songCover.collectionPrice(artist, collectionId);

        require(msg.value >= price, "Must send a value equal or greater to the price of the token");

        // transfers the ownership of the token to the buyer.
        songCover.transferFromArtistCollection(artist, msg.sender, collectionId);

        // transfers the price of the token to the artist.
        (bool sent,) = artist.call{value: price}("");
        require(sent, "Failed to send transaction");
    }

    function updateSongCoverAddress(address _address) public onlyOwner {
        songCoverAddress = _address;
    }

    function updateSongAuthorCoverAddress(address _address) public onlyOwner {
        songAuthorCoverAddress = _address;
    }

    function updateSongAuthorAudioAddress(address _address) public onlyOwner {
        songAuthorAudioAddress = _address;
    }

    function songsAmount(address addr) public view returns (uint256) {
        return songs[addr].length;
    }

    function getSongs(address addr) public view returns(uint256[] memory) {
        return songs[addr];
    }
}