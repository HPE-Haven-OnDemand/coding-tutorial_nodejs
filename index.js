'use strict';
var expressApp = require('express')()
var urlencoded = require('body-parser').urlencoded({extended: false}) 
var havenondemand = require('havenondemand')

var port = process.env.PORT || 5000
var client = new havenondemand.HODClient('API_KEY', 'v1', 'OPTIONAL_PROXY')

var outputResults = function(text, sentiment, score, concepts, entities) {
  console.log("\n---------------------------------------------")
  console.log("---------------------------------------------")
  console.log("RECEIVED: ", text)
  console.log("\nSENTIMENT: ", sentiment, " | ", score)
  console.log("\nCONCEPTS:")
  console.log(concepts)
  console.log("\nENTITIES:")
  console.log(entities)
  console.log("---------------------------------------------")
  console.log("---------------------------------------------\n")
}

expressApp.post('/text_processor', urlencoded, function(req, res){
  var text = req.body["Body"]
  var entityData = {text: text, entity_type: ['people_eng', 'places_eng', 'companies_eng', 'organizations']}
  
  client.call('analyzesentiment', {text: text}, function(err1, resp1){
    client.call('extractconcepts', {text: text}, function(err2, resp2){
      client.call('extractentities', entityData, function(err3, resp3){
        var sentiment = resp1.body.aggregate.sentiment
        var score = resp1.body.aggregate.score
        var concepts = resp2.body.concepts
        var entities = resp3.body.entities
        outputResults(text, sentiment, score, concepts, entities)
        res.sendStatus(200)
      })
    })
  })
})

expressApp.listen(port, function(){
  console.log("Listening on port: ", port)
})