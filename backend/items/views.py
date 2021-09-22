from rest_framework import generics, permissions
from rest_framework.decorators import api_view

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from datetime import datetime

from .models import Item
from core.models import Key
from .trello import Trello
from .serializers import ItemSerializer, OrderSerializer

class ListItem(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Item.objects.all()
    serializer_class = ItemSerializer


@api_view(['POST'])    
def post_order(request):
    order_serializer = OrderSerializer(data=JSONParser().parse(request))
    if not order_serializer.is_valid():
        return JsonResponse({'error': 'failed to serialize data'}, status=status.HTTP_400_BAD_REQUEST)

    # Retreive Trello key/token/list id from DB
    trello_key = Key.objects.get(key='trello_key').value
    trello_token = Key.objects.get(key='trello_token').value
    materials_list_id = Key.objects.get(key='material_list_id').value

    if (trello_key == None or trello_token == None or materials_list_id == None):
        return JsonResponse({'error': 'failed to retreive trello infromation'}, status=status.HTTP_400_BAD_REQUEST)

    trello_client = Trello(trello_key, trello_token)

    # Creates Trello Card
    stu_name_list = ''
    stu_email_list = ''
    for i, stu in enumerate(order_serializer.data['members']):
        stu_name_list = stu_name_list  + stu['name']
        stu_email_list = stu_email_list  + stu['email']

        if (i != len(order_serializer.data['members']) - 1):
            stu_name_list = stu_name_list  + ', '
            stu_email_list = stu_email_list  + ', '
        
    card_title = 'Order ' + str(order_serializer.data['orderNumber']) + ' - ' + stu_name_list

    email_link = '[Email Students](mailto:' + stu_email_list.replace(', ', ';') + '?subject=JAVAN%20Order%20#' + str(order_serializer.data['orderNumber']) + ')'

    lesson_dateTime = datetime.strptime(order_serializer.data['lessonDateTime'], "%Y-%m-%dT%H:%M:%SZ").strftime("%c")

    card_desc = "Student Name(s): " + stu_name_list + " \n" \
                "Student Email(s): " + stu_email_list + " \n" \
                "Class: " + order_serializer.data['className'] + "\n" \
                "Instructor: " + order_serializer.data['instructor'] + "\n" \
                "Lesson Date & Time: " + lesson_dateTime + "\n" \
                "Other Notes: " + order_serializer.data['otherNotes'] + "\n \n" + email_link

    card_id = trello_client.create_card(materials_list_id, card_title, card_desc, order_serializer.data['pickupDateTime'])
    checklist_id = trello_client.create_checklist(card_id, 'Items')

    for item in order_serializer.data['content']:
        item_str = str(item['quantity']) + ' - ' + item['item_name'] + '(' + item['item_location'] + '); ' + item['notes']
        trello_client.create_checklist_item(checklist_id, item_str, item['self_filled'])    
    
    result = {
        'trello_card_id': card_id,
        'order': order_serializer.data
    }

    return JsonResponse(result)
