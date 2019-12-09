const express = require('express');
const AWS = require('aws-sdk');
const app = express();

const AWS_ACCESS_KEY_ID = '';
const AWS_SECRET_ACCESS_KEY = '';

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

app.get('/', async (req, res) => {
    res.send("Welcome");
});


app.listen(3004, () => {
  console.log('Server is running in port 3004');
});