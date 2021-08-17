from django.contrib import admin
from .models import Key


class KeyAdmin(admin.ModelAdmin):
    list_display = ('key', 'value')


admin.site.register(Key, KeyAdmin)