from src import googlenews


def test_googlenews():
    keywords = ["covid", "infection", "Singapore"]
    news = googlenews.run(keywords)

    assert len(news) > 0 or news == "No keywords provided"


def test_root_news():
    keywords = ["covid", "infection", "Singapore"]
    news = googlenews.run(keywords)
    rootNews = googlenews.getRootNews(news)

    assert isinstance(rootNews, dict)
