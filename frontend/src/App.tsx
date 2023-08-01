// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChangeEvent, MouseEvent, useState } from 'react'
import './App.css'

function App() {
  const API_BASE_URL = 'http://localhost:3000/api/v1';

  const [file, setFile] = useState(null as unknown as File);


  const onFileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;

    setFile(files[0]);
  };

  async function uploadFile(e: MouseEvent) {
    e.preventDefault();

    if (file === null) return;

    const body = new FormData();

    body.append(file.name, file);

    const response = await fetch(`${API_BASE_URL}/uploadFile`, {
      method: "post",
      body
    });

    const result = await response.json();

    console.log(result);
  }


  return (
    <>
      <form>
        <input
          type="file"
          name="csvInput"
          id="csvInput"
          accept='.csv'
          onChange={onFileChange}
        />
        <button onClick={uploadFile} disabled={file ? false : true}>Send</button>
      </form>
    </>
  )
}

export default App