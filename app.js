const express = require('express');
require('dotenv').config()
const app = express();
const AWS = require('aws-sdk');

let topicARN = '';

const checkIfTopicExists = require('./checkIfTopicExists');
const createTopic = require('./createTopic');
const publishToTopic = require('./publishToTopic');

app.get('/', async (req, res) => {
    try {
        const ifTopicExists = await checkIfTopicExists(AWS, 'ON_POST_CREATED');

        if (!ifTopicExists) {
            // topicARN = await createTopic(AWS, 'ON_POST_CREATED');
            // res.send(topicARN);
        } else {
            res.send(ifTopicExists);
        }
    } catch (error) {
        console.log(`error in base route: - ${error}`)
    }
});

app.get('/publish', async (req, res) => {
    try {
        const response = await publishToTopic(
            AWS,
            'arn:aws:sns:us-east-2:034277565974:ON_POST_CREATED',
            'Hello World from node app'
        );

        res.send(JSON.stringify({
            MessageID: response.MessageId
        }));
    } catch (error) {
        console.log(`error in publish route: ${error}`)
    }
});


app.listen(3004, () => {
    console.log('Server is running in port 3004');
});