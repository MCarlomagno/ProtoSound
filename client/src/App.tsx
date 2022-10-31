import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIPFS } from './hooks/useIPFS';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const files = useRef<FileList>();
  const { ready, uploadFiles } = useIPFS();

  // loading until IPFS is ready
  useEffect(() => {
    setLoading(!ready);
  }, [ready]);

  const handleOnChange = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    files.current = fileList;
  }, []);

  const submit = useCallback(async () => {
    if (!files.current) return;
    setLoading(true);
    await uploadFiles(files.current);
    setLoading(false);
  }, [files, uploadFiles]);

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
