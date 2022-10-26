// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SongCover.sol";
import "./SongAuthorCover.sol";
import "./SongAudio.sol";

contract ProtoSound is Ownable {

    // address of the SongCover NFT token.
    address songCoverAddress;

    // address of the soulbound cover.
    address songAuthorCoverAddress;

    // address of the soulbound audio.
    address songAuthorAudioAddress;

    mapping(address => User) public users;

    struct User {
        string nick;
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
        User memory user;
        user.nick = _nick;
        users[_address] = user;
    }

    function changeNick(address _address, string memory _nick) public onlyOwner {
        User memory user = users[_address];
        user.nick = _nick;
        users[_address] = user;
    }

    function mintSong(
        uint256 price,
        string memory authorCoverUri,
        string memory audioUri,
        string[] memory tokenUris
    ) public {
        SongCover songCover = SongCover(songCoverAddress);
        SongAuthorCover songAuthorCover = SongAuthorCover(songAuthorCoverAddress);
        SongAudio songAudio = SongAudio(songAuthorAudioAddress);

        songAuthorCover.safeMint(msg.sender, authorCoverUri);
        songAudio.safeMint(msg.sender, audioUri);
        songCover.multiMint(msg.sender, price, tokenUris);
    }

    function transferSongCover(address payable from, uint256 collectionId) public payable {
        SongCover songCover = SongCover(songCoverAddress);
        uint256 price = songCover.collectionPrice(from, collectionId);
        require(msg.value >= price, "Must send a value equal or greater to the price of the token");

        // transfers the ownership of the token to the buyer.
        songCover.transferFromArtistCollection(from, msg.sender, collectionId);

        // transfers the price of the token to the artist.
        (bool sent,) = from.call{value: price}("");
        require(sent, "Failed to send transaction");
    }
}