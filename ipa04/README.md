db.unicorns.find({gender: 'm', weight: {$gt: 700}})
{ "_id" : ObjectId("564b7747d8561122151b5fb3"), "name" : "Unicrom", "dob" : ISODate("1973-02-10T03:10:00Z"), "loves" : [ "energon", "redbull" ], "weight" : 984, "gender" : "m", "vampires" : 182 }
{ "_id" : ObjectId("564b775bd8561122151b5fbc"), "name" : "Dunx", "dob" : ISODate("1976-07-18T22:18:00Z"), "loves" : [ "grape", "watermelon" ], "weight" : 704, "gender" : "m", "vampires" : 165 }


db.unicorns.find({gender: {$ne: 'f'}, weight: {$gte: 700}})
{ "_id" : ObjectId("564b7747d8561122151b5fb3"), "name" : "Unicrom", "dob" : ISODate("1973-02-10T03:10:00Z"), "loves" : [ "energon", "redbull" ], "weight" : 984, "gender" : "m", "vampires" : 182 }
{ "_id" : ObjectId("564b775bd8561122151b5fbc"), "name" : "Dunx", "dob" : ISODate("1976-07-18T22:18:00Z"), "loves" : [ "grape", "watermelon" ], "weight" : 704, "gender" : "m", "vampires" : 165 }

db.unicorns.find({vampires: {$exists: false}})
{ "_id" : ObjectId("564b775bd8561122151b5fbb"), "name" : "Nimue", "dob" : ISODate("1999-12-20T21:15:00Z"), "loves" : [ "grape", "carrot" ], "weight" : 540, "gender" : "f" }

db.unicorns.find({loves: {$in: ['apple', 'orange']}})
{ "_id" : ObjectId("564b7747d8561122151b5fb4"), "name" : "Roooooodles", "dob" : ISODate("1979-08-18T22:44:00Z"), "loves" : [ "apple" ], "weight" : 575, "gender" : "m", "vampires" : 99 }
{ "_id" : ObjectId("564b7748d8561122151b5fb8"), "name" : "Raleigh", "dob" : ISODate("2005-05-03T04:57:00Z"), "loves" : [ "apple", "sugar" ], "weight" : 421, "gender" : "m", "vampires" : 2 }
{ "_id" : ObjectId("564b7747d8561122151b5fb5"), "name" : "Solnara", "dob" : ISODate("1985-07-04T06:01:00Z"), "loves" : [ "apple", "carrot", "chocolate" ], "weight" : 550, "gender" : "f", "vampires" : 80 }
{ "_id" : ObjectId("564b775bd8561122151b5fba"), "name" : "Pilot", "dob" : ISODate("1997-03-01T10:03:00Z"), "loves" : [ "apple", "watermelon" ], "weight" : 650, "gender" : "m", "vampires" : 54 }
{ "_id" : ObjectId("564b775bd8561122151b5fb9"), "name" : "Leia", "dob" : ISODate("2001-10-08T18:53:00Z"), "loves" : [ "apple", "watermelon" ], "weight" : 601, "gender" : "f", "vampires" : 33 }


db.unicorns.remove({vampires: {$exists: false}})
WriteResult({ "nRemoved" : 1 })

db.unicorns.update( {vampires: {$gt: 50}}, {$push: {loves: 'blood'}}, {multi: true} )


db.unicorns.insert( {'name': 'Voldemort'}, {'dob': ISODate('1512-11-19T05:23:00Z')}, {'loves': ['blood', 'oranges']}, {'weight': 1012}, {'gender': 'm'}, {'vampire': 1000})
WriteResult({ "nInserted" : 1 })
