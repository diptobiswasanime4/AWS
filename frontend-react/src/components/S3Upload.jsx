import { useEffect, useState } from "react";
import axios from "axios";

function S3Upload() {
  const [file, setFile] = useState([]);
  const [curFile, setCurFile] = useState("");

  useEffect(() => {
    console.log(curFile);
    console.log(
      "https://s3.amazonaws.com/nodejssdk.bucket2.diptobiswas/" + curFile
    );
  }, [curFile]);

  async function upload() {
    let fileName = file.name;
    let fileType = file.type;

    fileName = fileName + `_${Math.floor(Math.random() * 1000)}`;

    try {
      const resp = await fetch(
        `http://localhost:3000/generate-presigned-url?fileName=${fileName}&fileType=${fileType}`
      );
      const data = await resp.json();
      const { url } = data;

      await axios.put(url, file, {
        headers: {
          "Content-Type": fileType,
        },
      });

      setCurFile(fileName);
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
        <img
          className="my-8 border-2 rounded-full"
          src={
            "https://s3.amazonaws.com/nodejssdk.bucket2.diptobiswas/" + curFile
          }
          alt="img"
        />
      </div>
    </div>
  );
}

export default S3Upload;
