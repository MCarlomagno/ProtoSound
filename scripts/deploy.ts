import { ethers } from "hardhat";
import dotenv from 'dotenv';

dotenv.config();
const network = process.env.NET as string;

async function main() {
  let hardhatVRFConsumerAddress = "";
  if (network === 'hardhat') {
    const VRFv2ConsumerMock = await ethers.getContractFactory("VRFv2ConsumerMock");
    const vrfV2ConsumerMock = await VRFv2ConsumerMock.deploy();
    await vrfV2ConsumerMock.deployed();
    hardhatVRFConsumerAddress = vrfV2ConsumerMock.address;
  }
  const mumbaiVRFConsumer = "0x8aBF788e78Bf7A28DC05118346080db7BC35B200";

  const vrfV2ConsumerAddress = network === 'hardhat' ?
    hardhatVRFConsumerAddress :
    mumbaiVRFConsumer;
  const VRFv2Consumer = await ethers.getContractFactory("VRFv2Consumer");
  const vrfV2Consumer = VRFv2Consumer.attach(vrfV2ConsumerAddress);

  const ProtoSound = await ethers.getContractFactory("ProtoSound");
  const protoSound = await ProtoSound.deploy(vrfV2ConsumerAddress);
  await protoSound.deployed();

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
