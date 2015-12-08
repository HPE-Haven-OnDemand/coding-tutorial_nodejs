express = require('express')
app = express()
http = require('http').Server(app)
bodyParser = require('body-parser')
urlencoded = bodyParser.urlencoded({extended: false})
havenondemand = require('havenondemand')
client = new havenondemand.HODClient('http://api.havenondemand.com', 'API_KEY')

port = process.env.PORT || 5000

app.post('/text_processor', urlencoded, function(req, res){
  var text = req.body["Body"]
  var data1 = {text: text}
  var data2 = {text: text, entity_type: ['people_eng', 'places_eng', 'companies_eng', 'organizations']}
  client.call('analyzesentiment', data1, function(err1, resp1, body1){
    var sentiment = resp1.body.aggregate.sentiment
    var score = resp1.body.aggregate.score
    client.call('extractconcepts', data1, function(err2, resp2, body2){
      var concepts = resp2.body.concepts
      client.call('extractentities', data2, function(err3, resp3, body3){
        var entities = resp3.body.entities
        console.log("---------------------------------------------")
        console.log("---------------------------------------------")
        console.log(text + " | " + sentiment + " | " + score)
        printStuff("Concepts", concepts)
        printStuff("Entities", entities)
      })
    })
  })
})

printStuff = function(string, arr) {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(string + ": ")
  for (var i=0; i<arr.length;i++) {
    console.log(arr[i])
  }
}

http.listen(port, function(){
  console.log("listening on port: " + port)
})
