const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

exports.handler = async event => {
  const putParams = {
    TableName: process.env.TABLE_NAME,  // lambda 환경변수에 추가
    Item: {
      connectionId: event.requestContext.connectionId
    }
  };

  try {
    // db에 connectionId 저장
    await ddb.put(putParams).promise();
  } catch (err) {
    return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
  }

  return { statusCode: 200, body: 'Connected.' };
};
