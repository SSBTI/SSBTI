import json,pymysql


def lambda_handler(event, context):
    mbti = event['queryStringParameters']['type']
    
    conn = pymysql.connect(host="database-1.cg9dro7y0en2.us-east-2.rds.amazonaws.com", port=3306, user="admin", password="duaghkqpswkfzhsba", db="test", charset="utf8")
    curs = conn.cursor()
    sql = f"select mbti.*, relationship.* from mbti join relationship on mbti.mbti_id = relationship.from_id where mbti.type='{mbti}' order by relationship.type;"
    curs.execute(sql)
    result = curs.fetchall()
    
    sql2 = f"select * from mbti where mbti.mbti_id={result[0][9]}"
    curs.execute(sql2)
    hater = curs.fetchall()
    
    sql3 = f"select * from mbti where mbti.mbti_id={result[1][9]}"
    curs.execute(sql3)
    lover = curs.fetchall()
    
    sql4 = "select sum(count) from mbti"
    curs.execute(sql4)
    total = curs.fetchall()
    
    conn.close()

    response = dict()
    response['desc'] = result[0][2]
    response['haters'] = [{"type":hater[0][5], "name":hater[0][4],"img":hater[0][3]}]
    response['img'] = result[0][3]
    response['lovers'] = [{"type":lover[0][5], "name":lover[0][4],"img":lover[0][3]}]
    response['name'] = result[0][4]
    response['type'] = result[0][5]
    response['total'] = int(total[0][0])
    response['count'] = result[0][1]
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response, ensure_ascii=False)
    }