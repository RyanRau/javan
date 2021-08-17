import requests
import json

class Trello():
    URL = "https://api.trello.com/1/"
    TRELLO_KEY = None
    TRELLO_TOKEN = None

    def __init__(self, key, token):
        self.TRELLO_KEY = key
        self.TRELLO_TOKEN = token

    def create_card(self, list_id, card_title, card_desc, due_dateTime):
        query = {
            'idList': list_id,
            'name': card_title,
            'desc': card_desc,
            'due': due_dateTime,
            'key': self.TRELLO_KEY,
            'token': self.TRELLO_TOKEN,
        }
    
        response = requests.request(
            "POST",
            self.URL + 'cards',
            params=query
        )
    
        json_data = json.loads(response.text)
        
        return json_data['id']
 
    def create_checklist(self, card_id, checklist_name):
        query = {
            'name': checklist_name,
            'key': self.TRELLO_KEY,
            'token': self.TRELLO_TOKEN,
        }
    
        response = requests.request(
            "POST",
            self.URL + 'cards/' + card_id + '/checklists',
            params=query
        )
    
        json_data = json.loads(response.text)
        return json_data['id']
 
    def create_checklist_item(self, checklist_id, item, is_checked):
        query = {
            'key': self.TRELLO_KEY,
            'token': self.TRELLO_TOKEN,
            'name': item,
            'checked': str(is_checked).lower(),
            'pos': "bottom", 
        }
        
        response = requests.request(
            "POST",
            self.URL + 'checklists/' + checklist_id + '/checkItems',
            params=query
        )
