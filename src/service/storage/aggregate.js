const bucket = require('../storage/bucket');

async function main() {
  // create bucket
  // const bucky = await bucket.createBucket();
  // console.log(bucky);
  // get all buckets
  // const myBuckets = await bucket.listBuckets();
  // console.log(myBuckets);
  //   const meta = await bucket.getBucketMetadata('past-storm');
  //   console.log(meta);

  const uploadBucket = bucket
    .uploadFile('big-burger', 'src/server/server.js')
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadBucket);
}
main();
