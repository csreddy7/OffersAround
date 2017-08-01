var offerNumber=0;
import dialog from "utilities/dialog";
export default function CreateOffer(offerName,offerDetails){
	offerDetails=offerDetails || "No offer details";
	this.id="offer-item-"+(++offerNumber);
	this.init=function(){
		var template=`<div class="offer clear-fix">
						<div>
							<h1 class="offerName">${offerName}</h1><span class=" closeIcon fa fa-window-close"></span></div>
							<div class="offerContent">${offerDetails}</div>
							<div class="sideBar">
								 <span class="editIcon fa fa-pencil-square-o"></span>
								<span class="addIcon fa fa-plus"></span>
								<span class="previewIcon fa fa-eye"></span>
							</div>
					</div>`;
		var offer=document.createElement("div");
		offer.innerHTML=template;
		offer.id=this.id;
		document.getElementById("offersList").appendChild(offer);
		this.initializeEventHanders(offer);
		//this.addComments();
	}
	this.addComment=function(){
		var target=document.querySelector("#"+this.id+" .add-comment");
		target.style.display="block";
	}
	this.showComments=function(){
		var target=document.querySelector("#"+this.id+" .comment-list");
		target.style.display="block";
	}
	this.showDetails=function(){
		this.dialog=new dialog({title:"Offer Details",name:this.offerName,locationName:this.offerLocation,details:this.offerDetails,templateUrl:"offer-details.html"});
		this.dialog.init();
	}
	this.createComment=function(){
		var value=document.getElementById("comment-box").value,obj={};
		obj.username="chandu";
		obj.comment=value;
		var comment=this.getComment(obj);
		document.getElementById("comment-content").appendChild(comment);
		document.getElementById("comment-box").value="";
		document.querySelector("#"+this.id+" .add-comment").style.display="none";
	}
	this.addComments=function(){
		var _this=this;
		this.comments.forEach(function(e){
			var comment=_this.getComment(e);
			document.getElementById("comment-content").appendChild(comment);
		});
	}
	this.getComment=function(obj){
		var template="<span class='username'>"+obj.username+":</span><span>"+obj.comment+"</span>";
		var comment=document.createElement("div");
		comment.className="offer-comment";
		comment.innerHTML=template;
		return comment;
	}
	this.initializeEventHanders=function(offer){
		var _this=this;
		// offer.addEventListener("mouseover",function(event){
		// 	console.log("mousover")
		// 	var target=event.target;
		// 	if(target.className.indexOf("offerContent")!=-1){
		// 		offer.querySelector(".sideBar").style.display="block";
		// 	}
		// });
		// offer.addEventListener("mouseout",function(event){
		// 	console.log("mousout")
		// 	var target=event.target;
		// 	if(target.className.indexOf("offerContent")!=-1){
		// 		//offer.querySelector(".sideBar").style.display="none";
		// 	}
		// });
		offer.addEventListener("click",function(event){
			var target=event.target;
			if(target.className.indexOf("view-details-link")!=-1){
				_this.showDetails();
			}else if(target.className.indexOf("add-comment-link")!=-1){
				_this.addComment();
			}else if(target.className.indexOf("view-comments-link")!=-1){
				_this.showComments();
			}else if(target.className.indexOf("close-offer")!=-1){
				document.getElementById(_this.id).style.display="none";
			}else if(target.className.indexOf("add-comment-button")!=-1){
				_this.createComment();
			}else if(target.className.indexOf("close-comments")!=-1){
				document.getElementById("comment-list").style.display="none";
			}
		});
	}
}
