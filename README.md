# API Rest created in NodeJS using ExpressJS and MongoDB.

This code is an example of how to create an api using nodejs/expressjs and mongodb.

### Required
- NodeJS
- Npm
- Visual Studio Code

### Packages requireds

- express
- mongodb
- consign
- nodemon

### Steps for create project.

* 1 - mkdir api-node-people
* 2 - cd api-node-people
* 3 - npm init
* 4 - npm install express
* 5 - npm install mongodb
* 6 - npm install consign
* 9 - npm install nodemon

### Estructure of the project.

1.png


### Understanding the project.

In the folder config existing two files, config.js and connection.js.

#### In the file config.js there are settings for transformation data and where the Consign is configured for auto load folders and file for ExpressJS.


```javascript
var express          = require('express');

var consign          = require('consign');

var bodyParser       = require('body-parser');

var app = express();



//Use bodyparse for transformation data into json.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//setup auto load for app.
consign().include("./config/connection.js")
         .then("app/repositorys")
         .then("app/controllers")
         .into(app);


//exports express
module.exports = app;

```

### In the file connection.js we create the connection MongoDB.

```javascript
const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;



/**
 * 
 * @author Cícero Ednilson
 * 
 * 
 * @description  responsible for connection mongo database.
 *
 *  
 */


/** 
Connection URL
*/
const url = 'mongodb://localhost:27017';


/**
Database Name
*/
const dbName = 'peopledb';


/**
 * Enum types commands
 */
var  commandType = {

    INSERT:1,
    INSERTMANY:2,
    FIND:3,
    DELETEONE:4,
    UPDATEONE:5,
    FINDALL:6,
    DELETEONEBYID:7,
    UPDATEONEBYID:8,
    DELETEMANY:9,
    UPDATEMANY:10

};

/**
 * Execute one insert
 * 
 * example:
 * 
 * var value = {"name": "Cicero" + i, "age": 33};
 * 
 * connection.insert(value,"people", function(error, result){
 *
 *   console.log(result);
 * 
 * });
 * 
 *  
 */
module.exports.insert = function(documentValue, collectionName, callbackResult){


    executeCommands(commandType.INSERT, documentValue, collectionName, callbackResult, null);
}

/**
 * Execute many inserts
 * 
 * example:
 * 
 *
 * var value = [{"name": "Joao 1", "age": 33},{"name": "Joao 2", "age": 31}];
 * 
 * connection.insertMany(value,"people", function(error, result){
 * 
 *     console.log(result);
 * }); 
 */
module.exports.insertMany = function(documentValue, collectionName, callbackResult){


    executeCommands(commandType.INSERTMANY, documentValue, collectionName, callbackResult,null);
}

/**
 * Execute select command
 * 
 * example:
 * 
 * var filter = {"name": "Joao 1", "age": 40};
 * 
 * connection.find(filter,"people", function(error, result){
 * 
 *     console.log(result);
 * });
 * 
 */
module.exports.find = function(documentValue, collectionName, callbackResult){


    executeCommands(commandType.FIND, documentValue, collectionName, callbackResult, null);
}

/**
 * Execute select by id
 * 
 * example:
 * 
 * connection.findById("5c4270b548ab0414401fba6a","people", function(error, result){
 *  
 *    console.log(result);
 * });
 */
module.exports.findById = function(id, collectionName, callbackResult){

    var filterById = {"_id": ObjectId(id)};

    executeCommands(commandType.FIND, filterById, collectionName, callbackResult, null);
}

/**
 * Execute select for all registers
 * 
 * example:
 * 
 * connection.findAll("people", function(error, result){
 * 
 *     console.log(result);
 * });
 */
module.exports.findAll = function(collectionName, callbackResult){

    executeCommands(commandType.FIND, null, collectionName, callbackResult, null);
}

/**
 * Update one by id
 * 
 * example:
 * 
 * var fields = {"name": "Joao 11222111", "age": 10}
 * connection.updateOneById(fields, "5c4270b548ab0414401fba6a","people", function(error, result){
 * 
 *     console.log(result);
 * });
 * 
 */
module.exports.updateOneById = function(documentValue, id, collectionName, callbackResult){

    var filterById = {"_id": ObjectId(id)};

    executeCommands(commandType.UPDATEONEBYID, documentValue, collectionName, callbackResult, filterById);
}

/**
 * Update one document
 * 
 * example:
 * 
 * const ObjectId    = require('mongodb').ObjectId;
 * 
 * var valuesUpdate = {"name": "Joao 1 virou 23", "age": 41};
 * var keysUpdate = { "_id": ObjectId('5c4270b548ab0414401fba6a')};
 *
 *  connection.updateOne(valuesUpdate,"people",keysUpdate, function(error, result){
 *     console.log(result);
 *  })
 * 
 */
module.exports.updateOne = function(documentValue, collectionName, keyForUpdateOrDelete, callbackResult){


    executeCommands(commandType.UPDATEONE, documentValue, collectionName, callbackResult, keyForUpdateOrDelete);
}

/**
 * update many documents
 * 
 * example:
 * 
 * var valuesUpdate = {"name": "Joao Atuaizado 43", "age": 41};
 * var keysUpdate = { "age": 43};
 * 
 * connection.updateMany(valuesUpdate,"people",keysUpdate, function(error, result){
 *   
 *   console.log(result);
 * 
 * });
 * 
 */
module.exports.updateMany = function(documentValue, collectionName, keyForUpdateOrDelete, callbackResult){


    executeCommands(commandType.UPDATEMANY, documentValue, collectionName, callbackResult, keyForUpdateOrDelete);
}

/**
 * Delete one document by id
 * 
 * 
 * example:
 * 
 * 
 * connection.deleteOneById("5c4311f97d23b81daff32e19","people", function(error, result){
 *
 *    
 *    console.log(result);
 * });
 */
module.exports.deleteOneById = function(id, collectionName, callbackResult){

    var keyForUpdateOrDelete = {"_id": ObjectId(id)};

    executeCommands(commandType.DELETEONEBYID, null, collectionName, callbackResult, keyForUpdateOrDelete);
}

/**
 * delete one documento by filter
 * 
 * example:
 * 
 * 
 * connection.deleteOne({name: "Joao"},"people", function(error, result){
 * 
 *     console.log(result);
 * });
 * 
 */
module.exports.deleteOne = function(keyForUpdateOrDelete, collectionName, callbackResult){


    executeCommands(commandType.DELETEONE, null, collectionName, callbackResult, keyForUpdateOrDelete);
}

/**
 * delete many documents
 * 
 * example:
 * 
 * var keysUpdate = { "age": 10};
 * 
 * connection.deleteMany(keysUpdate,"people", function(error, result){
 *    
 *    console.log(result);
 * })
 * 
 */
module.exports.deleteMany = function(keyForUpdateOrDelete, collectionName, callbackResult){


    executeCommands(commandType.DELETEMANY, null, collectionName, callbackResult, keyForUpdateOrDelete);
}


function executeCommands(commandTypeEnum, documentValue, collectionName, callbackResult, keyForUpdateOrDelete){

    //connnection mongodb
    MongoClient.connect(url,  { useNewUrlParser: true },function(error, client) {

        try {
         
            
            //set database
            var db = client.db(dbName);

        } catch (error) {

            callbackResult(error, null);
        }

        //set collection
        var collection = db.collection(collectionName);


        //execute commands in collection
        if(commandTypeEnum === commandType.INSERT){
           
            collection.insertOne(documentValue, function(error, result){
            
                callbackResult(error, result);

            });

        }
        else if(commandTypeEnum === commandType.INSERTMANY){
  
            collection.insertMany(documentValue, function(error, result){
                
                callbackResult(error, result);


            });

        }
        else if(commandTypeEnum === commandType.FIND || commandTypeEnum === commandType.FINDALL){
            
            collection.find(documentValue).toArray(function(error, result) {
            
                callbackResult(error, result);

            });
  
        }
        else if(commandTypeEnum === commandType.UPDATEONE || commandTypeEnum === commandType.UPDATEONEBYID){

            
            collection.updateOne(keyForUpdateOrDelete, { $set: documentValue }, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }
        else if(commandTypeEnum === commandType.UPDATEMANY){

            
            collection.updateMany(keyForUpdateOrDelete, { $set: documentValue }, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }
        else if(commandTypeEnum === commandType.DELETEONE || commandTypeEnum === commandType.DELETEONEBYID){
          
         
            collection.deleteOne(keyForUpdateOrDelete, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }
        else if(commandTypeEnum === commandType.DELETEMANY){
        
            collection.deleteMany(keyForUpdateOrDelete, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }

       
        client.close();

    });
}
```

### In the file PeopleRepository.js represents the persistence for people collection.

```javascript

var connection = require("../../config/connection");

/**
 * 
 * @author Cícero Ednilson
 * 
 * @class PeopleRepository
 * 
 * @description  this class responsible for persisting people
 *
 *  
 */
function PeopleRepository(){

    this._collectionName = "people";
};

PeopleRepository.prototype.save = function(people,callback){

    connection.insert(people, this._collectionName,callback);

}

PeopleRepository.prototype.findAll = function(callback){

    connection.findAll(this._collectionName, callback);

}

PeopleRepository.prototype.findById = function(id,callback){

    connection.findById(id, this._collectionName, callback);

}

PeopleRepository.prototype.updateOneById = function(people, id, callback){

    connection.updateOneById(people, id, this._collectionName, callback);

}

PeopleRepository.prototype.deleteOneById = function(id, callback){

    connection.deleteOneById(id, this._collectionName, callback);

}


//export class PeopleRepository
module.exports = function(){

    return PeopleRepository;
}


```

### In the file PeopleController.js  we have  the exposure of the methods of Api.

```javascript
/**
 * 
 * @author Cícero Ednilson
 * 
 * @description api people for POST, PUT, DELETE and GET
 * 
 */
module.exports = function(app){

    //CREATE NEW OBJECT FOR PeopleRepository
    var peopleRepository = new app.app.repositorys.PeopleRepository();

    //DELETE PEOPLE BY ID
    app.delete("/people/:id",function(req,res){

        var key = req.params.id;

        peopleRepository.deleteOneById(key, function(error, result){
            
            var resultClient = new Object();
            
            if(error != null){
             
                resultClient.code = 0;
                resultClient.message = "Error while deleting the record!";
                resultClient.details = error;
                
            }
            else{

                resultClient.code = 1;
                resultClient.message = "Record successfully deleted!";
            
            }

            res.send(resultClient);

        });

    });

    //RETURN PEOPLE BY ID
    app.get("/people/:id",function(req,res){

        var key = req.params.id;

        peopleRepository.findById(key, function(error, result){

            res.send(result[0]);

        });

    });

    //RETURN ALL PEOPLE
    app.get(["/","/people"],function(req,res){

        peopleRepository.findAll(function(error, result){
            
            res.send(result);

        });

    });

    //SAVE NEW PEOPLE
    app.post("/people",function(req,res){

        var people = req.body;

        peopleRepository.save(people,function(error, result){
            
            var resultClient = new Object();
            
            if(error != null){
             
                resultClient.code = 0;
                resultClient.message = "Error while save one new record!";
                resultClient.details = error;
                
            }
            else{

                resultClient.code = 1;
                resultClient.message = "Record saved successfully!";
            
            }

            res.send(resultClient);
            
        });

    });


    //ALTER PEOPLE BY ID
    app.put("/people",function(req,res){

        var people = req.body;
        var key    = req.body._id;

        
        delete req.body._id;


        peopleRepository.updateOneById(people, key, function(error, result){
            
            var resultClient = new Object();
            
            if(error != null){
             
                resultClient.code = 0;
                resultClient.message = "Error while updating the record!";
                resultClient.details = error;
                
            }
            else{

                resultClient.code = 1;
                resultClient.message = "Record updated successfully!";
            
            }

            res.send(resultClient);
            
        });

    });
}
```


### In the file app.js we createding  and starting our server.

```javascript

/**
 * 
 * @author Cícero Ednilson
 * 
 * @description start server
 */
var app = require("./config/config");

//port for server
var port = 3000;


//starting server
app.listen(port, function(){
    
    console.log("Starting server in port  " + port);

});


```

### Testing API.

For to test API lets go starting server with command "node app.js" or "nodemon app.js".


#### Insert new people.

- [POST]
- http://localhost:3000/people
- Request
 
```javascript


{	
	"name" : "Luciana 2111222 32",
	"document" : "359.098.087-57",
	"birthDate" : "1988-09-09",
	"recordActive" : true,
	"gender" : "M",
	"salary" : 1000,
	"address" : {
		"zipCode" : "06210050",
		"number" : 1,
		"street" : "Centro",
		"neighborhood" : "Vila Santos"
	}
}  



  
```
- Response
  
 ```javascript
{
   "code": 1,
   "message": "Record saved successfully!"
}
 ```


 #### Search all people.
 
 - [GET]
 - http://localhost:3000/people
 - Response

```javascript
[
      {
      "_id": "5c4bbc70cf40a31973d7995b",
      "name": "Cícero Ednilson 32",
      "document": "359.098.087-57",
      "birthDate": "1988-09-09",
      "recordActive": true,
      "gender": "M",
      "salary": 1000,
      "address":       {
         "zipCode": "06210050",
         "number": 1,
         "street": "Centro",
         "neighborhood": "Vila Santos"
      }
   },
      {
      "_id": "5c4bbcb5cf40a31973d7995c",
      "name": "Cícero 2222 32",
      "document": "359.098.087-57",
      "birthDate": "1988-09-09",
      "recordActive": true,
      "gender": "M",
      "salary": 1000,
      "address":       {
         "zipCode": "06210050",
         "number": 1,
         "street": "Centro",
         "neighborhood": "Vila Santos"
      }
   },
      {
      "_id": "5c4bbcb9cf40a31973d7995d",
      "name": "Cícero 2111222 32",
      "document": "359.098.087-57",
      "birthDate": "1988-09-09",
      "recordActive": true,
      "gender": "M",
      "salary": 1000,
      "address":       {
         "zipCode": "06210050",
         "number": 1,
         "street": "Centro",
         "neighborhood": "Vila Santos"
      }
   },
      {
      "_id": "5c4bbcc0cf40a31973d7995e",
      "name": "Maria 2111222 32",
      "document": "359.098.087-57",
      "birthDate": "1988-09-09",
      "recordActive": true,
      "gender": "M",
      "salary": 1000,
      "address":       {
         "zipCode": "06210050",
         "number": 1,
         "street": "Centro",
         "neighborhood": "Vila Santos"
      }
   },
      {
      "_id": "5c4bbcc8cf40a31973d7995f",
      "name": "Joao 2111222 32",
      "document": "359.098.087-57",
      "birthDate": "1988-09-09",
      "recordActive": true,
      "gender": "M",
      "salary": 1000,
      "address":       {
         "zipCode": "06210050",
         "number": 1,
         "street": "Centro",
         "neighborhood": "Vila Santos"
      }
   },
      {
      "_id": "5c4bbcd6cf40a31973d79960",
      "name": "Luciana 2111222 32",
      "document": "359.098.087-57",
      "birthDate": "1988-09-09",
      "recordActive": true,
      "gender": "M",
      "salary": 1000,
      "address":       {
         "zipCode": "06210050",
         "number": 1,
         "street": "Centro",
         "neighborhood": "Vila Santos"
      }
   }
]

```

 #### Search people by id.
 
 - [GET]
 - http://localhost:3000/people/5c4bbcc0cf40a31973d7995e
 - Response

```javascript
{
   "_id": "5c4bbcc0cf40a31973d7995e",
   "name": "Maria Brazil",
   "document": "359.098.087-57",
   "birthDate": "1988-09-09",
   "recordActive": true,
   "gender": "M",
   "salary": 1000,
   "address":    {
      "zipCode": "06210050",
      "number": 1,
      "street": "Centro",
      "neighborhood": "Vila Santos"
   }
}
```

 #### Update people by id.
 
 - [PUT]
 - http://localhost:3000/people
 - Request
 - 
```javascript
{
   "_id": "5c4bbcc0cf40a31973d7995e",
   "name": "Maria Brazil",
   "document": "359.098.087-57",
   "birthDate": "1988-09-09",
   "recordActive": true,
   "gender": "M",
   "salary": 1000,
   "address":    {
      "zipCode": "06210050",
      "number": 1,
      "street": "Centro",
      "neighborhood": "Vila Santos"
   }
}
```

 - Response
```javascript
{
   "code": 1,
   "message": "Record updated successfully!"
}
```

 - [DELETE]
 - http://localhost:3000/people/5c4bbcc0cf40a31973d7995e
 - Response

```javascript
{
   "code": 1,
   "message": "Record successfully deleted!"
}
```

### Viewing the records by NoSQL Booster for MongoDB.

2,png