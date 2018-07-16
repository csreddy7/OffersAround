
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
		document.querySelector(".offersAround").classList.add("hideDiv");
		document.querySelector("#showOffer").classList.add("showDiv");

		document.querySelector(".offer-content").innerHTML=this.offer.details;

	}

	editOfferInfo(){

	}

	deleteOffer(){

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