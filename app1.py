#!/usr/bin/env python
import sys
import pandas as pd
import pymongo
import json
import os

# create path and define variables to store data from csv
def import_content(filepath):
    mng_client = pymongo.MongoClient('localhost', 27017)
    mng_db = mng_client['disasters'] 
    collection_name = 'disasters_collection'
    db_cm = mng_db[collection_name]
    cdir = os.path.dirname(__file__)
    file_res = os.path.join(cdir, filepath)
#read csv and load to json
    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    db_cm.remove()
# update db with the json objects
    db_cm.insert(data_json)
#converting value to date instead of string, to allow use of gte and lte sorting
    db_cm.update_many(
    {},
    [
      { "$set": { "incident_begin_date": { "$toDate": "$incident_begin_date" } }
    
      }]
     )
       
if __name__ == "__main__":
  filepath = 'fema_declaration.csv' 
  import_content(filepath)

  
