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

Add your account private keys opening `.env` or creating one

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
```

Run tests, by default runs in local hardhat node, but optionally you can run them in **Polygon Mumbai**


```shell
yarn hardhat test [--network matic]
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

