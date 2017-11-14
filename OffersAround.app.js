var express=require("express");
var path=require("path");
var app=express();
var fs=require("fs");
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var dataCache=null;
var userCache=null;
var offersLastUpdatedTime = new Date().getTime();
var usersLastUpdatedTime = new Date().getTime();
var offersCachedTime=null;
var usersCachedTime=null;
var cookies=null;
var secureService =require("./resources/utilities/security/secureService");
var mongoClient=require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbUrl="mongodb://localhost:7272/OffersAround";


app.use(express.static(__dirname+'/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: false
})); 
app.use(cookieParser());

/*********************login api  **********************/


app.post("/login",function(req,res){
	mongoClient.connect(dbUrl,function(err,db){
		var mobileNO=req.body.mobileNumber;
		db.collection("users").findOne({mobileNumber:mobileNO},function(err,data){		
			var passWord=req.body.passWord;
			var obj={};
			if(data){
				if(data.passWord==secureService.encryptPassword(passWord)){
					obj.validUser=true;
				}else{
					obj.validUser=false;
				}	
				if(obj.validUser){
					obj.token=secureService.getSecureToken();
				}
				db.close();
				res.json(obj);
			}else{
				obj.validUser=false;
				db.close();
				res.json(obj);
			}
		});
	});
});



app.post("/register",function(req,res){
	var obj={};
		obj.mobileNumber=req.body.mobileNumber;
		obj.passWord=secureService.encryptPassword(req.body.passWord);
		obj.userName=req.body.userName;
		mongoClient.connect(dbUrl,function(err,db){
			db.collection("users").insertOne(obj);
			res.send("success");
		});
});




app.use(function(req,res,next){
	cookies=req.cookies;
	if(cookies.token){
		next();
	}
});


/********offers api  *********************/


app.get("/getOffers",function(req,res){
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").find({}).toArray(function(err,data){
			console.log("data--->",data);
			db.close();
			res.json(data);
		});
	});
});



app.post("/addOffer",function(req,res){
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	var obj={};
		obj.title=req.body.offerName;
		obj.details=req.body.offerContent;
		obj.location=req.body.locationName;
		obj.createdBy=req.cookies.phoneNo;
		obj.createdTime= new Date().getTime();
		obj.updatedTime="";
		obj.isFavourite=false;
		obj.comments=[];
		obj.comment_max_id=0;

	mongoClient.connect(dbUrl,function(err,db){
			db.collection("offers").insertOne(obj);
			db.close();
			res.send("success");
	});
});

app.post("/makeFavourite",function(req,res){
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	var offerId=req.body._id;
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").findOne({_id:ObjectId(offerId)},function(err,data){
			console.log(err);
			console.log(data);		
			if(data){
				data.isFavourite=true;
				db.collection("offers").updateOne({_id:ObjectId(offerId)},{$set:data});
				db.close();
				res.send("success");
			}else{
				db.close();
				res.send("failure");
			}
		});
	});
});


app.put("/editOffer",function(req,res){
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	var offerId=req.body.offerId;
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").findOne({_id:ObjectId(offerId)},function(err,data){
			console.log(err);
			console.log(data);		
			if(data){
				data.title=req.body.offerName;
				data.details=req.body.offerContent;
				data.location=req.body.locationName;
				db.collection("offers").updateOne({_id:ObjectId(offerId)},{$set:data});
				db.close();
				res.send("success");
			}else{
				db.close();
				res.send("failure");
			}
		});
	});
});

app.delete("/deleteOffer",function(req,res){
	console.log(req.body);
	var offerId=req.body._id;
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	console.log(offerId)
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").removeOne({_id:ObjectId(offerId)},function(err,data){
			console.log(err);
			console.log(data.result);		
			if(data){
				db.close();
				res.send("success");
			}else{
				db.close();
				res.send("failure");
			}
		});
	});
});

app.post("/addComment",function(req,res){
	var offerId=req.body.offerId;
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").findOne({_id:ObjectId(offerId)},function(err,data){
			console.log(err);
			console.log(data);		
			if(data){
				var obj={};
					obj.comment=req.body.comment;
					obj.id=++(data.comment_max_id);
					obj.createdBy=req.cookies.phoneNo;
					obj.createdTime= new Date().getTime();
					obj.updatedTime="";
					data.comments.push(obj);
				db.collection("offers").updateOne({_id:ObjectId(offerId)},{$set:data});
				db.close();
				res.json({commentId:offerId+"_"+obj.id});
			}else{
				db.close();
				res.send("failure");
			}
		});
	});
});

app.delete("/deleteComment",function(req,res){
	var commentId=req.body.id;
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	console.log(commentId);
	var offerId=commentId.split("_")[0],
		commentId=commentId.split("_")[1];
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").findOne({_id:ObjectId(offerId)},function(err,data){
			console.log(err);
			console.log(data);		
			if(data.comments.length>0){
				data.comments=data.comments.filter((element)=>{
					return element.id!=commentId;
				});
				db.collection("offers").updateOne({_id:ObjectId(offerId)},{$set:data});
				db.close();
				res.send("success");
			}else{
				db.close();
				res.send("failure");
			}
		});
	});
});

app.put("/saveComment",function(req,res){
	var commentId=req.body.id;
	var validUser=secureService.validateToken(cookies.token);
	if(!validUser){
		res.status(401).send({status:"401",error:"Not authorised user"});
		return;
	}
	console.log(commentId);
	var offerId=commentId.split("_")[0],
		commentId=commentId.split("_")[1];
	mongoClient.connect(dbUrl,function(err,db){
		db.collection("offers").findOne({_id:ObjectId(offerId)},function(err,data){
			console.log(err);
			console.log(data);
			var n=data.comments.length;		
			if(n>0){
				for(let i=0;i<n;i++){
					if(data.comments[i].id==commentId){
						data.comments[i].comment=req.body.comment;
						break;
					}
				}
				db.collection("offers").updateOne({_id:ObjectId(offerId)},{$set:data});
				db.close();
				res.send("success");
			}else{
				db.close();
				res.send("failure");
			}
		});
	});
});

var getCurrentTime=function(){
	return new Date().getTime();
}

app.listen(7575);
console.log("server listening at 7575");