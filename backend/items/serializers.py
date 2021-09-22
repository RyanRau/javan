from rest_framework import serializers
from .models import Item, Order

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'category',
            'description',
            'location',
        )
        model = Item

class OrderMemberSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

class OrderContentSerializer(serializers.Serializer):
    item_id = serializers.CharField(max_length=50)
    item_name = serializers.CharField(max_length=100)
    item_location = serializers.CharField(max_length=50)
    quantity = serializers.IntegerField()
    notes = serializers.CharField(max_length=200, required=False, allow_blank=True)
    self_filled = serializers.BooleanField()

class OrderSerializer(serializers.Serializer):
    orderNumber = serializers.IntegerField()
    members = OrderMemberSerializer(many=True)
    lessonDateTime = serializers.DateTimeField()
    pickupDateTime = serializers.DateTimeField()
    content = OrderContentSerializer(many=True)
    className = serializers.CharField(max_length=200)
    instructor = serializers.CharField(max_length=200)
    otherNotes = serializers.CharField(max_length=200, required=False, allow_blank=True)

