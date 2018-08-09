
import {obj as ajax } from 'utilities/xhr/ajax';
import { commonService } from "utilities/common/commonService";
import "Offer/offer.css";


class CreateOffer {
	constructor(offer) {
		this.offer=offer;
		this.id = offer._id;
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
			event.stopPropagation();
			let target = event.target;
			if (target.className.indexOf("view-icon") != -1) {
				this.showOfferInfo();
			} else if (target.className.indexOf("edit-icon") != -1) {
				this.showEditDialog();
			} else if (target.className.indexOf("delete-icon") != -1) {
				this.deleteOffer();
			} 
		});

		
	}

	showOfferInfo() {
		document.querySelector("#showOffer .offer-content-textarea").innerHTML=this.offer.details;
		document.querySelector("#showOffer .offer-title-input").innerHTML=this.offer.title;
		const showOfferDialog=document.querySelector("#showOffer");
		this.showDialog(showOfferDialog);
	}

	showEditDialog(){
		localStorage.setItem("selectedOfferId",this.offer._id);
		document.querySelector("#editOffer .offer-content-textarea").value=this.offer.details;
		document.querySelector("#editOffer .offer-title-input").value=this.offer.title;
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
			ajax.deleteOffer(this.offer).then((response)=>{
				console.log("offer deleted successfully");
				document.location.reload();
			},(err)=>{		
				console.error("error while deleting offer");
			});
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


export { CreateOffer }