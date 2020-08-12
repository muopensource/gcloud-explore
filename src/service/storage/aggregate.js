const bucket = require('../storage/bucket');

async function main() {
  // create bucket
  //   const bucky = await bucket.createBucket('past-storm');

  // get all buckets
  const myBuckets = await bucket.listBuckets();
  console.log(myBuckets);
}
main();
