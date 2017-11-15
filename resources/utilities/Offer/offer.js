import { Dialog } from "utilities/Dialog/dialog";
import {OfferDetails} from "main/OfferDetails";
import {obj as ajax } from 'utilities/xhr/ajax';
import { commonService } from "utilities/common/commonService";
class CreateOffer {
	constructor(offer) {
		this.offer=offer;
		this.offerDetails = this.offer.details || "No offer details";
		this.offerLocation = this.offer.location || "location unknown";
		this.offerName = this.offer.title;
		this.editCommentId=null;
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
			if(this.offer.isFavourite){
				offer.querySelector(".sideBar .favourite-link").classList.add("fa-fav-star");
			}
			const commentParent=document.querySelector("#" + this.id + " #comment-content");
			this.offer.comments.forEach((e)=>{
				let obj={};
				obj.username=e.createdBy;
				obj.comment=e.comment;
				let comment=this.getComment(obj);
				comment.id=this.offer._id+"_"+e.id;
				commentParent.appendChild(comment);
			});
			var userId=localStorage.getItem("userName");
			if(userId==="null"){
				commonService.showInValidUserActions();
				let addIcon=offer.querySelector(".sideBar .add-comment-link");
				addIcon.parentNode.removeChild(addIcon);
				let favIcon=offer.querySelector(".sideBar .favourite-link");
				favIcon.parentNode.removeChild(favIcon);
			}
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
			} else if (target.className.indexOf("favourite-link") != -1) {
				this.makeFavourite();
			} else if (target.className.indexOf("add-comment-button") != -1) {
				this.createComment();
			} else if (target.className.indexOf("edit-comment-button") != -1) {
				this.saveComment();
			} else if (target.className.indexOf("close-comments") != -1) {
				document.querySelectorAll("#" + this.id + " .comment-list")[0].style.display = "none";
			} else if (target.className.indexOf("fa-trash-o") != -1) {
				this.deleteComment(target);
			} else if (target.className.indexOf("close-dialog") != -1) {
				document.querySelector("#" + this.id + " .add-comment").style.display = "none";
			} else if (target.className.indexOf("fa-pencil-square-o") != -1) {
				this.editComment(target);
			} else if (target.className.indexOf("close-edit-dialog") != -1) {
				document.querySelector("#" + this.id + " .edit-comment").style.display = "none";
			}
		});
	}

	showOfferDetails() {
		let dialog = new Dialog({
	      title: "Offer Details"
	    });
	    let OfferDetailsWidget= new OfferDetails(this.offer);
	    OfferDetailsWidget.renderPage().then(()=>{
			dialog.init(OfferDetailsWidget.dom);
			OfferDetailsWidget.initializeEventHanders();
	    	OfferDetailsWidget.populateOfferDetails();
	    },()=>{
	    	console.log("error while creating login widget")
	    });
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
		obj.comment = value;
		obj.username=localStorage.getItem("userName");
		let comment = this.getComment(obj);
		ajax.createComment(this.offer,value).then((res)=>{
			let response=JSON.parse(res);
			comment.id=response.commentId;
			document.querySelector("#" + this.id + " #comment-content").appendChild(comment);
			document.getElementById("comment-box").value = "";
			document.querySelector("#" + this.id + " .add-comment").style.display = "none";
		},this.showError);
	}
	getComment(obj) {
		let template="";
		let userId=localStorage.getItem("userName");
		if(userId==obj.username){
			template = `
			<div class="edit-delete">
					<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
					<i class="fa fa-trash-o" aria-hidden="true"></i>
			</div>
			<span class='username'> ${obj.username} :</span><span id="comment_content">${obj.comment}</span>`;
		}else{
			template = `<span class='username'> ${obj.username} :</span><span id="comment_content">${obj.comment}</span>`;
		}
				
		let comment = document.createElement("div");
		comment.className = "offer-comment";
		comment.innerHTML = template;
		return comment;
	}

	deleteComment(comment){
		let canDelete=confirm("do you want to delete this comment?");
		if(canDelete){
			console.log("about to delete comment")
			let parent=comment.parentNode.parentNode;
			let obj={id:parent.id};
			ajax.deleteComment(obj).then((res)=>{
				if(res==="success"){
					location.reload();
				}else if(res==="failure"){
					console.log("erroe while deleting comment")
				}
			},this.showError);
		}
	}

	editComment(comment){
		console.log("about to edit comment")
		let parent=comment.parentNode.parentNode;
		document.querySelector("#" + this.id + " .edit-comment").style.display = "block";
		document.querySelector("#" + this.id + "  #edit_box").value=parent.querySelector("#comment_content").innerHTML;
		this.editCommentId=parent.id;
	}

	saveComment(){
		let comment=document.querySelector("#" + this.id + " #edit_box").value;
		ajax.saveComment(this.editCommentId,comment).then((res)=>{
			if(res==="success"){
				location.reload();
			}else if(res==="failure"){
				console.log("erroe while editing comment")
			}
		},this.showError);
	}

	makeFavourite(){
		this.offer.isFavourite=!this.offer.isFavourite;
		ajax.makeFavourite(this.offer).then((res)=>{
			// document.querySelector("#" + this.id + "  .sideBar  .favourite-link").classList.add("fa-fav-star");
			location.reload();
		},this.showError);
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