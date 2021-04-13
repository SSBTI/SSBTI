# -- coding: utf-8 --
import json, pymysql, random, hashlib

def encrypt(str):
    return hashlib.sha256(str.encode('utf-8')).hexdigest()

def lambda_handler(event, context):
    conn = pymysql.connect(host="..", port=3306, user="..", 
    password="..", db="..", charset="utf8")
    curs = conn.cursor()
    
    query = event['queryStringParameters']
    
    sql = f"select * from comment where review_id={query['review_id']}"
    
    curs.execute(sql)
    queryResult = curs.fetchall()
    
    result = []
    
    for row in queryResult:
        temp = dict()
        temp["nickname"] = row[3]
        temp["content"] = row[2]
        temp["id"] = row[0]
        result.append(temp)
    
    
    # TODO implement
    
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'statusCode': 200,
        'body': json.dumps(result, ensure_ascii=False)
    }