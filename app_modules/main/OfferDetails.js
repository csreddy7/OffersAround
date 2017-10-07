import {obj as ajax } from 'utilities/xhr/ajax';

class OfferDetails{
	constructor(){
		this.dom=null;
	}
	renderPage(){
			let promise = new Promise((resolve,reject)=>{
				let request = ajax.getTemplate("app_modules/main/offer-details.html");
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
	populateOfferDetails(offer){
		document.querySelectorAll("#offerName")[0].innerHTML=offer.offerName;
		document.querySelectorAll("#offerLocation")[0].innerHTML=offer.offerLocation;
		document.querySelectorAll(".offer-content")[0].innerHTML=offer.offerDetails;
	}
	
}

export { OfferDetails }