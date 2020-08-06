require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision').v1;
const chalk = require('chalk');

/**
 * G Cloud Storage's instance
 * @param: Option?: keyFilename, projectId
 */
const storage = new Storage({
  keyFilename: process.env.GOOGLE_SECRET,
  projectId: process.env.PROJECT_ID,
});

/**
 * Get all available bucket's name
 * Returns an array of all buckets
 * @returns {arr[]} An array of all the files
 */

async function listBuckets() {
  // Lists all buckets in the current project
  const [buckets] = await storage.getBuckets();

  const arr = buckets.map((bucket) => {
    return bucket.name;
  });

  return arr;
}
listBuckets().catch(console.error);
/**
 * Get a bucket's metadata
 * Returns bucket's metadata (e.g. id, location, name, description, timestamps, etc...)
 * @returns {}
 */
async function getBucketMetadata(bucket = process.env.BUCKET) {
  const [metadata] = await storage.bucket(bucket).getMetadata();
  return metadata;
}

getBucketMetadata().catch(console.error);

/**
 * Lists all files for a single bucket
 * Returns an array of the files
 * @param {string} bucket - Name of the bucket
 * @returns {arr[]} An array of all the files
 */

async function listFiles(bucketName = process.env.BUCKET) {
  let fileMeta = [];
  try {
    const [files] = await storage.bucket(bucketName).getFiles();

    files.forEach((file) => {
      fileMeta.push(file.name);
    });

    return fileMeta;
  } catch (error) {
    console.log(`Error:` + chalk.bgRedBright(`Failed: Cannot fetch bucket`));
    throw new Error(err);
  }
}
// get all files for a bucket
listFiles().catch(console.error);

/**
 * Fetches all the files for multiple buckets
 * Returns an object with each bucket and its corresponding file
 * @param {string[]} countries - The list of countries.
 * @returns {arr[]} An array of all the file name
 */
async function listFilesBuckets(fetchBucket = []) {
  // if (!fetchBucket || fetchBucket.length === 0 || !Array.isArray(fetchBucket)) {
  //   throw new Error(`Error: Bucket array cannot be empty`);
  // }
  let allFiles = [];
  let allBuckets = [];

  try {
    if (Array.isArray(fetchBucket) && fetchBucket > 0) {
      const [buckets] = await storage.getBuckets();
    }

    const [files] = await storage.bucket(fetchBucket).getFiles();

    if (typeof files !== 'object') {
      return;
    }

    files.forEach((file) => {
      allFiles.push(file.name);
    });

    return allFiles;
  } catch (err) {
    console.log(
      `Error:` + chalk.bgRedBright(`Cannot fetch files from google storage`)
    );
    throw new Error(err);
  }
}

// getAllFiles([1, 2, 4]);

function sortByExt(file) {
  if (!files) {
    console.log(`Error: Include a file as a paramter`);
  }
  // for now just print file
  console.log(file);
}

function main(bucketName = 'my-bucket') {
  async function listFiles() {
    // Lists files in the bucket
    const [files] = await storage.bucket(process.env.BUCKET).getFiles();

    if (files.length === 0 || !files) {
      console.log(``);
    }

    console.log('Cloud storage files:');
    files.forEach((file) => {
      console.log(chalk.bgGrey.white(file.name));
    });
  }

  listFiles().catch(console.error);
}
// main(...process.argv.slice(2));

// const client = new vision.ImageAnnotatorClient({
//   keyFilename: process.env.GOOGLE_SECRET,
// });

// const fileName = 'hawyar-resume.pdf';
// const outputPrefix = 'results';

// const gcsSourceUri = `gs://${`norcom-bucket`}/${fileName}`;
// const gcsDestinationUri = `gs://${`norcom-bucket`}/${outputPrefix}/`;

// const inputConfig = {
//   mimeType: 'application/pdf', // or 'image/tiff'
//   gcsSource: {
//     uri: gcsSourceUri,
//   },
// };
// const outputConfig = {
//   gcsDestination: {
//     uri: gcsDestinationUri,
//   },
// };

// const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];

// const request = {
//   requests: [
//     {
//       inputConfig: inputConfig,
//       features: features,
//       outputConfig: outputConfig,
//     },
//   ],
// };

// const run = async () => {
//   const [operation] = await client.asyncBatchAnnotateFiles(request);
//   const [filesResponse] = await operation.promise();

//   const destinationUri =
//     filesResponse.responses[0].outputConfig.gcsDestination.uri;
//   console.log('Json saved to: ' + destinationUri);
// };

// // run();
