# -- coding: utf-8 --
import json, pymysql, random, hashlib, hmac, base64


def encrypt(inputString):
    return hmac.new(bytes('ssafySecret', 'UTF-8'), bytes(inputString, 'UTF-8'), hashlib.sha256).hexdigest()

def lambda_handler(event, context):
    conn = pymysql.connect(host="##", port=##, user="##", 
    password="##", db="##", charset="utf8")
    curs = conn.cursor()
    
    data = event['body']
    parsedData = json.loads(data)
    
    encryptedString = encrypt(parsedData['password'])
     
    sql = f"insert into comment(review_id, content, nickname, password) values({parsedData['review_id']}, '{parsedData['content']}', '{parsedData['nickname']}', '{encryptedString}')"
    
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
        'body': '데이터 저장에 성공했습니다.'
        # 'body': json.dumps(data, ensure_ascii=False)
    }

    