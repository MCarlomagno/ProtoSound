import { ethers } from "hardhat";

async function main() {
  /**
   * 1. Deploy VRFConsumer contract to address 0x8aBF788e78Bf7A28DC05118346080db7BC35B200. Must be barcoded due to the chainlink configuration.
   * 2. Deploy ProtoSound contract.
   */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
