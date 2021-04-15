import boto3, json, base64

def lambda_handler(event, context):
    client = boto3.client('cloudwatch')
    metric_sources =  {
	your_matrix_source
}
    image_data = client.get_metric_widget_image(
            MetricWidget = json.dumps(metric_sources)
        )
        
    image = {'file': image_data['MetricWidgetImage']}
    send_img = base64.encodestring(image['file'])
    
 
    return {
        'statusCode': 200,
        'body': send_img.decode('utf-8'),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': '*/*',
        },
        'isBase64Encoded': True
    }