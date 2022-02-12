from src import summarizer


def test_summarizer():
    summary = summarizer.summarize_text(
        # multi line string
        """
        Away from GST, the discourse on wealth taxes has gathered momentum, with various politicians weighing in on the matter.
        Mr Wong, for one, has addressed the issue on several occasions, stressing that Singapore is already taxing wealth in various forms such as property tax and stamp duties on residential properties, as well as additional registration fees on motor vehicles.
        But to guard against rising wealth inequality, the Finance Minister has said the Government is studying how to expand its system of wealth taxes in ways that “add to (Singapore’s) revenue resilience without undermining overall competitiveness”.
        Speaking at the Bloomberg New Economy Forum in November last year, Prime Minister Lee Hsien Loong said while the Government wants a wealth tax in principle, it is “very hard” to do so in forms other than property tax. To this end, it will need to find a tax system that is progressive and “people will accept as fair”.
        Taxes on privately held wealth can help Singapore to “recoup some of the fiscal damage” and address a widening wealth gap, according to Grant Thornton Singapore.
        “The Government has already stated that raising GST will not be sufficient … They can certainly increase other forms of existing taxes, but these do not broaden the tax base (or) help deal with the increasing wealth gap,” said the professional services firm’s private clients and employer solutions partner Adrian Sham.
        “Wealth taxes can tick all of these boxes.”
        But rolling out a “pure wealth tax” – one that taxes the net wealth of an individual – would be “a death wish” for Singapore, given difficulties in implementation and the possibility of spurring a capital flight, said Mr Sham.
        “As with any other tax policy decision, it is a fine balance between milking the cow versus killing the goose that is laying the golden egg. This is no different when considering new taxes on wealth,” he added.
        As such, Grant Thornton is suggesting that wealth taxes be directed at investment properties via a combination of a real property gains tax for residential property and a deemed rental income tax for vacant residential property.
        “Singapore real estate provides a safe-haven parking lot for foreign wealth as properties can be perpetually left empty,” said Mr Sham, adding that these properties do not contribute to the economy unless they are used productively.
        Introducing a deemed rental income - in effect, the amount an owner could have made if a vacant property was rented out - for unoccupied residential property owned by both local and foreign individuals, would drive some owners to sell or rent their property out. Those who choose to leave it empty would also be paying more taxes through tax on the deemed rental income.
        “It is also difficult to evade or plan around, as the property is hiding in plain sight and cannot be moved overseas," he added.
        """ 
        )
    print(summary)
    assert len(summary) > 0
