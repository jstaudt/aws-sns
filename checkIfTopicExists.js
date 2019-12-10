module.exports = (AWS, topicName) => {
    return new Promise((resolve, reject) => {
        try {
            const listTopics = new AWS.SNS({
                    apiVersion: '2010-03-31'
                })
                .listTopics({})
                .promise();

            listTopics
                .then(data => {
                    if (data.Topics[0].TopicArn.includes(topicName)) {
                        console.log(`true -topics are ${JSON.stringify(data.Topics)}`)
                        resolve(true);
                    } else {
                        console.log(`false - topics are ${JSON.stringify(data.Topics)}`)
                        resolve(false);
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        } catch (e) {
            console.log(e);
        }
    });
};