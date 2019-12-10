const express = require('express');
require('dotenv').config()
const app = express();
const AWS = require('aws-sdk');

let topicARN = '';

const checkIfTopicExists = require('./checkIfTopicExists');
const createTopic = require('./createTopic');
const publishToTopic = require('./publishToTopic');

app.get('/', async (req, res) => {
    const ifTopicExists = await checkIfTopicExists(AWS, 'ON_POST_CREATED');

    if (!ifTopicExists) {
        topicARN = await createTopic(AWS, 'ON_POST_CREATED');
        res.send(topicARN);
    } else {
        res.send(ifTopicExists);
    }
});

app.get('/publish', async (req, res) => {
    const response = await publishToTopic(
        AWS,
        'arn:aws:sns:us-east-2:034277565974:ON_POST_CREATED',
        'Hello World from node app'
    );

    res.send(JSON.stringify({ MessageID: response.MessageId }));
});


app.listen(3004, () => {
    console.log('Server is running in port 3004');
});