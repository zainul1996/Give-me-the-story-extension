import pytest
import json

from src import googlenews


def test_googlenews():
    keywords = ["Iris", "Koh", "healing", "the", "divide"]
    news = googlenews.run("news", keywords)
    # write to file
    with open("test_news.json", "w") as f:
        json.dump(news, f)
    assert len(news) > 0 or news == "No keywords provided"


