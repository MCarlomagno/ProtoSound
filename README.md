# ProtoSound 🎵

### Running this project

Install dependencies.

```shell
yarn install
```

Compile contracts

```shell
yarn hardhat compile
```

### Testing

Run local hardhat node

```shell
yarn hardhat node
```

Add your account private keys and token URIs opening `.env` or creating one

```shell
HARDHAT_ACCOUNT1='...'
HARDHAT_ACCOUNT2='...'
HARDHAT_ACCOUNT3='...'

# For running tests
AUDIO_URI='https://...'
IMAGE_URI1='https://...'
IMAGE_URI2='https://...'
IMAGE_URI3='https://...'

# For testing on Polygon Mumbai
MATIC_ACCOUNT1='...'
MATIC_ACCOUNT2='...'
MATIC_ACCOUNT3='...'

# defines the network to use during deployment
# 'matic' | 'hardhat'
NET='...'
```

Run tests, by default runs in local hardhat node

```shell
yarn hardhat test
```

Optionally you can run them in **Polygon Mumbai**
> :warning: It might take several minutes to run all the tests.

```shell
yarn hardhat test --network matic
```

### Deployment

Deploy contracts to default network (local hardhat)

```shell
yarn hardhat run scripts/deploy.ts 
```

Or deploy to **Polygon Mumbai** 

```shell
yarn hardhat run scripts/deploy.ts --network matic
```

### How it works?

<div align="center">
<img src="https://raw.githubusercontent.com/MCarlomagno/ProtoSound/main/docs/contracts.png" alt="Contracts"/>
</div>

The `ProtoSound` contract allows users to create songs setting a price and minting 3 types of tokens, an `AuthorSongCover` Soulbound token, an `AuthorSongAudio` Soulbound token, and a collection of `SongCover` NFT tokens. 

When another user wants to buy and consume a song, after paying the price, one of the mentioned `SongCover` tokens are randomly selected from the collection and transferred to the buyer. Aquiring a new NFT token plus the song itself.
