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

