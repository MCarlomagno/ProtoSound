import './App.css';
import * as IPFS from 'ipfs';
import { useEffect, useState } from 'react';

function App() {
  const [cid, setCid] = useState<string>('');
  const [node, setNode] = useState<any>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    IPFS.create().then(setNode);
  }, []);

  const upload = async () => {
    const result = await node.add(text);
    setCid(result.cid.toString());
    console.log('done!');
  }

  const download = async () => {
    const stream = node.cat(cid)
    const decoder = new TextDecoder()
    let data = ''
    for await (const chunk of stream) {
      data += decoder.decode(chunk, { stream: true })
    }
    console.log(data)
  }

  return (
    <div className="App">
      <div>Upload a text to ipfs</div>
      <input type="text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={upload}>Upload</button>

      {cid && <div>your IPFS url is: https://ipfs.io/ipfs/{cid}</div>}

      <div>Now donwload it</div>
      <button onClick={download}>donwload</button>
    </div>
  )
}

export default App
