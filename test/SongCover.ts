import { SongCover } from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractTransaction } from "ethers";
import dotenv from 'dotenv';

dotenv.config();

const imageUris = [
  process.env.IMAGE_URI1,
  process.env.IMAGE_URI2,
  process.env.IMAGE_URI3,
] as string[];

describe("SongCover", function () {
  let songCover: SongCover;
  beforeEach(async function () {
    const VRFv2ConsumerMock = await ethers.getContractFactory("VRFv2ConsumerMock");
    const vrfV2ConsumerMock = await VRFv2ConsumerMock.deploy();
    const SongCover = await ethers.getContractFactory("SongCover");
    songCover = await SongCover.deploy(vrfV2ConsumerMock.address);
    await songCover.deployed();
  });

  it('should mint a collection', async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();
    // mints 3 tokens.
    songCover = songCover.connect(acc1);
    let tx: ContractTransaction = await songCover.multiMint(acc2.address, 1, imageUris);
    await tx.wait();
    const ownerToken0 = await songCover.ownerOf(0);
    const ownerToken1 = await songCover.ownerOf(1);
    const ownerToken2 = await songCover.ownerOf(2);

    expect(acc2.address).to.be.equal(ownerToken0);
    expect(acc2.address).to.be.equal(ownerToken1);
    expect(acc2.address).to.be.equal(ownerToken2);
  });

  it('should transfer a random token from collection', async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();

    // acc1 represents the
    // contract that acts on behalf of users.
    // The user (acc2) must approve the contract to use its tokens.
    songCover = songCover.connect(acc2);
    const tx: ContractTransaction = await songCover.setApprovalForAll(acc1.address, true);
    await tx.wait();

    // mints 3 tokens.
    songCover = songCover.connect(acc1);
    const tx2: ContractTransaction = await songCover.multiMint(acc2.address, 1, imageUris);
    await tx2.wait();

    // we override the random oracle by
    // a function that always returns 0. So
    // the contract will transfer the tokenId = 0 
    // (first token of the first collection)
    const tx3: ContractTransaction = await songCover.transferFromArtistCollection(acc2.address, acc3.address, 0);
    await tx3.wait();

    const ownerOfFirstTokenId = await songCover.ownerOf(0);
    expect(ownerOfFirstTokenId).to.be.equal(acc3.address);
  });

  it('should transfer a random token from collection', async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();

    // acc1 represents the
    // contract that acts on behalf of users.
    // The user (acc2) must approve the contract to use its tokens.
    songCover = songCover.connect(acc2);
    const tx: ContractTransaction = await songCover.setApprovalForAll(acc1.address, true);
    await tx.wait();

    // mints 3 tokens.
    songCover = songCover.connect(acc1);
    const tx2: ContractTransaction = await songCover.multiMint(acc2.address, 1, imageUris);
    await tx2.wait();

    // transfers all the 3 tokens.
    await songCover.transferFromArtistCollection(acc2.address, acc3.address, 0);
    await songCover.transferFromArtistCollection(acc2.address, acc1.address, 0);
    const tx5: ContractTransaction = await songCover.transferFromArtistCollection(acc2.address, acc3.address, 0);
    await tx5.wait();

    // shuld throw on the next attempt, no more tokens available.
    const transactionToFail: Promise<ContractTransaction> = songCover.transferFromArtistCollection(acc2.address, acc3.address, 0);
    await expect(transactionToFail).to.be.rejectedWith('No more tokens available for this release');
  });
});