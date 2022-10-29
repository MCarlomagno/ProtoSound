import './App.css';
import { useRef, useState } from 'react';
import * as IPFS from 'ipfs';

// IPFS node should be instantiated a single time for a repo
let ipfs: IPFS.IPFS | undefined;
IPFS.create().then(((ipfsInstance: any) => ipfs = ipfsInstance))

function App() {
  const [cid, setCid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const file = useRef<File>();


  const handleOnChange = (files: FileList | null) => {
    if (!files) return;
    console.log(files[0]);
    file.current = files[0];
  };

  const submit = async () => {
    if (!file.current || !ipfs) return;
    setLoading(true);
    const result = await ipfs.add(file.current);
    setLoading(false);
    setCid(result.cid.toString());
    console.log('done!');
  };

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
