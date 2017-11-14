import {obj as ajax } from 'utilities/xhr/ajax';
import { EditOffer }  from "main/EditOffer";
import { Dialog } from "utilities/Dialog/dialog";
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
				ajax.deleteOffer(this.offer).then((res)=>{
								if(res=="success"){
									let event = new Event("close-dialog");
									document.dispatchEvent(event);
								}else{
								alert("error while deleting offer");
								}  
					},(error)=>{
						var err=JSON.parse(error);
						if(err.status && err.status==401){
							alert("session expired");
							commonService.clearScreen();
						}
					});
			}
		});
		var editNode=this.dom.querySelector("#offer_edit");
		editNode.addEventListener("click",()=>{
			let event = new Event("close-dialog");
			document.dispatchEvent(event);
			let dialog = new Dialog({
				title: "Edit Offer"
			  });
			let editOfferWidget= new EditOffer(this.offer);
			  editOfferWidget.renderPage().then(()=>{
				dialog.init(editOfferWidget.dom);
				editOfferWidget.initializeHandlers();
				editOfferWidget.popUpDetails();
			  },()=>{
				console.log("error while creating login widget")
			  });    
		});
	}
	
	populateOfferDetails(){
		document.querySelectorAll("#offerName")[0].innerHTML=this.offer.title;
		document.querySelectorAll("#offerLocation")[0].innerHTML=this.offer.location;
		document.querySelectorAll(".offer-content")[0].innerHTML=this.offer.details;
	}
	
}

export { OfferDetails }