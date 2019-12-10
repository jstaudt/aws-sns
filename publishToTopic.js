module.exports = (AWS, arn, message) => {
    // message config
    const params = {
        Message: message,
        MessageAttributes: {
            'testEmail': {
                DataType: 'String',
                StringValue: message
            }
        },
        TopicArn: arn
    };

    // return promisified response from SNS service
    return new AWS.SNS().publish(params).promise();
};