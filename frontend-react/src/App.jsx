import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState([]);
  async function upload() {
    console.log(file);

    const fileName = file.name;
    const fileType = file.type;

    try {
      const resp = await fetch(
        `http://localhost:3000/generate-presigned-url?fileName=${fileName}&fileType=${fileType}`
      );
      const data = await resp.json();
      const { url } = data;

      console.log(url);

      await axios.put(url, file, {
        headers: {
          "Content-Type": fileType,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="text-3xl text-center py-4">Everything App</div>
        <div className="flex flex-col items-center gap-8">
          <div className="text-2xl">Upload a photo</div>
          <input
            className="text-2xl"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={upload}
            className="rounded-xl p-2 bg-green-600 text-white text-xl"
          >
            Upload
          </button>
        </div>
        <img className="py-8" src="" alt="img" />
      </div>
    </div>
  );
}

export default App;
