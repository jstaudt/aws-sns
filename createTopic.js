module.exports = (AWS, topicName) => {
    return new Promise((resolve, reject) => {
        const createTopic = new AWS.SNS().createTopic({ Name: topicName }).promise();

        createTopic
            .then(data => {
                resolve(data.TopicArn);
            })
            .catch(err => {
                reject(err);
            });
    });
};