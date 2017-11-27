import { CreateOffer } from "utilities/Offer/offer";
import {obj as ajax } from 'utilities/xhr/ajax';

let registerIcon = document.querySelectorAll("#register")[0],
	loginIcon = document.querySelectorAll("#login")[0],
	logoutIcon = document.querySelectorAll("#logout")[0],
	addOfferIcon = document.querySelectorAll("#addoffer")[0],
	offersList=document.querySelectorAll("#offersList")[0],
	favIcon=document.querySelector("#favourite"),
	geomapUrl="https://maps.googleapis.com/maps/api/geocode/json";
let commonService={
	offers:null,
	getLocation(){
		let coords=null;
		let geoPromise=new Promise((resolve,reject)=>{
			navigator.geolocation.getCurrentPosition((obj)=>{
				coords=obj.coords;
				if(coords){
					geomapUrl+="?latlng="+coords.latitude+","+coords.longitude+"&key=AIzaSyDhJ8p3h0utLDPejbfHNAB0-lkFqrf1V60";
				}else{
					alert("please allow location access");
					return;
				}
				ajax.get(geomapUrl).then((response)=>{
					let data=JSON.parse(response);
					let locationData=data.results[0].address_components,
						n=locationData.length,
						locationObj=null;
					for(let i=0;i<n;i++){
						let types=locationData[i].types.join(",");
						if(types.indexOf("sublocality_level_1")!=-1){
							locationObj=locationData[i];
							break;
						}
					}
					 resolve(locationObj);
				},(err)=>{
					reject(err);
					console.log(err);
				});
			},(err)=>{
				alert("can't access your location this time,please try after some time ");
			},{timeout:5000});
		});
	 return geoPromise;
	},
	showOffers(){
		ajax.getOffers().then((response)=>{
				    	  let res=JSON.parse(response);
						  let arr = this.offers= res;
						  if(arr.length>0){
							offersList.innerHTML="";
							arr.forEach((offer)=>{
								let obj = new CreateOffer(offer);
							  });
						  }else{
							offersList.innerHTML="";
						  }
				          
				    },(err)=>{
				    	this.clearScreen();
				    	alert("session timeout.please login again")
				    	console.error(JSON.parse(err));
				    });
	},
	filterOffers(query){
		if(this.offers){
			let arr=this.offers.filter((e)=>{
            	return (e.title.indexOf(query)!=-1);
        	});
	        if(arr.length>0){
		          offersList.innerHTML="";
		          arr.forEach((offer)=>{
		          let obj = new CreateOffer(offer);
		        });
	        }
		}
	},
	showFavourites(){
		if(this.offers){
			let arr=this.offers.filter((e)=>{
            	return e.isFavourite==true;
        	});
	        if(arr.length>0){
		          offersList.innerHTML="";
		          arr.forEach((offer)=>{
		          let obj = new CreateOffer(offer);
		        });
	        }else{
				offersList.innerHTML="";
			}
		}
	},
	showValidUserActions(){
		registerIcon.style.display="none";
		loginIcon.style.display="none";
		logoutIcon.style.display="block";
		addOfferIcon.style.display="block";
		favIcon.style.display="block";
	},
	showInValidUserActions(){
		registerIcon.style.display="block";
		loginIcon.style.display="block";
		logoutIcon.style.display="none";
		addOfferIcon.style.display="none";
		favIcon.style.display="none";		
	},
	clearScreen(){
		localStorage.removeItem("userId");
		location.reload();
	},
	validatePhoneNumber(no){
		let nullValue=parseInt(no); // checking if value has characters
		if(isNaN(nullValue)){
			alert("mobile no must contain numbers");
			return false;
		}else if((""+nullValue).length!=10){
			alert("Please enter 10 digit mobile no");
			return false;
		}
		return true;
	},
	validatePassword(password){
		let atleastOneCapitalChar=/[A-Z]{1,n}/g;
		let atleastOneSmallChar=/[a-z]{1,n}/g;
		let atleastOneSpecialChar=/[/$@_&]{1,n}/g;
		let atleastOneDigit=/[0-9]{1,n}/g;
		if(password.length<8){
			alert("Password must contain atleast 8 chars");
			return false;
		}else if(!atleastOneCapitalChar.test(password)){
			alert("Password must contain atleast one capital letter");
			return false;
		}else if(!atleastOneDigit.test(password)){
			alert("Password must contain atleast one digit");
			return false;
		}else if(!atleastOneSmallChar.test(password)){
			alert("Password must contain atleast one small char");
			return false;
		}else if(!atleastOneSpecialChar.test(password)){
			alert("Password must contain atleast one special char");
			return false;
		}
		return true;
	}
}
export {commonService}