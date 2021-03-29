const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION }); // AWS_REGION: us-east-1
const { TABLE_NAME } = process.env;  // lambda 환경변수에 추가

exports.handler = async event => {  // api gateway로 요청이 들어오면 실행
  let connectionData;
  try {
    // DynamoDB에서 {connectionId, roomID} 의 모든 쌍을 array로 들고 온다.
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId, roomId' }).promise();
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
  
  // API Gateway 부분
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });
  
  // connect 후 {"action":"sendmessage", "data":"{보내고 싶은 내용}","roomId":"{roomId}"} 의 형태로 보내면 동일한 roomID의 사람들에게 보내고 싶은 용을 전달 
  const postData = JSON.stringify({"id":event.requestContext.connectionId, "msg":JSON.parse(event.body).data, "nickname":JSON.parse(event.body).nickname});

  // 연결되어 있는 클라이언트에 내용을 전달하는 부분
  const postCalls = connectionData.Items.map(async ({ connectionId, roomId }) => {
    // "roomID": "{roomID}" 와 roomID가 같으면, 즉 동일한 방 번호이면
    if (roomId === JSON.parse(event.body).roomId) {
      try {
        // postData를 각 connectionId에 전송
        await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
      } catch (e) {
        if (e.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connectionId}`);
          await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
        } else {
          throw e;
        }
      }
    }
  });
  
  try {
    // 순회 가능한 객체에 주어진 모든 프로미스를 이행
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
  return { statusCode: 200, body: 'Data sent.' };
};
