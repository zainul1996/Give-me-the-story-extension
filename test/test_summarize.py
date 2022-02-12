from src import summarizer


def test_summarizer():
    summary = summarizer.summarize_text(
        "Hello, I am a long text used to test the summary model. This is now going to be summarized. I hope it becomes shorter.")
    print(summary)
    assert len(summary) > 0
