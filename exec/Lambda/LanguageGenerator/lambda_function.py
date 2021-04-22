# -- coding: utf-8 --
import json, pymysql, random

def lambda_handler(event, context):
    MIN = 1
    MAX = 25966 + 1
    conn = pymysql.connect(host="HOSTNAME주소", port=3306, user="USER이름", password="RDS비번", db="DB이름", charset="utf8")

    curs = conn.cursor()
    ranNum = random.sample(range(MIN, MAX), 2)
    
    sqlA = f"select nouns from nouns where id={ranNum[0]}"
    curs.execute(sqlA)
    tempA = curs.fetchall()
    
    sqlB = f"select nouns from nouns where id={ranNum[1]}"
    curs.execute(sqlB)
    tempB = curs.fetchall()
    
    conn.close()
    result = tempA[0][0] + "의 " + tempB[0][0]

    
    
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'statusCode': 200,
        'body': json.dumps(result, ensure_ascii=False)
    }

    
    
