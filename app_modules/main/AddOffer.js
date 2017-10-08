import {obj as ajax } from 'utilities/xhr/ajax';

class AddOffer{
	constructor(){
		this.dom=null;
	}
	renderPage(){
			let promise = new Promise((resolve,reject)=>{
				let request = ajax.getTemplate("app_modules/main/AddOffer.html");
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
		var button=document.querySelectorAll("#saveButton")[0];
		button.addEventListener("click",()=>{
			this.addOffer();
		});
	}
	addOffer(){
		let offerName=document.querySelectorAll("#offerName")[0].value;
		let locationName=document.querySelectorAll("#locationName")[0].value;
		let offerContent=document.querySelectorAll("#offerContent")[0].value;
		ajax.addOffer(offerName,locationName,offerContent).then((res)=>{
			    if(res=="success"){
			    	let event = new Event("close-dialog");
				    document.dispatchEvent(event);
			    }else{
			    	alert("error while adding offer");
			    }  
		});
	}
}

export { AddOffer }