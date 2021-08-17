from django.db import models

class Item(models.Model):
    CATEGORY = (
        ('MATH', 'Mathematics'),
        ('CHEM', 'Chemistry'),
        ('BIO', 'Biology'),
        ('HOUSE', 'Household'),
        ('CRAFT', 'Craft'),
        ('PHYS', 'Physics'),
        ('TOY', 'Toy'),
        ('TECH', 'Tech')
    )
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=5, choices=CATEGORY)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=10, null=True, blank=True)

class Order():
    def __init__(self, orderNumber, members, lessonDateTime, pickupDateTime, content, otherNotes):
        self.orderNumber = orderNumber
        self.members = members
        self.lessonDateTime = lessonDateTime
        self.pickupDateTime = pickupDateTime
        self.content = content
        self.otherNotes = otherNotes

class OrderMembers():
    def __init__(self, name, email):
        self.name = name
        self.email = email

class OrderContent():
    def __init__(self, item_id, item_name, item_location, quantity, notes, self_filled):
        self.item_id = item_id
        self.item_name = item_name
        self.item_location = item_location
        self.quantity = quantity
        self.notes = notes
        self.self_filled = self_filled