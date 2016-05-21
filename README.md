# What this is
This is a sample project to demonstrate the use of the Haven OnDemand client library and to help illustrate how Haven OnDemand’s powerful Text Analysis APIs can be used.

This Node.js app receives text messages via [Twilio’s webhook service](https://www.twilio.com/platform/webhooks), analyzes the sentiment, using our [Analyze Sentiment API](https://dev.havenondemand.com/apis/analyzesentiment#overview), extracts any key concepts, using our [Concept Extraction API](https://dev.havenondemand.com/apis/extractconcepts#overview), and extracts any entities (famous people, notable places, companies, organizations), using our [Entity Extraction API](https://dev.havenondemand.com/apis/extractentities#overview). All of this information is then printed to the console.

A tutorial can be found in the ['Getting up and running with HPE Haven OnDemand' video](http://www.youtube.com/watch?v=8aW5XDbd4A8?t=15m32s). **Update: _The code has since been changed, but the key concepts remain the same._**

# What this does
![diagram](./diagram.png)

Essentials you’ll need to create this app:
* [Node.js](https://nodejs.org/en/) installed on your computer
* [Haven OnDemand account](http://havenondemand.com/) - to perform analysis of text messages
* [Twilio account](https://www.twilio.com ) - to deliver text messages to the webhook
* [ngrok](https://ngrok.com/) - to receive POST requests on local computer from external APIs

Simply clone this repo onto your local machine and run:

```
npm install
```
