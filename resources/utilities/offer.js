var offerNumber=0;
import dialog from "utilities/dialog";
export default function CreateOffer(offerName,offerDetails,offerLocation){
	offerDetails=offerDetails || "No offer details";
	offerLocation=offerLocation || "location unknown";
	this.id="offer-item-"+(++offerNumber);
	this.init=function(){
			  var template=`<div class="offer-header">
								<h1 class="offerName">${offerName}</h1>
							</div>
							<div class="offerContent">${offerDetails}</div>
							<div class="sideBar">
								<span class="view-details-link" title="Open in new window"></span>
								<span class="add-comment-link fa fa-plus" title="Add comment"></span>
								<span class="view-comments-link fa fa-eye" title="View comments"></span>
							</div>
							<div class="add-comment clear-fix">
								<input type="text" class="comment-box" tabindex="4" id="comment-box" value="" placeholder="type comment" />
								<i tabindex="5" class="fa fa-plus add-comment-button" aria-hidden="true"></i>
							</div>
							<div class="comment-list" >
								<div>
									<h1>Comments</h1>
									<i class="fa fa-window-close close-comments" aria-hidden="true"></i>
								</div>
								<div id="comment-content"></div>
							</div>`;
		var offer=document.createElement("div");
		offer.innerHTML=template;
		offer.id=this.id;
		offer.className="offer clear-fix";
		document.getElementById("offersList").appendChild(offer);
		this.initializeEventHanders(offer);
		//this.addComments();
	}
	this.showAddCommentBox=function(){
		var target=document.querySelector("#"+this.id+" .add-comment");
		target.style.display="block";
	}
	this.showCommentsBox=function(){
		var target=document.querySelector("#"+this.id+" .comment-list");
		target.style.display="block";
	}
	this.showOfferDetails=function(){
		this.dialog=new dialog({title:"Offer Details",name:offerName,locationName:offerLocation,details:offerDetails,templateUrl:"app_modules/main/offer-details.html"});
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
		// offer.addEventListener("mouseenter",function(event){
		// 	offer.querySelector(".sideBar").style.display="block";
		// 	console.log("mouseenter")
		// });
		// offer.addEventListener("mouseleave",function(event){
		// 	console.log("mousout")
		// 	offer.querySelector(".sideBar").style.display="none";
		// });
		offer.addEventListener("click",function(event){
			var target=event.target;
			if(target.className.indexOf("view-details-link")!=-1){
				_this.showOfferDetails();
			}else if(target.className.indexOf("add-comment-link")!=-1){
				_this.showAddCommentBox();
			}else if(target.className.indexOf("view-comments-link")!=-1){
				_this.showCommentsBox();
			}else if(target.className.indexOf("add-comment-button")!=-1){
				_this.createComment();
			}else if(target.className.indexOf("close-comments")!=-1){
				document.querySelectorAll("#"+this.id+" .comment-list")[0].style.display="none";
			}
		});
	}
}
