
import {obj as ajax } from 'utilities/xhr/ajax';
import { commonService } from "utilities/common/commonService";
import "Offer/offer.css";


class CreateOffer {
	constructor(offer) {
		this.offer=offer;
		this.id = "offer-item-" + (++CreateOffer.offerNumber);
		this.init();
	}
	init() {

		const request = new XMLHttpRequest(),
			offer = document.createElement("div");
		let response = "";

		request.onreadystatechange = function () {
			if (this.readyState == 4) {
				response = this.responseText;
				render();
			}
		}
		request.open("GET", "/src/Offer/offer.html", true);
		request.send();

		let render = () => {
			const template = `${response}`;
			offer.innerHTML = template;
			offer.id = this.id;
			offer.className = "offer clear-fix";
			document.getElementById("offersList").appendChild(offer);
			offer.querySelector(".offerName").innerHTML=this.offer.title;
			this.initializeEventHanders(offer);
		}
	}

	
	initializeEventHanders(offer) {

		offer.addEventListener("click", event => {
			let target = event.target;
			if (target.className.indexOf("view-offer") != -1) {
				this.showOfferInfo();
			} else if (target.className.indexOf("edit-offer") != -1) {
				this.editOfferInfo();
			} else if (target.className.indexOf("delete-offer") != -1) {
				this.deleteOffer();
			} 
		});
	}

	showOfferInfo() {
		const showOfferDialog=document.querySelector("#showOffer");
		this.showDialog(showOfferDialog);
		document.querySelector(".offer-content .offer-content-textarea").innerHTML=this.offer.details;
	}

	editOfferInfo(){
		const editDialog=document.querySelector("#editOffer");
		this.showDialog(editDialog);
	}

	 showDialog(node){
		const offersAround=document.querySelector(".offersAround");

        offersAround.classList.remove("showDiv");
		node.classList.remove("hideDiv");
        offersAround.classList.add("hideDiv");
		node.classList.add("showDiv");
    }

     hideDialog(node){
		const offersAround=document.querySelector(".offersAround");
        offersAround.classList.remove("hideDiv");
		node.classList.remove("showDiv");
        offersAround.classList.add("showDiv");
        node.classList.add("hideDiv");       
    }

	deleteOffer(){
		let result=confirm("Are you sure to delete this offer?");
		if(result){
			console.log("yes")
		}
	}
	
	showError(error){
		let err=JSON.parse(error);
		if(err.status && err.status==401){
			alert("session expired");
			commonService.clearScreen();
		}
	}
}
CreateOffer.offerNumber = 0;

export { CreateOffer }