import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import { address, abi, provider } from '../contractConfig';


export function useProtosoundContract() {
  const [protosound, setProtosound] = useState<ethers.Contract>();

  useEffect(() => {
    const contract = new ethers.Contract(address, abi, provider);
    contract.deployed().then((c) => {
      setProtosound(c)
    });
  }, []);

  const sign = useCallback(async (signer: JsonRpcSigner) => {
    if (protosound) {
      const contract = protosound.connect(signer);
      return contract;
    }
  }, [protosound]);

  return { protosound, sign };
}