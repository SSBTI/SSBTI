import json, sys, pymysql


def lambda_handler(event, context):

    conn = pymysql.connect(host="database-1.cg9dro7y0en2.us-east-2.rds.amazonaws.com", port=3306, user="admin", password="duaghkqpswkfzhsba", db="test", charset="utf8")
    curs = conn.cursor()
    # sql = f"select * from mbti where type='{mbti}'"
    sql = f"select type, count, img from mbti;"
    curs.execute(sql)
    result = curs.fetchall()
    total = 0
    for mbti in result:
        total += mbti[1]
    response = []
    for mbti in result:
        temp = dict()
        temp['type'] = mbti[0]
        temp['percent'] = "%0.2f" % float(mbti[1]/total*100) + '%'
        temp['img'] = mbti[2]
        response.append(temp)
    response.append(total)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response, ensure_ascii=False)
    }