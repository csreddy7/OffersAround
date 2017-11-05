import { CreateOffer } from "utilities/Offer/offer";
import {obj as ajax } from 'utilities/xhr/ajax';

let registerIcon = document.querySelectorAll("#register")[0],
	loginIcon = document.querySelectorAll("#login")[0],
	logoutIcon = document.querySelectorAll("#logout")[0],
	addOfferIcon = document.querySelectorAll("#addoffer")[0],
	offersList=document.querySelectorAll("#offersList")[0],
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
			});
		});
	 return geoPromise;
	},
	showOffers(){
		ajax.getOffers().then((response)=>{
				    	  let res=JSON.parse(response);
				          let arr = this.offers= res.data;
				          arr.forEach((offer)=>{
				            let obj = new CreateOffer(offer);
				          });
				          this.showValidUserActions();
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
	},
	clearScreen(){
		offersList.innerHTML="";
		this.offers=null;
		this.showInValidUserActions();
	}
}
export {commonService}