from gnews import GNews

google_news = GNews()
text = input("Search keyword:")
news = google_news.get_news(text)
print(news)