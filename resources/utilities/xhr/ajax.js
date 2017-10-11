var obj={
	getTemplate(templateUrl){
		let request = new XMLHttpRequest();
        request.open("GET", templateUrl, true);
        request.send();
        return request;
	},
	loginUser(mobileNumber,passWord){
		var data={
	        	"mobileNumber":mobileNumber,
	        	"passWord":passWord
	        }
		return this.post("/login",data);
	},
	registerUser(userName,mobileNumber,passWord){
		var data={
	        	"mobileNumber":mobileNumber,
	        	"passWord":passWord,
	        	"userName":userName
	        }
		return this.post("/addOffer",data);
	},

	addOffer(offerName,locationName,offerContent){
			var data={
	        	"offerName":offerName,
	        	"locationName":locationName,
	        	"offerContent":offerContent
	        }
	    return this.post("/addOffer",data);
	},
	createComment(offer,comment){
	        var data={
	        	"offerId":offer.id,
	        	"comment":comment,
	        }
	    return this.post("/addComment",data);
	},
	post(url,data){
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("POST", url, true);
	        request.onload = () => {
	        	resolve(request.responseText);
	        }
	        request.reject= () =>{
	        	console.log("error while login")
	        }
	        request.setRequestHeader("Content-Type","application/json");
	        request.send(JSON.stringify(data));
		});
		return promise;
	}
}

export {obj}