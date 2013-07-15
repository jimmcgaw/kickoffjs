var rq = require("request");
var express = require("express");
var htmlparser = require("htmlparser");
var select = require('soupselect').select;
var _ = require('underscore');
var mustache = require("mustache");

var app = express();
app.use(express.logger());

var KICKOFF_URL = "http://www.meetup.com/Santa-Barbara-JavaScript-Meetup/events/125332992/";

app.get('/', function(request, response) {
  response.end("<!DOCTYPE html><html><head></head><body><h1>JavaScript Kickoff Member List</h1><br /><a href='/members'>Load member list</a></body></html>");
});

app.get('/members', function(request, response) {
  var member_list = [];
  rq.get(KICKOFF_URL, function(error, res, body){
    var handler = new htmlparser.DefaultHandler(function(error, dom){
      if (error) {
        console.log(error);
      } else {
        var members = select(dom, "#rsvp-list h5.member-name a"),
            i;
        console.log("Found " + members.length + " members.");
        member_list = _.map(members, function(member){
          return { "name" : member.children[0].raw };
        });
        var view = { "members" : member_list };
        response.end(mustache.render("<!DOCTYPE html><html><head></head><body><h2>{{members.length}} member(s) are attending:</h2><br />{{#members}}{{ name }}<br />{{/members}}</body></html>", view));
      }
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(body);
  });
});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});