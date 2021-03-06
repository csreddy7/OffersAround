import {obj as ajax } from 'utilities/xhr/ajax';

let logoutIcon = document.querySelectorAll("#logout")[0],
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
				reject(err);
				// alert("can't access your location this time,please try after some time ");
			},{timeout:5000});
		});
	 return geoPromise;
	},
	filterOffers(query,offers){
		if(offers){
			let arr=offers.filter((e)=>{
            	return (e.title.indexOf(query)!=-1);
			});	
			return arr;
		}
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
		let atleastOneCapitalChar=/[A-Z]/;
		let atleastOneSmallChar=/[a-z]/;
		let atleastOneSpecialChar=/[/$@_&]/;
		let atleastOneDigit=/[0-9]/;
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