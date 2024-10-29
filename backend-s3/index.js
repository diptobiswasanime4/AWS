import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new AWS.S3();
const ec2 = new AWS.EC2();
const iam = new AWS.IAM();
const dynamoDB = new AWS.DynamoDB();

async function listAllBuckets() {
  try {
    const res = await s3.listBuckets().promise();
    console.log("Bucket list", res.Buckets);
  } catch (error) {
    console.log("Error listing buckets", error);
  }
}

async function createBucket(bucketName) {
  try {
    const res = await s3.createBucket({ Bucket: bucketName }).promise();
    console.log("Created Bucket", res);
  } catch (error) {
    console.log("Error in creating new bucket", error);
  }
}

async function describeInstances() {
  try {
    const res = await ec2.describeInstances().promise();
    console.log("Instance Details", res.Reservations[0].Instances);
  } catch (error) {
    console.log("Error describing Instances", error);
  }
}

async function getUserDetails() {
  try {
    const res = await iam.getUser().promise();
    console.log("User Details", res);
  } catch (error) {
    console.log("Error getting User details", error);
  }
}

async function getDynamoDBInfo() {
  try {
    const res = await dynamoDB.listTables.promise();
    console.log("DynamoDB Table Info", res.TableNames);
  } catch (error) {
    console.log("Error getting User details", error);
  }
}

listAllBuckets();
// createBucket("nodejssdk.bucket2.diptobiswas")
describeInstances();
getUserDetails();
getDynamoDBInfo();
