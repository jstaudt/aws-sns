module.exports = (AWS, topicName) => {
    return new Promise((resolve, reject) => {
        const listTopics = new AWS.SNS().listTopics().promise();

        listTopics
            .then(data => {
                resolve(data.Topics[0].TopicArn.includes(topicName));
            })
            .catch(err => {
                reject(err)
            });
    });
};