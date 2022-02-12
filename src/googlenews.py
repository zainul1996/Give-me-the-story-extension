import datetime
import json

from gnews import GNews

google_news = GNews(language='en', country='SG',
                    period='2y',
                    exclude_websites=[
                        'theindependent.sg', 'malaymail.com'])


def score(news, keywords):
    for item in news:
        item["score"] = 0
        for keyword in keywords:
            if keyword in item["title"]:
                item["score"] += 1

    return [item for item in news if item["score"] > 0]


def sortByScore(news):
    return sorted(news, key=lambda k: k["score"], reverse=True)


def getNews(keywords=[]):
    if len(keywords) > 0:
        search_keyword = " ".join(str(x) for x in keywords)
        news = google_news.get_news(search_keyword)

        return news


def getRootNews(news):
    # parse every items 'published date' string in 'Fri, 12 Nov 2021 08:00:00 GMT' format to datetime object
    for item in news:
        item["formatted published date"] = datetime.datetime.strptime(
            item["published date"], "%a, %d %b %Y %H:%M:%S %Z"
        )

    # sort news by 'published date'
    news = sorted(
        news, key=lambda k: k["formatted published date"], reverse=False)

    return news[0]


def run(keywords=[]) -> dict:
    if len(keywords) > 0:
        search_keyword = " ".join(str(x) for x in keywords)
        news = google_news.get_news(search_keyword)

        for item in news:
            item["score"] = 0
            for keyword in keywords:
                if keyword in item["title"]:
                    item["score"] += 1

        news = getNews(keywords)
        # news = filterMatched(news, keywords)
        news = score(news, keywords)
        news = sortByScore(news)
        # news = filterReliableNews(news)

        return news
    else:
        return {}
