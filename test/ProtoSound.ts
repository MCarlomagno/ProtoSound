import { expect } from "chai";
import { ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { ProtoSound, SongAudio, SongAuthorCover, SongCover } from "../typechain-types";
import dotenv from 'dotenv';

dotenv.config()

describe("ProtoSound", function () {
  var protoSound: ProtoSound;
  var songCover: SongCover;
  var songAudio: SongAudio;
  var songAuthorCover: SongAuthorCover;

  const authorCoverUri: string = process.env.IMAGE_URI1 as string;
  const audioUri: string = process.env.AUDIO_URI as string;
  const tokenUris: string[] = [
    process.env.IMAGE_URI1,
    process.env.IMAGE_URI2,
    process.env.IMAGE_URI3
  ] as string[];
  const songName = 'test_name';

  beforeEach(async () => {
    // instances the VRFConsumer mock contract
    const VRFv2ConsumerMock = await ethers.getContractFactory("VRFv2ConsumerMock");
    const vrfV2ConsumerMock = await VRFv2ConsumerMock.deploy();
    await vrfV2ConsumerMock.deployed();

    // instances the protoSound contract
    const ProtoSound = await ethers.getContractFactory("ProtoSound");
    protoSound = await ProtoSound.deploy(vrfV2ConsumerMock.address);
    await protoSound.deployed();

    // instances the songCover contract
    const SongCover = await ethers.getContractFactory("SongCover");
    const songCoverAddress = await protoSound.songCoverAddress();
    songCover = SongCover.attach(songCoverAddress);

    // instances the SongAudio contract
    const SongAudio = await ethers.getContractFactory("SongAudio");
    const songAudioAddress = await protoSound.songAuthorAudioAddress();
    songAudio = SongAudio.attach(songAudioAddress);

    // instances the SongAuthorCover contract
    const SongAuthorCover = await ethers.getContractFactory("SongAuthorCover");
    const songAuthorCoverAddress = await protoSound.songAuthorCoverAddress();
    songAuthorCover = SongAuthorCover.attach(songAuthorCoverAddress);
  });

  it('Should mint SongCover, SongAuthorCover and SongAudio tokens', async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();

    // acc2 connects and approves ProtoSound to manage its tokens.
    protoSound = protoSound.connect(acc2);
    const tx: ContractTransaction = await songCover.setApprovalForAll(protoSound.address, true);
    await tx.wait();

    // acc2 mints a song.
    const tx3: ContractTransaction = await protoSound.mintSong(1, songName, authorCoverUri, audioUri, tokenUris);
    await tx3.wait();

    const songAudioOwner = await songAudio.ownerOf(0);
    const songAuthorCoverOwner = await songAuthorCover.ownerOf(0);
    const songCover0Owner = await songCover.ownerOf(0);
    const songCover1Owner = await songCover.ownerOf(1);
    const songCover2Owner = await songCover.ownerOf(2);

    expect(songAudioOwner).to.be.equal(acc2.address);
    expect(songAuthorCoverOwner).to.be.equal(acc2.address);
    expect(songCover0Owner).to.be.equal(acc2.address);
    expect(songCover1Owner).to.be.equal(acc2.address);
    expect(songCover2Owner).to.be.equal(acc2.address);
  });


  it('Should transfer SongCover token', async () => {
    const [acc1, acc2, acc3] = await ethers.getSigners();
    
    // 0.001 eth
    const price = 1000000000000000;

    // acc2 connects and approves ProtoSound to manage its SongCover tokens.
    songCover = songCover.connect(acc2);
    protoSound = protoSound.connect(acc2);
    const tx3: ContractTransaction = await songCover.setApprovalForAll(protoSound.address, true);
    await tx3.wait();
    
    // acc2 mints a song with Price = 1 wei
    const tx4: ContractTransaction = await protoSound.mintSong(price, songName, authorCoverUri, audioUri, tokenUris);
    await tx4.wait();

    // check ownership of the first token
    const songCover0Owner = await songCover.ownerOf(0);
    expect(songCover0Owner).to.be.equal(acc2.address);

    // check balances before transaction
    const acc2BalanceBefore = await acc2.getBalance();
    const acc3BalanceBefore = await acc3.getBalance();

    // acc2 connects buys the song cover created by acc2 sending 1 wei value
    protoSound = protoSound.connect(acc3);
    const tx5: ContractTransaction = await protoSound.transferSongCover(acc2.address, 0, {value: price});
    await tx5.wait();

    // check balances after transaction
    const acc2BalanceAfter = await acc2.getBalance();
    const acc3BalanceAfter = await acc3.getBalance();

    // check balances updated
    expect(Number(acc3BalanceAfter)).to.be.lessThan(Number(acc3BalanceBefore.sub(price)));
    expect(Number(acc2BalanceAfter)).to.be.equal(Number(acc2BalanceBefore.add(price)));

    // check ownership of the first token
    const songCover0NewOwner = await songCover.ownerOf(0);
    expect(songCover0NewOwner).to.be.equal(acc3.address);
  });
});