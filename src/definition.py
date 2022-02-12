import requests

def wiki_extract(phrase):
    x = requests.get(f'https://en.wikipedia.org/api/rest_v1/page/summary/{phrase}')
    if x.status_code == 200:
        if x.json()['extract'] is not None:
            return x.json()['extract']
        return "No definition found"


def dictionary_extract(phrase):
    x = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{phrase}')
    if x.status_code == 200:
        if x.json()[0]['meanings'][0]['definitions'][0]['definition'] is not None:
            return x.json()[0]['meanings'][0]['definitions'][0]['definition']
        return "No definition found"