from django.contrib import admin
from .models import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'location')


admin.site.register(Item, ItemAdmin)