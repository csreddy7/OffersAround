import {obj as ajax } from 'utilities/xhr/ajax';

class OfferDetails{
	constructor(offer){
		this.dom=null;
		this.offer=offer;
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
	initializeEventHanders(){
		var deleteNode=this.dom.querySelector("#offer_delete");
		deleteNode.addEventListener("click",()=>{
			var canDelete=confirm("do you want to delete the offer?");
			if(canDelete){
				ajax.deleteOffer(this.offer);
			}
		});
	}
	populateOfferDetails(){
		document.querySelectorAll("#offerName")[0].innerHTML=this.offer.title;
		document.querySelectorAll("#offerLocation")[0].innerHTML=this.offer.location;
		document.querySelectorAll(".offer-content")[0].innerHTML=this.offer.details;
	}
	
}

export { OfferDetails }