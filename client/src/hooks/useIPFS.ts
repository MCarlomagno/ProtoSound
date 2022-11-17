import * as IPFS from 'ipfs';
import { useCallback, useEffect, useState } from 'react';
import { IPFSNode } from '../IPFS';
import { FileMetadata } from '../types/FileMetadata';
import all from 'it-all';

export function useIPFS() {
  const [ipfs, setIpfs] = useState<IPFS.IPFS>();

  useEffect(() => {
    IPFSNode.getInstance()
      .then((instance) => {
        if (instance && instance.node) {
          setIpfs(instance.node);
        }
      });
  }, []);

  const uploadSingleFile = async (file: File) => {
    if (!ipfs) return;
    const result = await all(ipfs.addAll(file.stream(), {
      preload: true,
    }));
    return result;
  }

  const uploadFiles = useCallback(async (
    files: File[],
    progress = (p: number) => {}
  ) : Promise<FileMetadata[]> => {
    if (!ipfs) throw Error('IPFS not ready');

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
  }, [ipfs] );

  return { ipfs, uploadFiles };
}