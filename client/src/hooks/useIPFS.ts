import * as IPFS from 'ipfs';
import { useCallback, useEffect, useState } from 'react';
import { FileMetadata } from '../types/FileMetadata';

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
  const [ready, setReady] = useState<boolean>();
  const [ipfs, setIpfs] = useState<IPFS.IPFS>();

  useEffect(() => {
    setReady(false);
    IPFSNode.getInstance()
      .then((instance) => {
        if (instance && instance.node) {
          setIpfs(instance.node);
          setReady(true);
        }
      });
  }, []);

  const uploadSingleFile = async (file: File) => {
    if (!ipfs) return;
    const chunks = [];
    const result = ipfs.addAll(file.stream(), {
      preload: true,
    });
    for await (const chunk of result) {
      chunks.push(chunk);
    }
    return chunks;
  }

  const uploadFiles = useCallback(async (
    files: FileList,
    progress = (p: number) => {}
  ) : Promise<FileMetadata[]> => {
    if (!ipfs || !ready) throw Error('IPFS not ready');

    const metadata: FileMetadata[] = [];
    for (let f of files) {
      const chunks = await uploadSingleFile(f);
      if (chunks && chunks[0]) {
        const fileMetadata: FileMetadata = {
          name: f.name,
          type: f.type,
          size: f.size,
          cid: chunks[0].cid.toString(),
          path: chunks[0].path,
          url: `https://ipfs.io/ipfs/${chunks[0].path}`
        };
        metadata.push(fileMetadata);
        progress((metadata.length / files.length) * 100)
      }
    }
    return metadata;
  }, [ipfs, ready] );

  return {ipfs, ready, uploadFiles };
}