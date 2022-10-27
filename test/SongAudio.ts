import {ethers} from 'hardhat';
import dotenv from 'dotenv';
import { expect } from 'chai';
import { Contract, ContractTransaction } from 'ethers';

dotenv.config();

const uri = process.env.AUDIO_URI as string;

describe("SongAudio", function () {
  let songAudio: Contract;
  beforeEach(async function () {
    const SongAudio = await ethers.getContractFactory("SongAudio");
    songAudio = await SongAudio.deploy();
    await songAudio.deployed();
    console.log("song audio deployed to address", songAudio.address);
  });

  it("should mint a SongAudio token", async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();
    let tx: ContractTransaction = await songAudio.safeMint(acc2.address, uri);
    await tx.wait();
    const owner: string = await songAudio.ownerOf('0');
    const tokenUri: string = await songAudio.tokenURI('0');
    expect(owner).to.equal(acc2.address);
    expect(tokenUri).to.equal(uri);
  });
});