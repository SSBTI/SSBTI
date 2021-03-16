import json, pymysql


def lambda_handler(event, context):
    mbti = ''
    query = event['queryStringParameters']
    
    if int(query['IE']) > 0: mbti += 'I'
    else: mbti += 'E'
    if int(query['SN']) > 0: mbti += 'S'
    else: mbti += 'N'
    if int(query['TF']) > 0: mbti += 'T'
    else: mbti += 'F'
    if int(query['JP']) > 0: mbti += 'J'
    else: mbti += 'P'
    
    conn = pymysql.connect(host="database-1.cg9dro7y0en2.us-east-2.rds.amazonaws.com", port=3306, user="admin", password="duaghkqpswkfzhsba", db="test", charset="utf8")
    curs = conn.cursor()
    # sql = f"select * from mbti where type='{mbti}'"
    sql = f"select mbti.*, relationship.* from mbti join relationship on mbti.mbti_id = relationship.from_id where mbti.type='{mbti}' order by relationship.type;"
    curs.execute(sql)
    result = curs.fetchall()
    
    sql1 = f"update mbti set count = count + 1 where type='{mbti}'"
    curs.execute(sql1)
    
    sql2 = f"select * from mbti where mbti.mbti_id={result[0][9]}"
    curs.execute(sql2)
    hater = curs.fetchall()
    
    sql3 = f"select * from mbti where mbti.mbti_id={result[1][9]}"
    curs.execute(sql3)
    lover = curs.fetchall()
    
    sql4 = 'select * from product order by rand() limit 5'
    curs.execute(sql4)
    products = curs.fetchall()
    
    conn.commit()
    conn.close()
    
    product_list = []
    for product in products:
        temp = dict()
        temp['id'] = product[0]
        temp['goodsDetailUrl'] = product[4]
        temp['imgPath1'] = product[9]
        temp['uspDesc'] = product[15]
        product_list.append(temp)
    
    
    response = dict()
    response['desc'] = result[0][2]
    response['haters'] = [{"type":hater[0][5], "name":hater[0][4],"img":hater[0][3]}]
    response['img'] = result[0][3]
    response['lovers'] = [{"type":lover[0][5], "name":lover[0][4],"img":lover[0][3]}]
    response['name'] = result[0][4]
    response['products'] = product_list
    response['type'] = result[0][5]
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response, ensure_ascii=False)
    }