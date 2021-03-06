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
		return this.post("/register",data);
	},

	getOffers(){
		return this.get("/getOffers?location="+localStorage.getItem("location"));
	},

	addOffer(offerName,offerContent){
			var data={
	        	"offerName":offerName,
	        	"locationName":localStorage.getItem("location"),
				"offerContent":offerContent,
				"createdBy":localStorage.getItem("userId")
	        }
	    return this.post("/addOffer",data);
	},
	editOffer(offerId,offerName,offerContent){
		var data={
			"offerId":offerId,
			"offerName":offerName,
			"locationName":localStorage.getItem("location"),
			"offerContent":offerContent
		}
		return this.put("/editOffer",data);
	},
	deleteOffer(offer){
		return this.delete("/deleteOffer",offer);
	},
	makeFavourite(offer){
		return this.post("/makeFavourite",offer);
	},
	createComment(offer,comment){
	        var data={
	        	"offerId":offer._id,
				"comment":comment,
				"createdBy":localStorage.getItem("userId")
	        }
	    return this.post("/addComment",data);
	},
	saveComment(id,comment){
		var data={
			"id":id,
			"comment":comment,
		}
		return this.put("/saveComment",data);
	},
	deleteComment(comment){
		return this.delete("/deleteComment",comment);
	},
	post(url,data){
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("POST", url, true);
	        request.onload = () => {
	        	if(request.status===200){
	        		resolve(request.responseText);
	        	}else{
	        		reject(request.responseText);
	        	}
	        }
	        request.onerror= () =>{
	        	console.log("error while login")
	        }
	        request.setRequestHeader("Content-Type","application/json");
	        request.send(JSON.stringify(data));
		});
		return promise;
	},
	get(url){
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("GET", url, true);
	        request.onload = () => {
	        	if(request.status===200){
	        		resolve(request.responseText);
	        	}else{
	        		reject(request.responseText);
	        	}
	        }
	        request.onerror= (err) =>{
	        	console.log(err);
	        }
	        request.send();
		});
		return promise;
	},
	delete(url,data){
		console.log(data);
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("DELETE", url, true);
	        request.onload = () => {
	        	if(request.status===200){
	        		resolve(request.responseText);
	        	}else{
	        		reject(request.responseText);
	        	}
	        }
	        request.onerror= () =>{
	        	console.log("error while login")
	        }
	        request.setRequestHeader("Content-Type","application/json");
	        request.send(JSON.stringify(data));
		});
		return promise;
	},
	put(url,data){
		console.log(data);
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("PUT", url, true);
	        request.onload = () => {
	        	if(request.status===200){
	        		resolve(request.responseText);
	        	}else{
	        		reject(request.responseText);
	        	}
	        }
	        request.onerror= () =>{
	        	console.log("error while login")
	        }
	        request.setRequestHeader("Content-Type","application/json");
	        request.send(JSON.stringify(data));
		});
		return promise;
	}
}

export {obj}