import boto3
from datetime import datetime, timedelta
import time
import json

    
def lambda_handler(event, context):
    client = boto3.client('logs')

    query = "fields @timestamp, @message | sort @timestamp desc | limit 20"  
    
    log_group = 'your lambda path'
    
    start_query_response = client.start_query(
        logGroupName=log_group,
        startTime=int((datetime.today() - timedelta(hours=5)).timestamp()),
        endTime=int(datetime.now().timestamp()),
        queryString=query,
    )
    
    query_id = start_query_response['queryId']
    
    response = None
    
    while response == None or response['status'] == 'Running':
        print('Waiting for query to complete ...')
        time.sleep(1)
        response = client.get_query_results(
            queryId=query_id
        )
        
    return {

        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': '*/*',
        },
        'statusCode': 200,
        'body': json.dumps(response)
        
    }