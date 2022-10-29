import './App.css';
import { useCallback, useRef, useState } from 'react';
import { useIPFS } from './hooks/useIPFS';

function App() {
  const [cid, setCid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const file = useRef<File>();
  const ipfs = useIPFS();

  const handleOnChange = (files: FileList | null) => {
    if (!files) return;
    console.log(files[0]);
    file.current = files[0];
  };

  const submit = useCallback(async () => {
    if (!file.current || !ipfs) return;
    setLoading(true);
    const result = await ipfs.add(file.current);
    setLoading(false);
    setCid(result.cid.toString());
    console.log('done!');
  }, [file.current, ipfs] );

  return (
    <div className="App">
      <h1>IPFS file Upload</h1>
      <input type="file" onChange={(e) => handleOnChange(e.target.files)} />
      <button onClick={submit}>Upload</button>
      {loading && <div>Loading...</div>}
      {cid && <div>your IPFS url is: https://ipfs.io/ipfs/{cid}</div>}
    </div>
  )
}

export default App
