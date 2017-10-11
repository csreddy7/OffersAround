var express=require("express");
var path=require("path");
var app=express();
var fs=require("fs");
var bodyParser=require("body-parser");
var dataCache=null;
var lastUpdatedTime= new Date().getTime();
var cachedTime=null;

app.use(express.static(__dirname+'/'));


app.get("/getOffers",function(req,res){
	fs.readFile("resources/data/offers.json","UTF-8",(err,data)=>{
		if(err){
			console.log(err);
		}
		dataCache=JSON.parse(data);
		cachedTime= new Date().getTime(); 
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
		var validUser=false;
		if(arr){
			arr.forEach(function(e){
				if(e.mobileNumber==mobileNumber && e.passWord==passWord){
					validUser=true;
				}
			});
			var obj={"validUser":validUser};
			res.json(obj);
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

app.post("/addOffer",function(req,res){
	var obj={};
		obj.title=req.body.offerName;
		obj.details=req.body.offerContent;
		obj.location=req.body.locationName;
		obj.comments=[];
		obj.comment_max_id=0;
			
	if(cachedTime>lastUpdatedTime){
		obj.id=++dataCache.MAX_ID;
		dataCache.data.push(obj);
		addOffer(JSON.stringify(dataCache));
	}else{
			fs.readFile("resources/data/offers.json","UTF-8",(err,response)=>{
			if(err){
				console.log(err);
			}
			response=JSON.parse(response);
			cachedTime= new Date().getTime();
			var arr=response.data;
			obj.id=++response.MAX_ID;
			arr.push(obj);
			response=JSON.stringify(response);
			addOffer(response);
		});
	}
	
	function addOffer(data){
		fs.writeFile("resources/data/offers.json",data,"UTF-8",(err)=>{
			if(err){
				console.log(err);
				res.send("failure");
			}else{
				console.log("offer added successfully");
				lastUpdatedTime= new Date().getTime();
				res.send("success");
			}
		})
	}
});

app.post("/addComment",function(req,res){
	if(cachedTime>lastUpdatedTime){
		addComment(dataCache);
	}else{
			fs.readFile("resources/data/offers.json","UTF-8",(err,response)=>{
			if(err){
				console.log(err);
			}
			response=JSON.parse(response);
			cachedTime= new Date().getTime();
			addComment(response);
		});
	}
	
	function addComment(offers){
		var offerId=req.body.offerId;
		offers.data.forEach(function(e){
			if(e.id==offerId){
				var obj={};
				obj.comment=req.body.comment;
				obj.id=++e.comment_max_id;
				e.comments.push(obj);
			}
		});
		fs.writeFile("resources/data/offers.json",JSON.stringify(offers),"UTF-8",(err)=>{
			if(err){
				console.log(err);
				res.send("failure");
			}else{
				console.log("comment added successfully");
				lastUpdatedTime= new Date().getTime();
				res.send("success");
			}
		})
	}
});


app.listen(7575);
console.log("server listening at 7575");