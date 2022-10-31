import './App.css';
import { useCallback, useRef, useState } from 'react';
import { useIPFS } from './hooks/useIPFS';

function App() {
  const [path, setPath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const file = useRef<File>();
  const ipfs = useIPFS();

  const handleSingleOnChange = (files: FileList | null) => {
    if (!files) return;
    console.log(files[0]);
    file.current = files[0];
  };

  const uploadFile = useCallback(async (file: File) => {
    if (!ipfs) return;
    const chunks = [];
    const result = ipfs.addAll(file.stream(), {
      preload: true,
    });
    for await (const chunk of result) {
      chunks.push(chunk);
    }
    return chunks;
  }, [ipfs] );

  const submit = useCallback(async () => {
    if (!file.current || !ipfs) return;
    setLoading(true);
    const chunks = await uploadFile(file.current);
    if (chunks && chunks[0]) {
      setPath(chunks[0].path);
    } 
    setLoading(false);
  }, [file.current, ipfs] );

  const [loadingMulti, setLoadingMulti] = useState<boolean>(false);
  const filesRef = useRef<FileList>();

  const handleMultipleOnChange = (files: FileList | null) => {
    if (!files) return;
    filesRef.current = files;
  };

  const submitMulti = useCallback(async () => {
    if (!filesRef.current || !ipfs) return;
    setLoadingMulti(true);
    for (let f of filesRef.current) {
      const chunks = await uploadFile(f);
      if (chunks && chunks[0]) {
        console.log('upload result', `https://ipfs.io/ipfs/${chunks[0].path}`)
      }
      console.log('file uploaded', f.name);
    }

    setLoadingMulti(false);
  }, [file.current, ipfs] );

  return (
    <div className="App">
      <h1>IPFS single Upload</h1>
      <input type="file" onChange={(e) => handleSingleOnChange(e.target.files)} />
      <button onClick={submit}>Upload</button>
      {loading && <div>Loading...</div>}
      {!loading && path && <div>your IPFS url is: https://ipfs.io/ipfs/{path}</div>}

      <h1>IPFS multiple Upload</h1>
      <input type="file" multiple onChange={(e) => handleMultipleOnChange(e.target.files)} />
      <button onClick={submitMulti}>Upload</button>
      {loadingMulti && <div>Loading...</div>}
    </div>
  )
}

export default App
