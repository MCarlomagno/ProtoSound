import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        process.env.MATIC_ACCOUNT1 as string,
        process.env.MATIC_ACCOUNT2 as string,
        process.env.MATIC_ACCOUNT3 as string
      ]
    }
  },
  solidity: "0.8.17",
};

export default config;
