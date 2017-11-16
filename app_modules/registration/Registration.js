import {obj as ajax } from 'utilities/xhr/ajax';
import 'registration/Registration.css'
class Registration{
	constructor(){
		this.dom=null;
	}
	renderPage(){
			let promise = new Promise((resolve,reject)=>{
				let request = ajax.getTemplate("app_modules/registration/Registration.html");
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
		var button=document.querySelectorAll("#registerButton")[0];
		button.addEventListener("click",()=>{
			this.register();
		});
	}
	register(){
		let userName=document.querySelectorAll("#userName")[0].value;
		let mobileNumber=document.querySelectorAll("#mobileNumber")[0].value;
		let passWord=document.querySelectorAll("#passWord")[0].value;
		ajax.registerUser(userName,mobileNumber,passWord).then((res)=>{
			console.log(res);
			if(res=="success"){
				let event = new Event("close-dialog");
				document.dispatchEvent(event);	
			}else{
				alert("registration failed");
			}
			
		});
	}
}

export { Registration }