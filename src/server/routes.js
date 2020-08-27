const express = require('express');
const mv = require('mv');
const router = express.Router();

const bucket = require('../service/storage/bucket');

// generic route handler
const genericHandler = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body,
  });
};

router.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let uploadFile = req.files.pdfFile;

  // const bucky = await bucket
  //   .uploadFile('big-burger', uploadFile)
  //   .catch((error) => {
  //     res.status(502).send(error);
  //   });

  // const pathDest = __dirname + '/uploads/' + uploadFile.name;

  // Use the mv() method to place the file somewhere on your server
  // uploadFile.mv(pathDest, function (err) {
  //   if (err) {
  //     res.writeHead(500, {
  //       'Content-Type': 'application/json',
  //     });
  //     res.end(JSON.stringify({ status: 'error', message: error }));
  //     return;
  //   }
  //   res.writeHead(200, {
  //     'Content-Type': 'application/json',
  //   });
  //   res.end(
  //     JSON.stringify({ status: 'success', path: '/uploads/' + uploadFile.name })
  //   );
  // });
});
module.exports = router;
