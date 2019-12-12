const express = require('express');
require('dotenv').config()
const app = express();
const AWS = require('aws-sdk');

const checkIfTopicExists = require('./checkIfTopicExists');
const createTopic = require('./createTopic');
const publishToTopic = require('./publishToTopic');

app.get('/', async (req, res) => {
    try {
        const topic = req.query.topic;
        const ifTopicExists = await checkIfTopicExists(AWS, topic);

        if (!ifTopicExists) {
            const createdTopicARN = await createTopic(AWS, topic);
            res.send(createdTopicARN);
        } else {
            res.send(ifTopicExists);
        }
    } catch (error) {
        console.log(`error in base route: ${error}`)
    }
});

app.get('/publish', async (req, res) => {
    try {
        const topicARN = `${process.env.ARN_AWS_SNS_PREFIX}${req.query.topic}`;
        const message = req.query.message;
        const response = await publishToTopic(AWS, topicARN, message);

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