const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const connectionId = event.requestContext.connectionId;
    const roomId = JSON.parse(event.body).data;

    // console.log("EnterRoom", connectionId, roomId);
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            roomId: roomId,
            connectionId: connectionId
        }
    };

    docClient.put(params, function(err) {
        if (err) {
            // console.error("Error", err);
            callback(new Error("Error"));
        }
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify(""),
    };

    callback(null, response);
};