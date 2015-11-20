var mongojs = require('mongojs');

//Connect via the read-only 'instructor' account to my database.
var connect = 'mongodb://instructor:instructor@ds049130.mongolab.com:49130/unicorns';

var db = mongojs(connect, [], {authMechanism: 'ScramSHA1'});


var unicorns = db.collection('unicorns');

//Get the unicorns from the database that meet the criteria
var horsies = unicorns.find({weight: {$gte: 400}, loves: {$in: ['apple', 'grape']}});

horsies.forEach(function(err, doc) {
  if(err) {
    console.log('error: ' + err);
    return;
  }
  if(doc == null) {
    process.exit(0);
  } 
  console.log(doc.name + ", " + doc.dob + ", " + doc.weight);

  }//end anon function
);//end forEach
