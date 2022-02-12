from src import keyextraction


def test_extract_key():
    keywords = keyextraction.extract_key("Hello, I am a key extraction model.")
    print(keywords)
    assert len(keywords) > 0
