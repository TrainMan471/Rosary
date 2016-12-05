console.log("It is working properly!");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const MongoClient = require('mongodb').MongoClient;
var db;

app.set('view engine','ejs');
app.set('views',__dirname + '/views');

MongoClient.connect('mongodb://localhost/MyNewDataBaseForSevenSorrows',function(error,database){

		if(error) 
		{
			console.log("Error: Failure connecting to MongoDB. Obviously, your hardware is full of salami.")
		}
	else
	{
		console.log("Successfully connected to MongoDb;Your hardware is no longer full of salami.")
	}
			
			db = database;
			
			app.listen(5050,function() {
			
			console.log("Listening on port 5050");
		});
	});
	
	
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));

app.get('/requests.ejs', function(req,res) {
  db.collection('requests').find().toArray(function(error,result){
    if(error) return console.log(error);
    //Have to use render here instead of sendFile because it's a template file
    res.render('requests.ejs',{requests: result});
  });
});

app.post('/requests', function(req,res){
  db.collection('requests').save(req.body,function(error,result){
    if(error){
      console.log('There was an error saving the information to the database');
    }else {
      console.log("Successfully saved to the database!");
    }
    res.redirect('/requests.ejs');
  });
});
			
			