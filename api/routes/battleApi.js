var express = require('express');
var router = express.Router();

//connecting with database
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://manish123:manish123@cluster0-o3prk.mongodb.net/GOTseries?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology:true});

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

     console.log('db connected...!');

     //dummy route for fetching all data
     router.get('/dummy', function(req, res, next) {
      connection.db.collection("battle", function(err, collection){
        collection.find({}).toArray(function(err, data){
            res.json(data); // it will print your collection data
        })
    });
  });

  //list route returns Array of battle places
    router.get('/list', function(req, res, next) {
      connection.db.collection("battle", function(err, collection){
        collection.find({}).project({ location: 1, _id: 0}).toArray(function(err, data){
            res.json(data); // it will print your collection data
        })
    });
  });
 
//return total number of battles
  router.get('/count', function(req, res, next) {
    connection.db.collection("battle", function(err, collection){
      collection.count({},function(err, data){
          res.json("Total number of battles occurred = " + data); // it will print your collection data
      })
  });
});


//search for multiple query
router.get('/search', function(req, res, next) {

  var kingName = req.query.king
  console.log(kingName)
  var location = req.query.location;
  console.log(location)
  var type = req.query.type;
  console.log(type)

  //return list of battles when user provide king name
  if(typeof req.query.location == 'undefined' && typeof req.query.type == 'undefined'){
    connection.db.collection("battle", function(err, collection){
      collection.find({$or: [{ attacker_king:  kingName}, { defender_king: kingName}]})
      .project({ name: 1, _id: 0}).toArray(function(err, data){
          res.json(data); // it will print your collection data
      })
  });
  }
  //returns list of battle with added info.
      else{
        connection.db.collection("battle", function(err, collection){
          collection.find({$or: [{ attacker_king:  kingName}, { defender_king: kingName}], location: location, battle_type: type})
          .project({ name: 1, _id: 0}).toArray(function(err, data){
              res.json(data); // it will print your collection data
          })
      });
    }  
});

router.get('/BattleApi/:location', function(req, res, next) {
  var warLocation = req.params.location;
  connection.db.collection("battle", function(err, collection){
    collection.find({location: warLocation}).toArray(function(err, data){
        res.json(data); // it will print your collection data
    })
});
});

});


module.exports = router;
