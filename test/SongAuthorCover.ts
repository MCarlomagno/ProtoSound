import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractTransaction } from "ethers";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.AUDIO_URI as string;

describe("SongAuthorCover", function () {
  let songAuthorCover: Contract;
  beforeEach(async function () {
    const SongAuthorCover = await ethers.getContractFactory("SongAuthorCover");
    songAuthorCover = await SongAuthorCover.deploy();
    await songAuthorCover.deployed();
    console.log("song author cover deployed to address", songAuthorCover.address);
  });

  it("should mint a SongAuthorCover token", async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();
    let tx: ContractTransaction = await songAuthorCover.safeMint(acc2.address, uri);
    await tx.wait();
    const owner: string = await songAuthorCover.ownerOf('0');
    const tokenUri: string = await songAuthorCover.tokenURI('0');
    expect(owner).to.equal(acc2.address);
    expect(tokenUri).to.equal(uri);
  });
});