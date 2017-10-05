var express=require("express");
var path=require("path");
var app=express();
var fs=require("fs");

app.get("/getOffers",function(req,res){
	fs.readFile("resources/data/offers.json","UTF-8",(err,data)=>{
		if(err){
			console.log(err);
		}
		res.send(data);
	});
});

app.use(express.static(__dirname+'/'));



app.listen(7697);
console.log("server listening at 7697");