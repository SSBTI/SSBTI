# -- coding: utf-8 --
import json, pymysql, random, hashlib, hmac

def encrypt(inputString):
    return hmac.new(bytes('ssafySecret', 'UTF-8'), bytes(inputString, 'UTF-8'), hashlib.sha256).hexdigest()

def lambda_handler(event, context):
    conn = pymysql.connect(host="##", port=##, user="##", 
    password="##", db="##", charset="utf8")
    curs = conn.cursor()
    
    query = event['queryStringParameters']
    
    sql = f"select password from comment where id={query['id']}";
    curs.execute(sql)
    queryResult = curs.fetchall()
    
    
    encryptedString = encrypt(query['password'])
    if queryResult[0][0] != encryptedString:
        return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'statusCode': 200,
        'body': json.dumps('패스워드가 다릅니다', ensure_ascii=False)
        }
    
    sql = f"delete from comment where id={query['id']}"
    curs.execute(sql)
    
    conn.commit()
    conn.close()
    
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'statusCode': 200,
        'body': json.dumps('데이터 삭제에 성공했습니다', ensure_ascii=False)
    }