from ast import keyword
from keybert import KeyBERT
import requests


def extract_key(text) -> str:
    # return KeyBERT().extract_keywords(text)
    x = requests.get(
        f'http://yake.inesctec.pt/yake/v2/extract_keywords?content={text}&max_ngram_size=3&number_of_keywords=3&highlight=true" -H "accept: application/json"')
    if x.status_code == 200:
        if x.json()['keywords'] is not None:
            keywords = []
            for word in x.json()['extract']:
                keywords.append(word['ngram'])
            return keywords
    return text.split()
