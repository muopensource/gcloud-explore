require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const chalk = require('chalk');
const _ = require('lodash');

/**
 * Storage instance
 * @param keyFilename Path to google secret
 * @param projectId Project id
 */
const storage = new Storage({
  keyFilename: process.env.GOOGLE_SECRET,
  projectId: process.env.PROJECT_ID,
});

/**
 * Create a new bucket
 * @param bucketName Bucket Name
 * @param options Bucket options, defaults to https://cloud.google.com/storage/docs/storage-classes & https://cloud.google.com/storage/docs/locations
 * @return Object Newly created bucket
 */
async function createBucket(bucketName, options = {}) {
  const allBuckets = await listBuckets().then((data) => {
    return data;
  });

  const bucketIndex = _.findIndex(allBuckets, (buck) => {
    return buck === bucketName;
  });

  if (bucketIndex > 0) {
    throw new Error(
      `Error: Bucket ${chalk.bgRed(
        bucketName
      )} already exists, choose a different name`
    );
  }
  const [bucket] = await storage.createBucket(bucketName, { ...options });
  return bucket;
}

/**
 * List all buckets associated with projectId
 * @returns Array of all the available buckets
 */
async function listBuckets() {
  // Lists all buckets in the current project
  const [buckets] = await storage.getBuckets();

  const allBuckets = buckets.map((bucket) => {
    return bucket.name;
  });

  return allBuckets;
}

/**
 * Get a bucket's metadata
 * @returns A bucket's metadata (e.g. id, location, name, description, timestamps, etc...)
 */
async function getBucketMetadata(bucket = process.env.BUCKET) {
  const [metadata] = await storage.bucket(bucket).getMetadata();
  return metadata;
}

/**
 * Lists all files for a single bucket
 * Returns an array of the files
 * @param String, Bucket name
 * @returns {arr[]} Array of files inside specified bucket
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

// TODO: sort by specified ext type
function sortByExt(file) {
  if (!files) {
    console.log(`Error: Include a file as a paramter`);
  }
  // for now just print file
  console.log(file);
}

module.exports = {
  listBuckets,
  createBucket,
};
