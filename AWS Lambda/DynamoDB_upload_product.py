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
              'id': a[count],  # check
            #   'goods_id': result[0].strip("'"),
              'goods_nm': result[1].strip("'"),  # check
            #   'mdl_code': result[2].strip("'"),
            #   'mdl_nm': result[3].strip("'"),
            #   'sale_price': result[4].strip("'"),
              'img_path1': result[5].strip("'"),  # check
            #   'grp_path': result[6].strip("'"),
            #   'colors': result[7].strip("'"),
            #   'category': result[8].strip("'"),
            #   'ctg_rank': result[9].strip("'"),
            #   'review_grade': result[10].strip("'"),
            #   'review_count': result[11].strip("'"),
              'goods_detail_url': result[12].strip("'"),  # check
              'usp_desc': result[13].strip("'"),  # check
            #   'goods_prc_no': result[14].strip("'")
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
