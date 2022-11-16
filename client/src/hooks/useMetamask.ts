import * as ethers from 'ethers';
import {
  JsonRpcSigner, 
  Network, 
  Web3Provider 
} from '@ethersproject/providers';
import { useState } from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

const NETWORK = 80001;

function useMetamask() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [network, setNetwork] = useState<Network | null>(null);

  const setupProvider = () => {
    if (!window.ethereum) throw Error('Could not find Metamask extension');
    if (provider) return provider;

    const newProvider = new Web3Provider(window.ethereum);
    setProvider(newProvider);

    window.ethereum.on('accountsChanged', (acc: string[]) => {
      setAccounts(acc);
    });

    window.ethereum.on('chainChanged', (net: any) => {
      setNetwork({ 
        chainId: Number(net), 
        name: Number(net) === NETWORK ? 'Mumbai' : 'Invalid Network'
      });
    });

    return newProvider
  }
  
  const connect = async () => {
    const provider = setupProvider();
    const accounts: string[] = await provider.send("eth_requestAccounts", []);
    const network: Network = await provider.getNetwork();
    const signer: JsonRpcSigner = provider.getSigner();
    setNetwork(network);
    setAccounts(accounts);
    setSigner(signer);
  }

  const getAccounts = async () => {
    const provider = setupProvider();
    const accounts: string[] = await provider.send("eth_accounts", []);
    setAccounts(accounts);
    return accounts;
  }

  const getNetwork = async () => {
    const provider = setupProvider();
    const network: Network = await provider.getNetwork();
    setNetwork(network);
    return network;
  }

  const sendTransaction = async (from: string, to: string, valueInEther: string) =>  {
    const provider = setupProvider();
    const params = [{
      from,
      to,
      value: ethers.utils.parseUnits(valueInEther, 'ether').toHexString()
    }];
    const transactionHash = await provider.send('eth_sendTransaction', params);
    return transactionHash;
  }

  return { 
    signer,
    accounts,
    network,
    connect,
    getAccounts,
    getNetwork,
    sendTransaction
  }
}

export { useMetamask }