import { CreateOffer } from "utilities/Offer/offer";
import {obj as ajax } from 'utilities/xhr/ajax';

let registerIcon = document.querySelectorAll("#register")[0],
	loginIcon = document.querySelectorAll("#login")[0],
	logoutIcon = document.querySelectorAll("#logout")[0],
	addOfferIcon = document.querySelectorAll("#addoffer")[0],
	offersList=document.querySelectorAll("#offersList")[0];

let commonService={
	offers:null,
	showOffers(){
		ajax.getOffers().then((response)=>{
				    	  let res=JSON.parse(response);
				          let arr = this.offers= res.data;
				          arr.forEach((offer)=>{
				            let obj = new CreateOffer(offer);
				          });
				          this.showValidUserActions();
				    },(err)=>{
				    	offersList.innerHTML="";
				    	this.offers=null;
				    	this.showInValidUserActions();
				    	console.error(JSON.parse(err));
				    });
	},
	filterOffers(query){
		if(this.offers){
			let arr=this.offers.filter((e)=>{
            	return (e.title.indexOf(searchValue)!=-1);
        	});
	        if(arr.length>0){
		          offersList.innerHTML="";
		          arr.forEach((offer)=>{
		          let obj = new CreateOffer(offer);
		        });
	        }
		}
	},
	showValidUserActions(){
		registerIcon.style.display="none";
		loginIcon.style.display="none";
		logoutIcon.style.display="block";
		addOfferIcon.style.display="block";
	},
	showInValidUserActions(){
		registerIcon.style.display="block";
		loginIcon.style.display="block";
		logoutIcon.style.display="none";
		addOfferIcon.style.display="none";		
	}
}
export {commonService}