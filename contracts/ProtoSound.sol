// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SongCover.sol";
import "./SongAuthorCover.sol";
import "./SongAudio.sol";

contract ProtoSound is Ownable {

    // address of the SongCover NFT token.
    address public songCoverAddress;

    // address of the soulbound cover.
    address public songAuthorCoverAddress;

    // address of the soulbound audio
    address public songAuthorAudioAddress;

    mapping(address => User) public users;

    struct User {
        string nick;
        bool active;
    }

    constructor(
        address _songCoverAddress,
        address _songAuthorCoverAddress,
        address _songAuthorAudioAddress
    ) {
        songCoverAddress = _songCoverAddress;
        songAuthorCoverAddress = _songAuthorCoverAddress;
        songAuthorAudioAddress = _songAuthorAudioAddress;
    }

    function create(address _address,string memory _nick) public onlyOwner {
        users[_address].nick = _nick;
        users[_address].active = true;
        SongCover songCover = SongCover(songCoverAddress);
        songCover.setApprovalForAll(address(this), true);
    }

    function changeNick(address _address, string memory _nick) public onlyOwner {
        require(users[_address].active, "User not found");
        users[_address].nick = _nick;
    }

    function mintSong(
        uint256 price,
        string memory authorCoverUri,
        string memory audioUri,
        string[] memory tokenUris
    ) public {
        require(users[msg.sender].active, "User not found");
        SongCover songCover = SongCover(songCoverAddress);
        SongAuthorCover songAuthorCover = SongAuthorCover(songAuthorCoverAddress);
        SongAudio songAudio = SongAudio(songAuthorAudioAddress);

        songAuthorCover.safeMint(msg.sender, authorCoverUri);
        songAudio.safeMint(msg.sender, audioUri);
        songCover.multiMint(msg.sender, price, tokenUris);
    }

    function transferSongCover(address payable artist, uint256 collectionId) public payable {
        require(users[artist].active, "Artist not found");
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
}