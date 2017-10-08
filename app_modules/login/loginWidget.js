import {obj as ajax } from 'utilities/xhr/ajax';

class login{
	constructor(){
		this.dom=null;
	}
	renderPage(){
			let promise = new Promise((resolve,reject)=>{
				let request = ajax.getTemplate("app_modules/login/login.html");
				request.onload = () => {
					this.dom = document.createElement("div");
		      		this.dom.innerHTML = request.responseText;
		      		resolve();
				};
		        request.onerror = () => {
		        	console.log(request.statusText);
		        	reject();
		        };
		});
        return promise;
	}
	initializeHandlers(){
		var button=document.querySelectorAll("#loginButton")[0];
		button.addEventListener("click",()=>{
			this.login();
		});
	}
	login(){
		let mobileNumber=document.querySelectorAll("#mobileNumber")[0].value;
		let passWord=document.querySelectorAll("#passWord")[0].value;
		ajax.loginUser(mobileNumber,passWord).then((res)=>{
				res=JSON.parse(res);
			    if(res.validUser){
			    	let registerIcon = document.querySelectorAll("#register")[0],
				    loginIcon = document.querySelectorAll("#login")[0],
				    logoutIcon = document.querySelectorAll("#logout")[0],
				    addOfferIcon = document.querySelectorAll("#addoffer")[0];
			    	registerIcon.style.display="none";
				    loginIcon.style.display="none";
				    logoutIcon.style.display="block";
				    addOfferIcon.style.display="block";
				    let event = new Event("close-dialog");
				    document.dispatchEvent(event);
			    }else{
			    	alert("invalid user");
			    }  
		})
	}
}

export { login }