from keybert import KeyBERT


def extract_key(text):
    kw_model = KeyBERT()
    return kw_model.extract_keywords(text)
