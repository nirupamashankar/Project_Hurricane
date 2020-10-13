#import dependencies
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

# creating route to get only disasters to populate disaster drop down
@app.route("/listdisasters/", methods=['GET'])
@cross_origin()
def listdisasters():
    print('call distinct disaster')
    listdisastersdb = mongo.db.disasters_collection
    distdisasters = listdisastersdb.distinct("incident_type")
    print("disasters",distdisasters)
    return jsonify(distdisasters)

#creating route with all data, in case needed
@app.route("/alldisasters/", methods=['GET'])
@cross_origin()
def alldisasters():
    disastersdb = mongo.db.disasters_collection
    alldisasters = disastersdb.find({})
    disastersjson = json.loads(json_util.dumps(alldisasters))
    return jsonify(disastersjson)

#creating route with data necessary to render the graph when date filter is used
@app.route("/filter/date/<fromdate>/<todate>", methods=['GET'])
@cross_origin()
def filterByDate(fromdate,todate):
    
    #print("date as sent", fromdate)
    x = dt.strptime(fromdate , "%Y-%m-%d")
    y = dt.strptime(todate , "%Y-%m-%d")
    disastersdb = mongo.db.disasters_collection
#sort and find only objects within user selected date range
    date_disasters=disastersdb.find(
        { "$and":[
            {"incident_begin_date": {"$gt": x}},
            { "incident_begin_date": {"$lt": y}}]
        },
# return only required fields
            {"state": 1, "incident_type": 1,"Begin_Date":1}
            )
    disastersjson = json.loads(json_util.dumps(date_disasters))
    print(disastersjson)
    return jsonify(disastersjson)

#creating route with data necessary to render the graph when state filter is used
@app.route("/filter/state/<state>", methods=['GET'])
@cross_origin()
def filterByState(state):
    
    userSelState = state
    disastersdb = mongo.db.disasters_collection
    state_disasters = disastersdb.find({'state': userSelState}, 
    # return only required fields
    {"state": 1, "incident_type": 1})
    disastersjson = json.loads(json_util.dumps(state_disasters))
    return jsonify(disastersjson)

#creating route with data necessary to render the graph when disaster filter is used
@app.route("/filter/incident/<incident>", methods=['GET'])
@cross_origin()
def filterByIncident(incident):
    incident=incident.replace("~","/")
    print("Incident sent",incident)
    disastersdb = mongo.db.disasters_collection
    incident_disasters = disastersdb.find({'incident_type': incident}, 
    # return only required fields
    {"incident_type": 1, "fy_declared": 1})
    disastersjson =json.loads(json_util.dumps(incident_disasters))
    #print(disastersjson)
    return jsonify(disastersjson)

if __name__ == "__main__":
    app.run(debug=True)


