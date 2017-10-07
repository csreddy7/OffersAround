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

	        request.send(JSON.stringify(data));
		});
		return promise;
		console.log(userName,passWord);
	},
	registerUser(userName,mobileNumber,passWord){
		console.log(userName,mobileNumber,passWord);
	}
}

export {obj}