var obj={
	getTemplate(templateUrl){
		let request = new XMLHttpRequest();
        request.open("GET", templateUrl, true);
        request.send();
        return request;
	},
	loginUser(mobileNumber,passWord){
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("POST", "/login", true);
	        request.onload = () => {
	        	resolve(request.responseText);
	        }
	        request.reject= () =>{
	        	console.log("error while login")
	        }
	        var data={
	        	"mobileNumber":mobileNumber,
	        	"passWord":passWord
	        }
	        request.setRequestHeader("Content-Type","application/json");
	        request.send(JSON.stringify(data));
		});
		return promise;
	},
	registerUser(userName,mobileNumber,passWord){
		let promise = new Promise((resolve,reject)=>{
			let request = new XMLHttpRequest();
	        request.open("POST", "/register", true);
	        request.onload = () => {
	        	resolve(request.responseText);
	        }
	        request.reject= () =>{
	        	console.log("error while login")
	        }
	        var data={
	        	"mobileNumber":mobileNumber,
	        	"passWord":passWord,
	        	"userName":userName
	        }
	        request.setRequestHeader("Content-Type","application/json");
	        request.send(JSON.stringify(data));
		});
		return promise;
	}
}

export {obj}