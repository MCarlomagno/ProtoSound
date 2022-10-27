// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract VRFv2ConsumerMock {

    uint256 public lastRequestId = 1;

    function requestRandomWords() external pure returns (uint256 requestId) {
        return 1;
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal {
    }

    function getRequestStatus(uint256 _requestId) external pure returns (bool fulfilled, uint256 randomWord) {
        return (true, 0);
    }
}
