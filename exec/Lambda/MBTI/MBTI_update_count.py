import json, pymysql


def lambda_handler(event, context):
    mbtiType = event['queryStringParameters']['type']
    # mbtiType = event['type']
    
    conn = pymysql.connect(host="database-1.cg9dro7y0en2.us-east-2.rds.amazonaws.com", port=3306, user="admin", password="duaghkqpswkfzhsba", db="test", charset="utf8")
    curs = conn.cursor()
    
    sql1 = f"call updateMbti('{mbtiType}')"
    curs.execute(sql1)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': 'success'
    }