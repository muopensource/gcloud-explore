const bucketUtil = require('./bucket');
const fs = require('fs');
const FileType = require('file-type');

async function main() {
  // create bucket
  // await bucketUtil.deleteBucket('qalamala').then((e) => console.log(e));

  // get all buckets
  const myBuckets = await bucket.listBuckets();
  console.log(myBuckets);
  const meta = await bucket.getBucketMetadata('past-storm');
  console.log(meta);

  // bucketUtil.listFileNames('big-burger').then((files) =>
  //   files.map((el) => {
  //     if (el.metadata.contentType === 'text/csv') {
  //       el.makePublic().then((el) => console.log(el));
  //     }
  //   })
  // );

  // bucket
  //   .uploadFile('big-burger', 'src/server/routes.js')
  //   .then((file) => {
  //     const [File] = file;

  //     const { metadata } = File;

  //     console.log(`File: ${metadata.name}`);
  //     console.log(`Bucket: ${metadata.bucket}`);
  //     console.log(`Storage class: ${metadata.storageClass}`);
  //     console.log(`Self link: ${metadata.selfLink}`);
  //     console.log(`ID: ${metadata.id}`);
  //     console.log(`Size: ${metadata.size}`);
  //     console.log(`Updated: ${metadata.updated}`);
  //     console.log(`Generation: ${metadata.generation}`);
  //     console.log(`Metageneration: ${metadata.metageneration}`);
  //     console.log(`Etag: ${metadata.etag}`);
  //     console.log(`Owner: ${metadata.owner}`);
  //     console.log(`Component count: ${metadata.component_count}`);
  //     console.log(`Crc32c: ${metadata.crc32c}`);
  //     console.log(`md5Hash: ${metadata.md5Hash}`);
  //     console.log(`Cache-control: ${metadata.cacheControl}`);
  //     console.log(`Content-type: ${metadata.contentType}`);
  //     console.log(`Content-disposition: ${metadata.contentDisposition}`);
  //     console.log(`Content-encoding: ${metadata.contentEncoding}`);
  //     console.log(`Content-language: ${metadata.contentLanguage}`);
  //     console.log(`Media link: ${metadata.mediaLink}`);
  //     console.log(`KMS Key Name: ${metadata.kmsKeyName}`);
  //     console.log(`Temporary Hold: ${metadata.temporaryHold}`);
  //     console.log(`Event-based hold: ${metadata.eventBasedHold}`);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}
main();
