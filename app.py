from flask import Flask, request, jsonify, render_template
from src import definition, googlenews, keyextraction

app = Flask(__name__)


@app.route("/get", methods=["GET"])
def get_something():
    # Retrieve the "name" from url parameter
    # If empty, sets "name" as None
    name = request.args.get("name", None)

    # For debugging
    print(f"got name {name}")

    response = {}

    # Check if user sent a name at all
    if not name:
        response["ERROR"] = "no name found, please send a name."
    # Check if the user entered a number not a name
    elif str(name).isdigit():
        response["ERROR"] = "name can't be numeric."
    # Now the user entered a valid name
    else:
        response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"

    # Return the response in json format
    return jsonify(response)


@app.route("/post/", methods=["POST"])
def post_something():
    param = request.form.get("name")
    print(param)
    # You can add the test cases you made in the previous function, but in our case here you are just testing the POST functionality
    if param:
        return jsonify(
            {
                "Message": f"Welcome {name} to our awesome platform!!",
                # Add this option to distinct the POST request
                "METHOD": "POST",
            }
        )
    else:
        return jsonify({"ERROR": "no name found, please send a name."})


# A welcome message to test our server
@app.route("/")
def index():
    return "<h1>Hello World !!</h1>"


# Renders a html file from the templates folder
@app.route("/helloworld")
def helloworld():
    return render_template("index.html")


@app.route("/site")
def site():
    text = request.args.get("text")
    keywords = keyextraction.extract_key(text)

    print(keywords)

    string = ""
    for word in keywords:
        string += word + "<br>"

    string += definition.wiki_extract(text) + "<br>"
    string += definition.dictionary_extract(text) + "<br>"

    articles = googlenews.run(keywords)

    return render_template("index.html", text=text, string=string, articles=articles)


@app.route("/iframe")
def iframe():
    text = request.args.get("text")
    keywords = keyextraction.extract_key(text)
    # articles = googlenews.run(keywords)

    # if (articles[0][0] != None):
    #     return articles[0][0]['summary']



    dictionary_definition = definition.dictionary_extract(text)
    if (dictionary_definition != None):
        return dictionary_definition

    wiki_definition = definition.wiki_extract(text)
    if (wiki_definition != None):
        return wiki_definition


if __name__ == "__main__":
    # Threaded option to enable multiple instances for multiple user access support
    app.run(debug=True, threaded=True, port=5000)
