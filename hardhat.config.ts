import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        process.env.ACCOUNT1 as string,
        process.env.ACCOUNT2 as string,
        process.env.ACCOUNT3 as string
      ]
    }
  },
  solidity: "0.8.17",
};

export default config;
