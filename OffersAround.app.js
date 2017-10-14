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


app.use(express.static(__dirname+'/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: false
})); 
app.use(cookieParser());


app.post("/login",function(req,res){
	var response=getUsers();
	var mobileNumber=req.body.mobileNumber;
		var passWord=req.body.passWord;
		var arr=response.data;
		var validUser=false;
		if(arr){
			arr.forEach(function(e){
				if(e.mobileNumber==mobileNumber && e.passWord==secureService.encryptPassword(passWord)){
					validUser=true;
				}
			});
			var obj={"validUser":validUser};
			if(obj.validUser){
				obj.token=secureService.getSecureToken();
			}
			res.json(obj);
		}
});


app.post("/register",function(req,res){
	var response=getUsers(),
		obj={},
		arr=response.data;
		obj.mobileNumber=req.body.mobileNumber;
		obj.passWord=secureService.encryptPassword(req.body.passWord);
		obj.userName=req.body.userName;
		arr.push(obj);
		response=JSON.stringify(response);
		fs.writeFile("resources/data/users.json",response,"UTF-8",(err)=>{
			if(err){
				console.log(err);
				res.send("failure");
				usersLastUpdatedTime=getCurrentTime();
			}else{
				console.log("user registered successfully");
				res.send("success");
			}
		})
});

app.use(function(req,res,next){
	cookies=req.cookies;
	if(cookies.token){
		next();
	}
});


app.get("/getOffers",function(req,res){
	var validUser=secureService.validateToken(cookies.token);
	if(validUser){
			res.json(getOffers());
		}else{
			res.status(401).send({error:"Not authorised user"});
		}
});

app.get("/userName",function(req,res){
	var obj={};
	obj.userName=getUserName(req.cookies.phoneNo);
	res.json(obj);
});

app.post("/addOffer",function(req,res){
	var obj={};
		obj.title=req.body.offerName;
		obj.details=req.body.offerContent;
		obj.location=req.body.locationName;
		obj.createdBy=req.cookies.phoneNo;
		obj.createdTime= new Date().getTime();
		obj.updatedTime="";
		obj.comments=[];
		obj.comment_max_id=0;
			
	if(offersCachedTime>offersLastUpdatedTime){
		obj.id=++dataCache.MAX_ID;
		dataCache.data.push(obj);
		addOffer(dataCache);
	}else{
			var response=getOffers();
			var arr=response.data;
			obj.id=++response.MAX_ID;
			arr.push(obj);
			addOffer(response);
	}
	
	function addOffer(data){
		putOffers(data,res);
	}
});

app.post("/addComment",function(req,res){

	if(offersCachedTime>offersLastUpdatedTime){
		addComment(dataCache);
	}else{
		var response=getOffers();
		addComment(response);
	}
	
	function addComment(offers){
		var offerId=req.body.offerId;
		offers.data.forEach(function(e){
			if(e.id==offerId){
				var obj={};
				obj.comment=req.body.comment;
				obj.id=++e.comment_max_id;
				obj.createdBy=req.cookies.phoneNo;
				obj.userName=getUserName(req.cookies.phoneNo);
				obj.createdTime= new Date().getTime();
				obj.updatedTime="";
				e.comments.push(obj);
			}
		});
		putOffers(offers,res);
	}
});

var getOffers=function(){
	var response=fs.readFileSync("resources/data/offers.json","UTF-8");
	dataCache = response = JSON.parse(response);
	offersCachedTime = new Date().getTime(); 
	return response;
}

var putOffers=function(offers,res){
	fs.writeFile("resources/data/offers.json",JSON.stringify(offers),"UTF-8",(err)=>{
			if(err){
				console.log(err);
				res.send("failure");
			}else{
				console.log("offers added successfully");
				offersLastUpdatedTime= new Date().getTime();
				res.send("success");
			}
		});
}

var getUserName=function(phoneNo){
	var users=[],
		userName="";
	if(usersCachedTime>usersLastUpdatedTime){
		users=userCache.data;
	}else{
		users=getUsers().data;
	}
	users.every(function(e){
		if(e.mobileNumber==phoneNo){
			userName=e.userName;
			return false;
		}else{
			return true;
		}
	});
	return userName;
}

var getUsers=function(){
	var response=fs.readFileSync("resources/data/users.json","UTF-8");
	userCache= response=JSON.parse(response);
	usersCachedTime = getCurrentTime();
	return response;
}

var getCurrentTime=function(){
	return new Date().getTime();
}

app.listen(7575);
console.log("server listening at 7575");