var obj={
	getTemplate(templateUrl){
		let request = new XMLHttpRequest();
        request.open("GET", templateUrl, true);
        request.send();
        return request;
	},
	loginUser(userName,passWord){
		console.log(userName,passWord);
	},
	registerUser(userName,mobileNumber,passWord){
		console.log(userName,mobileNumber,passWord);
	}
}

export {obj}