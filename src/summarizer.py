from gensim.summarization import summarize


def summarize_text(text) -> str:
    return(summarize(text))
