import { Dialog } from "utilities/Dialog/dialog";
class CreateOffer {
	constructor(offerName, offerDetails, offerLocation) {
		this.offerDetails = offerDetails || "No offer details";
		this.offerLocation = offerLocation || "location unknown";
		this.offerName = offerName;
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
		request.open("GET", "resources/utilities/Offer/offer.html", true);
		request.send();

		let render = () => {
			const template = `${response}`;
			offer.innerHTML = template;
			offer.id = this.id;
			offer.className = "offer clear-fix";
			document.getElementById("offersList").appendChild(offer);
			offer.querySelectorAll(".offerName")[0].innerHTML=this.offerName;
			offer.querySelectorAll(".offerContent")[0].innerHTML=this.offerDetails;
			this.initializeEventHanders(offer);
		}
	}
	initializeEventHanders(offer) {
		/*offer.addEventListener("mouseenter",function(event){
			offer.querySelector(".sideBar").style.display="block";
			console.log("mouseenter")
		});
		offer.addEventListener("mouseleave",function(event){
			console.log("mousout")
			offer.querySelector(".sideBar").style.display="none";
		});*/
		offer.addEventListener("click", event => {
			let target = event.target;
			if (target.className.indexOf("view-details-link") != -1) {
				this.showOfferDetails();
			} else if (target.className.indexOf("add-comment-link") != -1) {
				this.showAddCommentBox();
			} else if (target.className.indexOf("view-comments-link") != -1) {
				this.showCommentsBox();
			} else if (target.className.indexOf("add-comment-button") != -1) {
				this.createComment();
			} else if (target.className.indexOf("close-comments") != -1) {
				document.querySelectorAll("#" + this.id + " .comment-list")[0].style.display = "none";
			}
		});
	}

	showOfferDetails() {
		this.dialog = new Dialog({ title: "Offer Details", name: this.offerName, locationName: this.offerLocation, details: this.offerDetails, templateUrl: "app_modules/main/offer-details.html" });
	}
	showAddCommentBox() {
		let target = document.querySelector("#" + this.id + " .add-comment");
		target.style.display = "block";
	}
	showCommentsBox() {
		let target = document.querySelector("#" + this.id + " .comment-list");
		target.style.display = "block";
	}
	createComment() {
		let value = document.getElementById("comment-box").value, obj = {};
		obj.username = "chandu";
		obj.comment = value;
		let comment = this.getComment(obj);
		document.getElementById("comment-content").appendChild(comment);
		document.getElementById("comment-box").value = "";
		document.querySelector("#" + this.id + " .add-comment").style.display = "none";
	}
	getComment(obj) {
		let template = "<span class='username'>" + obj.username + ":</span><span>" + obj.comment + "</span>";
		let comment = document.createElement("div");
		comment.className = "offer-comment";
		comment.innerHTML = template;
		return comment;
	}
}
CreateOffer.offerNumber = 0;

export { CreateOffer }