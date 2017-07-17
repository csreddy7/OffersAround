var express=require("express");
var path=require("path");
var app=express();

app.use(express.static(__dirname+'/'));

app.get("*",function(req,res){
	res.sendFile(path.resolve("OffersAround.html"));
});

app.listen(7697);
console.log("server listening at 7697");