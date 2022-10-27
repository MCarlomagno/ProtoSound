import {ethers} from 'hardhat';
import dotenv from 'dotenv';
import { expect } from 'chai';
import { Contract, ContractTransaction } from 'ethers';
import { SongAudio } from '../typechain-types';

dotenv.config();

const uri = process.env.AUDIO_URI as string;

describe("SongAudio", function () {
  let songAudio: SongAudio;
  beforeEach(async function () {
    const SongAudio = await ethers.getContractFactory("SongAudio");
    songAudio = await SongAudio.deploy();
    await songAudio.deployed();
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

  it("should throw when trying to transfer (Soulbound)", async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();
    songAudio.connect(acc1);
    let tx: ContractTransaction = await songAudio.safeMint(acc1.address, uri);
    await tx.wait();
    let tx2: Promise<ContractTransaction> = songAudio.transferFrom(acc1.address, acc2.address, 0);
    await expect(tx2).to.be.revertedWith('Soulbound tokens cannot be transferred');
  });
});