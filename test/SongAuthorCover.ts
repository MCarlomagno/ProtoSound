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

  it("should throw when trying to transfer (Soulbound)", async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();
    songAuthorCover.connect(acc1);
    let tx: ContractTransaction = await songAuthorCover.safeMint(acc1.address, uri);
    await tx.wait();
    let tx2: Promise<ContractTransaction> = songAuthorCover.transferFrom(acc1.address, acc2.address, 0);
    await expect(tx2).to.be.revertedWith('Soulbound tokens cannot be transferred');
  });
});