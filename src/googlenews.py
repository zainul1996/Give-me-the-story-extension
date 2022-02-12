import json

from gnews import GNews

reliable_sources_href = [
    "https://www.channelnewsasia.com",
    "https://www.straitstimes.com",
    "https://www.bloomberg.com",
]


def filterReliableNews(news):
    return [item for item in news if item["publisher"]["href"] in reliable_sources_href]


def filterMatched(news, keywords):
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
        google_news = GNews()
        news = google_news.get_news(search_keyword)

        return news


def run(keywords=[]):
    if len(keywords) > 0:
        search_keyword = " ".join(str(x) for x in keywords)
        google_news = GNews()
        news = google_news.get_news(search_keyword)

        for item in news:
            item["score"] = 0
            for keyword in keywords:
                if keyword in item["title"]:
                    item["score"] += 1

        news = getNews(keywords)
        news = filterMatched(news, keywords)
        news = sortByScore(news)
        news = filterReliableNews(news)

        return news
    else:
        return "No keywords provided"
