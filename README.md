# ProtoSound 🎵

## Running this project

Install dependencies.

```shell
yarn install
```

Compile contracts

```shell
yarn hardhat compile
```

Add your private key opening `.env` or creating one

```shell
PRIVATE_KEY='...'
```

Deploy contracts to default network (Polygon Mumbai)

```shell
yarn hardhat run scripts/deploy.ts 
```
