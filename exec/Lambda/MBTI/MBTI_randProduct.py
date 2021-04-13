import random, json, boto3, decimal
from boto3.dynamodb.conditions import Key

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def lambda_handler(event, context):
    a = random.sample(range(1,2685), 5)
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="https://dynamodb.us-east-1.amazonaws.com")
    table = dynamodb.Table('MBTI-product')
    
    res = []
    for i in a:
        res.append(table.query(KeyConditionExpression=Key('id').eq(i))["Items"][0])
    
    return {
        'statusCode': 200,
        'body': json.dumps(res, ensure_ascii=False,  cls=DecimalEncoder)
    }