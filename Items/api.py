import requests as r
import json

#data= {"name":"to be deleted","category":"Collectables","seller": "RJ","highestBid": "6000.8"}
with open(r"C:\Users\Ahmad El-Gohary\Documents\GitHub\Auction Sprint\Items\data.json") as f: data = json.loads(f.read())

for i in data:
    response = r.request("POST","http://localhost:5500/item", data=json.dumps(i), headers= {'Content-Type': 'application/json'})
#response =r.request("DELETE","http://localhost:5500/item/6583e96f732f382df2c468d5", headers= {'Content-Type': 'application/json'})
print(response.text)


