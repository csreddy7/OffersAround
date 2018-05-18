import {obj as ajax } from 'utilities/xhr/ajax';
import { commonService } from "utilities/common/commonService";
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
		if(!commonService.validatePhoneNumber(mobileNumber)){
			return;
		}
		let passWord=document.querySelectorAll("#passWord")[0].value;
		if(!commonService.validatePassword(passWord)){
			return;
		}
		ajax.loginUser(mobileNumber,passWord).then((res)=>{
				res=JSON.parse(res);
			    if(res.validUser){
			    	document.cookie="token="+res.token;
			    	localStorage.setItem("userId",mobileNumber);
			    	// window.sessionVariable=setTimeout(()=>{
					// 	localStorage.removeItem("userId");
			    	// 	location.reload();
			    	// },60000);
				    let event = new Event("close-dialog");
				    document.dispatchEvent(event);
				    commonService.showValidUserActions();
			    	commonService.showOffers();
			    }else{
					commonService.showInValidUserActions();
			    	alert("invalid user");
			    }  
		},(err)=>{
			console.log(err);	
		})
	}
}

export { login }