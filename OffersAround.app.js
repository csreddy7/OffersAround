var express=require("express");
var path=require("path");
var app=express();
var fs=require("fs");

app.use(express.static(__dirname+'/'));
app.get("/getOffers",function(req,res){
	fs.readFile("resources/data/offers.json","UTF-8",(err,data)=>{
		if(err){
			console.log(err);
		}
		res.send(data);
	});
});


app.listen(7575);
console.log("server listening at 7575");