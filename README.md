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

Add your account private keys opening `.env` or creating one

```shell
ACCOUNT1='...'
ACCOUNT2='...'
ACCOUNT3='...'
```

Deploy contracts to default network (Polygon Mumbai)

```shell
yarn hardhat run scripts/deploy.ts 
```
