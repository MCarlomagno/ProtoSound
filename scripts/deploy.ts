import { ethers } from "hardhat";

async function main() {
  const vrfV2ConsumerAddress = "0x8aBF788e78Bf7A28DC05118346080db7BC35B200";
  const VRFv2Consumer = await ethers.getContractFactory("VRFv2Consumer");
  const vrfV2Consumer = VRFv2Consumer.attach(vrfV2ConsumerAddress);

  const ProtoSound = await ethers.getContractFactory("ProtoSound");
  const protoSound = await ProtoSound.deploy();
  await protoSound.deployed();

  // TODO: add tokens addresses.
  const songCoverAddress = await protoSound.songCoverAddress();
  const songAuthorCoverAddress = await protoSound.songAuthorCoverAddress();
  const songAuthorAudioAddress = await protoSound.songAuthorAudioAddress();

  console.table({
    vrfV2ConsumerAddress: vrfV2Consumer.address,
    protoSoundAddress: protoSound.address,
    songCoverAddress,
    songAuthorCoverAddress,
    songAuthorAudioAddress
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
