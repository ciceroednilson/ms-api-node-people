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