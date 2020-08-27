require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const chalk = require('chalk');
const { reject } = require('lodash');
const _ = require('lodash');
const namegen = require('../../utils/namegen');

/**
 * Cloud storage instance
 * @param keyFilename Path to google secret
 * @param projectId Project id
 */
const storage = new Storage({
  keyFilename: process.env.GOOGLE_SECRET,
  projectId: process.env.PROJECT_ID,
});

/**
 * Create a new bucket
 * @param {String} bucketName Bucket Name
 * @param {Object} options defaults to https://cloud.google.com/storage/docs/storage-classes & https://cloud.google.com/storage/docs/locations
 * @return {Promise} Promise
 */
async function createBucket(bucketName = namegen.randomName(), options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const allBuckets = await listBuckets().then((data) => {
        return data;
      });
      const bucketIndex = _.findIndex(allBuckets, (buck) => {
        return buck === bucketName;
      });

      if (bucketIndex > 0) {
        reject(
          new Error(
            `Error: Bucket ${chalk.bgRed(
              bucketName
            )} already exists, choose a different name`
          )
        );
      }
      const [bucket] = await storage.createBucket(bucketName, { ...options });
      resolve(bucket);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * List all buckets associated with projectId
 * @returns Array of all the available buckets
 * @return {Promise} Promise
 */
async function listBuckets() {
  return new Promise(async (resolve, reject) => {
    try {
      const [buckets] = await storage.getBuckets();
      const allBuckets = buckets.map((bucket) => {
        return bucket.name;
      });
      resolve(allBuckets);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Get a bucket's metadata
 * @returns A bucket's metadata (e.g. id, location, name, description, timestamps, etc...)
 */
async function getBucketMetadata(bucket = '') {
  return new Promise(async (resolve, reject) => {
    try {
      const [metadata] = await storage.bucket(bucket).getMetadata();
      resolve(metadata);
    } catch (error) {
      reject(error);
    }
  });

  // for (const [key, value] of Object.entries(metadata)) {
  //   Object.assign(key, value);
  // }
  return metadata;
}

/**
 * Lists all files for a single bucket
 * Returns an array of the files
 * @param String, Bucket name
 * @returns Array of files inside specified bucket
 */
async function listFileNames(bucketName = process.env.BUCKET) {
  let fileNames = [];
  try {
    const [files] = await storage.bucket(bucketName).getFiles();

    files.forEach((file) => {
      fileMeta.push(file.name);
    });

    return fileNames;
  } catch (error) {
    console.log(`Error:` + chalk.bgRedBright(`Failed: Cannot fetch bucket`));
    throw new Error(err);
  }
}

/**
 * Fetches all the files for multiple buckets
 * Returns an object with each bucket and its corresponding file
 * @param {string[]}
 * @returns [arr] An array of all the file name
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
    // will fix promise
    // const [files] = await storage.bucket(buckets).getFiles();

    if (typeof files !== 'object') {
      return;
    }

    files.forEach((file) => {
      allFiles.push(file.name);
    });

    return allFiles;
  } catch (err) {
    throw new Error(chalk.bgRedBright(err));
  }
}

/**
 * List all buckets associated with projectId
 * @returns Array of all the available buckets
 * @return {Promise} Promise
 */
async function uploadFile(bucketName, file) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileData = await storage.bucket(bucketName).upload(file, {
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'public, max-age=31536000',
        },
      });

      resolve(fileData);
    } catch (e) {
      reject(e);
    }
  });
}

async function deleteBucket(bucketName) {
  // Deletes the bucket
  await storage.bucket(bucketName).delete();
  console.log(`Bucket ${bucketName} deleted.`);
}

module.exports = {
  listBuckets,
  createBucket,
  deleteBucket,
  getBucketMetadata,
  uploadFile,
};

// // TODO: sort by specified ext type
// function sortByExt(file) {
//   if (!files) {
//     console.log(`Error: Include a file as a paramter`);
//   }
//   // for now just print file
//   console.log(file);
// }
