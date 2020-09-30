from flask import Flask, render_template, redirect, url_for, Response, jsonify
from bson import json_util
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import requests
import json


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/disasters"
mongo = PyMongo(app)

@app.route("/", methods=["GET"])
def index():
    disastercollection = mongo.db.disasters 
    response = requests.get("https://disasters.ceo/api/state/list/all")
    # print(response.json())
    responseJson = response.json()
    disastercollection.insert(responseJson)
    # return render_template("index.html", mars=mars)


@app.route("/alldisasters/", methods=['GET'])
@cross_origin()
def alldisasters():
    disastersdb = mongo.db.alldisasters
    # mars_data = scrape_mars.scrape_all()
    # mars.update({}, mars_data, upsert=True)
    alldisasters = disastersdb.find({})
    us_disaster_declarations = json.loads(json_util.dumps(alldisasters))
    return jsonify(us_disaster_declarations)

if __name__ == "__main__":
    app.run()