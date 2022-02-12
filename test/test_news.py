import pytest
from src import googlenews

def test_googlenews():
    keywords = ["covid", "infection", "positive", "waning"]
    news = googlenews.run(keywords)
    assert len(news) > 0 or news == "No keywords provided"