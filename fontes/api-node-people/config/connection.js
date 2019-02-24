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