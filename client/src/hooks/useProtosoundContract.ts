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

  const sign = useCallback(async (signer: ethers.Signer) => {
    if (protosound) {
      const contract = protosound.current.connect(signer);
      setProtosound(contract);
    }
  }, [protosound]);

  return { protosound };
}