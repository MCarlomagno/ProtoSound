import * as IPFS from 'ipfs';
import { useEffect, useState } from 'react';

// we use singleton pattern to prevent
// instantiating multiple nodes from the same client.
class IPFSNode {
  private static instance: IPFSNode;
  node: IPFS.IPFS | undefined;

  private constructor() {}

  private async init() {
    this.node = await IPFS.create();
  }

  public static async getInstance(): Promise<IPFSNode> {
      if (!IPFSNode.instance) {
        IPFSNode.instance = new IPFSNode();
        await IPFSNode.instance.init();
      }

      return IPFSNode.instance;
  }
}

export function useIPFS() {
  const [ipfs, setIpfs] = useState<IPFS.IPFS>();

  useEffect(() => {
    IPFSNode.getInstance()
      .then((ipfs) => setIpfs(ipfs.node));
  }, [IPFSNode]);

  return ipfs;
}