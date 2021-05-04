from rest_framework import generics, permissions

from .models import Item
from .serializers import ItemSerializer

class ListItem(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
