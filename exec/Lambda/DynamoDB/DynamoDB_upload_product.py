import json, boto3, random
from boto3.dynamodb.conditions import Key


def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="https://dynamodb.us-east-1.amazonaws.com")
    table = dynamodb.Table('MBTI-product')
    
    with open('json.txt', 'r', encoding='UTF-8') as f:
        line = f.readlines()
    
    a = ''.join(line)
    temp = a.split("),(")
    a = random.sample(range(1,2685), 2684)
    
    count = -1
    for line in temp:
        count += 1
        result = []
        temp2 = line.split(',')
        try:
            int(temp2[4])
            result += temp2[:13]
            result.append(''.join(temp2[13:-1]))
            result.append(temp2[-1])
        except:
            try:
                int(temp2[5])
                result.append(temp2[0])
                result.append(''.join(temp2[1:3]))
                result += temp2[3:14]
                result.append(''.join(temp2[14:-1]))
                result.append(temp2[-1])
                # print(result)
            except:
                try:
                    int(temp2[6])
                    result.append(temp2[0])
                    result.append(''.join(temp2[1:4]))
                    result += temp2[4:15]
                    result.append(''.join(temp2[15:-1]))
                    result.append(temp2[-1])
                except:
                    pass
        
    
        res = table.put_item(
          Item={
              'id': a[count],
              'goods_nm': result[1].strip("'"),
              'img_path1': result[5].strip("'"),
              'goods_detail_url': result[12].strip("'"),
              'usp_desc': result[13].strip("'"),
          }
        )
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(res)
    }