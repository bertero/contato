if(!process.env.NODE_ENV || process.env.NODE_ENV == 'local')  environment = 'local'
else if(process.env.NODE_ENV =='canary' )                     environment = 'canary'
else if(process.env.NODE_ENV =='production' )                 environment = 'production'
else if(process.env.NODE_ENV =='stagging')                    environment = 'stagging'

ebEnvironment = process.env.EB_ENV || 'local'

//AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
//AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
NODE_ENV = environment
PROJECT = "contato"


//GLOBAL DECLARATION
request = require('request')
//async = require('async')
u = require('underscore')
redis = require("redis")

//APPLICATION SERVER
var bodyParser = require('body-parser')
var express = require('express')
app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}))

http = require('http')
http.globalAgent.maxSockets = 1000
http.globalAgent.keepAlive = true
http.globalAgent.keepAliveMsecs = 600000

var contatoPort = process.env.PORT || 1337
http.createServer(app).listen(contatoPort, null, null, function(){
  console.log('Listening on port ' + contatoPort)
})

//REQUIRE DIRECTORIES
var requireDir = require('require-dir')
directories.forEach(function(dir){
  requireDir(dir)
})