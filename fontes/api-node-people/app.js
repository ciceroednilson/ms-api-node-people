
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

