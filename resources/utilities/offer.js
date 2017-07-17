var offerNumber=0;
import dialog from "utilities/dialog";
export default function CreateOffer(offerName,locationName,offerDetails,comments){
	this.offerName=offerName;
	this.offerLocation=locationName;
	this.offerDetails=offerDetails || "No offer details";
	this.comments= comments || [];
	this.id="offer-item-"+(++offerNumber);
	this.init=function(){
		var template='<div class="offer">'+
		'<div class="offerLeftPart">'+
		'<div class="offer-name"><i class="fa fa-tags" aria-hidden="true"></i> <span>'+this.offerName+'</span></div>'+
		'<div class="offer-location"><i class="fa fa-map-marker" aria-hidden="true"></i> <span>'+this.offerLocation+'</span></div>'+
		'</div>'+
		'<div class="offerRightPart">'+
		'<div class="offerRightTop"><span>Expires in :</span><span class="expire-time">2 hr 59 mins</span><span ><i class="fa fa-window-close close-offer" aria-hidden="true"></i></span></div>'+
		'<div class="offerRightBottom"><span class="offerlink view-details-link">view details</span><span class="offerlink add-comment-link">add comment</span><span class="offerlink view-comments-link">view comments</span></div>'+
		'</div>'+
		'<div>'+
		'<div class="add-comment">'+
		'<input type="text" class="comment-box" tabindex="4" id="comment-box" value="" placeholder="type comment" /><span><i tabindex="5" class="fa fa-plus add-comment-button" aria-hidden="true"></i></span>'+
		'</div>'+
		'<div class="comment-list" id="comment-list">'+
		'<div><i class="fa fa-window-close close-comments" aria-hidden="true"></i></div>'+
		'<div id="comment-content"></div>'
		'</div>'+
		'</div>'+
		'</div>';
		var offer=document.createElement("div");
		offer.innerHTML=template;
		offer.id=this.id;
		document.getElementById("offer-list").appendChild(offer);
		this.initializeEventHanders(offer);
		this.addComments();
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
