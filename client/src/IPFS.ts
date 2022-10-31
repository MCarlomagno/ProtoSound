import * as IPFS from 'ipfs';

// we use singleton pattern to prevent
// instantiating multiple nodes from the same client.
export class IPFSNode {
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