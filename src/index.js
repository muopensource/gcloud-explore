require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision').v1;
const chalk = require('chalk');
const fs = require('fs');

const storage = new Storage({ keyFilename: process.env.GOOGLE_SECRET });

async function listFiles(bucketName) {
  let fileMeta = {};
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles();

  files.forEach((file) => {
    Object.Assign(fileMeta, { file_name: file.name });
  });
  console.log(fileMeta);

  return fileMeta;
}

listFiles(process.env.BUCKET).catch(console.error);
/**
 * Fetchs all the files from a bucket
 * Returns an array of all the file anmes
 * @param {string[]} countries - The list of countries.
 * @returns {arr[]} An array of all the file name
 */
async function getAllFiles(fetchBucket = '' || []) {
  fetchBucket = process.env.BUCKET;

  let allFiles = [];
  let allBuckets = [];

  try {
    if (Array.isArray(fetchBucket) && fetchBucket > 0) {
      const [buckets] = await storage.getBuckets();

      buckets.forEach((buck) => {
        allBuckets.push(buck);
      });

      // buckets has all buckets

      let obj = {};

      allBuckets.map((bucket) => {
        obj.Assign(obj, (file) => {
          file.name;
        });
      });
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
