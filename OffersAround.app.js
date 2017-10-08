var express=require("express");
var path=require("path");
var app=express();
var fs=require("fs");
var bodyParser=require("body-parser");

app.use(express.static(__dirname+'/'));


app.get("/getOffers",function(req,res){
	fs.readFile("resources/data/offers.json","UTF-8",(err,data)=>{
		if(err){
			console.log(err);
		}
		res.send(data);
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: false
})); 

app.post("/login",function(req,res){
	fs.readFile("resources/data/users.json","UTF-8",(err,response)=>{
		if(err){
			console.log(err);
		}
		var mobileNumber=req.body.mobileNumber;
		var passWord=req.body.passWord;
		var arr=JSON.parse(response).data;
		if(arr){
			arr.forEach(function(e){
				if(e.mobileNumber==mobileNumber && e.passWord==passWord){
					var obj={validUser:true};
					res.json(obj);
				}else{
					var obj={validUser:false};
					res.json(obj);
				}
			});
		}
	});
});

app.post("/register",function(req,res){
	fs.readFile("resources/data/users.json","UTF-8",(err,response)=>{
		if(err){
			console.log(err);
		}
		response=JSON.parse(response);
		var arr=response.data;
		var obj={};
		obj.mobileNumber=req.body.mobileNumber;
		obj.passWord=req.body.passWord;
		obj.userName=req.body.userName;
		arr.push(obj);
		response=JSON.stringify(response);
		fs.writeFile("resources/data/users.json",response,"UTF-8",(err)=>{
			if(err){
				console.log(err);
				res.send("failure");
			}else{
				console.log("user registered successfully");
				res.send("success");
			}
		})
	});
});



app.listen(7575);
console.log("server listening at 7575");