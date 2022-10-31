import './App.css';
import { useCallback, useRef, useState } from 'react';
import { useIPFS } from './hooks/useIPFS';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const files = useRef<FileList>();
  const ipfs = useIPFS();

  const handleOnChange = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    files.current = fileList;
  }, []);

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
    if (!files.current || !ipfs) return;
    setLoading(true);
    for (let f of files.current) {
      const chunks = await uploadFile(f);
      if (chunks && chunks[0]) {
        console.log('Upload result', `https://ipfs.io/ipfs/${chunks[0].path}`)
      }
    }
    setLoading(false);
  }, [files, ipfs] );

  return (
    <div className="App">
      <h1>IPFS Uploader</h1>
      <input type="file" onChange={(e) => handleOnChange(e.target.files)} multiple/>
      <button onClick={submit}>Upload</button>
      {loading && <div>Loading...</div>}
    </div>
  )
}

export default App
