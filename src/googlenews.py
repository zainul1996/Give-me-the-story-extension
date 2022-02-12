import datetime
import json

from gnews import GNews

reliable_sources_href = [
    "https://www.channelnewsasia.com",
    "https://www.straitstimes.com",
    "https://www.bloomberg.com",
]

unreliable_sources_href = [
    "https://mothership.sg"
]


def filterReliableNews(news):
    return [item for item in news if item["publisher"]["href"] in reliable_sources_href]


def filterMatched(news, keywords, matchThreshold):
    for item in news:
        item["score"] = 0
        for keyword in keywords:
            if keyword.upper() in item["title"].upper():
                item["score"] += 1
    
    news = [item for item in news if item["score"] >= matchThreshold*len(keywords)]
    return news


def sortByScore(news):
    return sorted(news, key=lambda k: k["score"], reverse=True)


def getNews(keywords=[]):
    if len(keywords) > 0:
        search_keyword = " ".join(str(x) for x in keywords)
        google_news = GNews(language='en', country='SG', period='2y')
        news = google_news.get_news(search_keyword)

        return news
def addParsedDate(news):
    for item in news:
        item["formatted published date"] = datetime.datetime.strptime(item["published date"], "%a, %d %b %Y %H:%M:%S %Z").timestamp()
    return news

def groupByYear(news):
    news = sorted(news, key=lambda k: k["formatted published date"], reverse=False)
    grouped_news = {}
    for item in news:
        date = datetime.datetime.fromtimestamp(item["formatted published date"])
        year = date.year
        if year not in grouped_news:
            grouped_news[year] = []
        grouped_news[year].append(item)
    return grouped_news


def run(mode, keywords=[]):
    matchThreshold = 0.5
    if len(keywords) > 0:
        news = getNews(keywords)
        news = filterMatched(news, keywords, matchThreshold)
        news = sortByScore(news)
        news = addParsedDate(news)
        # news = filterReliableNews(news)
        news = groupByYear(news)
        return news
    else:
        return "No keywords provided"