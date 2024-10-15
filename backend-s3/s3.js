import AWS from "aws-sdk";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new AWS.S3();

app.get("/generate-presigned-url", async (req, res) => {
  const { fileName, fileType } = req.query;

  console.log(req.query);

  const params = {
    Bucket: "nodejssdk.bucket2.diptobiswas",
    Key: fileName,
    Expires: 60 * 5,
    ContentType: fileType,
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
