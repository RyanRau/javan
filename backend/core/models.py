from django.db import models

class Key(models.Model):
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=100)
