import json, sys, pymysql


def lambda_handler(event, context):
    result = ''
    query = event['queryStringParameters']
    
    if query['IE']: result += 'I'
    else: result += 'E'
    if query['SN']: result += 'S'
    else: result += 'N'
    if query['TF']: result += 'T'
    else: result += 'F'
    if query['JP']: result += 'J'
    else: result += 'P'
    
    conn = pymysql.connect(host="database-1.cg9dro7y0en2.us-east-2.rds.amazonaws.com", port=3306, user="admin", password="duaghkqpswkfzhsba", db="test", charset="utf8")
    curs = conn.cursor()
    sql = f"select * from mbti where type='{result}'"
    curs.execute(sql)
    result2 = curs.fetchall()
    conn.close()
    
    response = dict()
    response['desc'] = result2[0][2]
    response['haters'] = [{"type":"INFP", "name":"남들","img":"www"}]
    response['img'] = result2[0][3]
    response['lovers'] = [{"type":"INFP", "name":"남들","img":"www"}]
    response['name'] = result2[0][4]
    response['products'] = [{"id":111,"goodsDetailUrl":"ddd","imgPath1":"www","uspDesc":"www"}]
    response['type'] = result2[0][5]
    
    
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response, ensure_ascii=False)
    }