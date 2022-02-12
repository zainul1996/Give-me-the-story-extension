import pytest

from src import definition

def test_wiki():
    meaning = definition.wiki_extract("covid")
    assert meaning is not None

def test_dictionary():
    meaning = definition.dictionary_extract("covid")
    assert meaning is not None

