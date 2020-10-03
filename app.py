from flask import Flask, render_template, redirect, url_for, Response, jsonify
from bson import json_util
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import requests
import json
from datetime import datetime as dt


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/disasters"
mongo = PyMongo(app)


# @app.route("/")
# def homeRoute():
#     return render_template("index.html")

@app.route("/alldisasters/", methods=['GET'])
@cross_origin()
def alldisasters():
    disastersdb = mongo.db.disasters_collection
    alldisasters = disastersdb.find({})
    disastersjson = json.loads(json_util.dumps(alldisasters))
    return jsonify(disastersjson)

# user date will comes as yyyy-mm-dd - route be /filter/2020-02-09

@app.route("/filter/<date>", methods=['GET'])
@cross_origin()
def filterByDate(date):
    #exampke format of date 2020-02-09
    print("date as sent", dt.now(), date)
    userSelDate = dt.strptime(date , "%Y-%m-%d").strftime("%m/%d/%y").replace('0','')
    print("date after format", dt.now(), userSelDate)
    disastersdb = mongo.db.disasters_collection
    date_disasters = disastersdb.find({'Begin_Date': userSelDate})
    disastersjson = json.loads(json_util.dumps(date_disasters))
    return jsonify(disastersjson)


@app.route("/filter/<state>", methods=['GET'])
@cross_origin()
def filterByState(state):
    
    userSelState = state
    disastersdb = mongo.db.disasters_collection
    state_disasters = disastersdb.find({'state': userSelState})
    disastersjson = json.loads(json_util.dumps(state_disasters))
    return jsonify(disastersjson)


@app.route("/filter/incident/<incident>", methods=['GET'])
@cross_origin()
def filterByIncident(incident):
    print("Incident sent",incident)
    userSelincident = incident
    disastersdb = mongo.db.disasters_collection
    incident_disasters = disastersdb.find({'incident_type': incident})
    print('incident disasters selected',incident_disasters)
    disastersjson =json.loads(json_util.dumps(incident_disasters))
    return jsonify(disastersjson)

if __name__ == "__main__":
    app.run(debug=True)
 

