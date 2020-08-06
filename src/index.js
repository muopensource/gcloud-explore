const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision').v1;
const chalk = require('chalk');

function main(bucketName = 'my-bucket') {
  //   const storage = new Storage({ keyFilename: `g-key.json` });

  //   async function listFiles() {
  //     // Lists files in the bucket
  //     const [files] = await storage.bucket("norcom-bucket").getFiles();

  //     console.log("Cloud storage files:");
  //     files.forEach((file) => {
  //       console.log(chalk.bgGrey.white(file.name));
  //     });
  //   }

  //   listFiles().catch(console.error);

  const client = new vision.ImageAnnotatorClient({ keyFilename: `g-key.json` });

  const fileName = 'hawyar-resume.pdf';
  const outputPrefix = 'results';

  const gcsSourceUri = `gs://${`norcom-bucket`}/${fileName}`;
  const gcsDestinationUri = `gs://${`norcom-bucket`}/${outputPrefix}/`;

  const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: 'application/pdf',
    gcsSource: {
      uri: gcsSourceUri,
    },
  };
  const outputConfig = {
    gcsDestination: {
      uri: gcsDestinationUri,
    },
  };

  const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];

  const request = {
    requests: [
      {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
      },
    ],
  };

  const run = async () => {
    const [operation] = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation.promise();

    const destinationUri =
      filesResponse.responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
  };

  run();
}
main(...process.argv.slice(2));
