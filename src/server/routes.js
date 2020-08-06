const express = require('express');

const router = express.Router();

// generic route handler
const genericHandler = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body,
  });
};

router.post('/upload', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({
        status: false,
        message: 'Include a file with the POST request',
      });
    }
    let userInput = req.files.process;

    userInput.mv('./uploads/' + userInput.name);

    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: userInput.name,
        mimetype: userInput.mimetype,
        size: userInput.size,
      },
      upload_time: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
