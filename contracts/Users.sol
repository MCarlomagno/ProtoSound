// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Users is Ownable {

    mapping(address => User) users;

    struct User {
        string nick;
    }

    function create(address _address,string memory _nick) public {
        User memory user;
        user.nick = _nick;
        users[_address] = user;
    }

    function changeNick(address _address, string memory _nick) public {
        User memory user = users[_address];
        user.nick = _nick;
        users[_address] = user;
    }
}