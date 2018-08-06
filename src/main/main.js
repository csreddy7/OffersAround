import { commonService } from "utilities/common/commonService";
import {obj as ajax } from 'utilities/xhr/ajax';
import {CreateOffer} from 'Offer/offer';

import 'main/main.css';
import 'css/font-awesome.css';

let offers=[];
let offersList=document.querySelector("#offersList");
function initMainView() {
  
    let locationObj=null;
    commonService.getLocation().then((res)=>{
      locationObj=res;
      let titleArray=document.querySelectorAll(".location-title");
      titleArray.forEach((e)=>{
        e.innerHTML="Offers Around "+locationObj.short_name;
      });
      console.log("locationName---->",locationObj.short_name);
      localStorage.setItem("location",locationObj.short_name);
      showOffers();
    },(err)=>{
      localStorage.setItem("location","unknown");
      showOffers();
      console.log(err);
    });
    initializeHandlers();
}

function showOffers(){
        ajax.getOffers().then((response)=>{
              let res=JSON.parse(response);
              let arr = offers= res;
              if(arr.length>0){
                  offersList.innerHTML="";
                  arr.forEach((offer)=>{
                      let obj = new CreateOffer(offer);
                  });
              }else{
                  offersList.innerHTML="";
              }
          },(err)=>{
              alert("session timeout.please login again")
              console.error(JSON.parse(err));
          });
}

function initializeHandlers(){
 // initializing event handlers
  
    const logoutIcon = document.querySelector("#logout"),
    addOfferButton= document.querySelector("#addOfferButton"),
    searchBox = document.querySelector("#searchBox"),
    searchButton = document.querySelector("#searchButton"),
    offersAround=document.querySelector(".offersAround"),
    addOfferDialog=document.querySelector("#addOffer");
    
    searchButton.addEventListener("click", () => {
        filterOffers();
      });

    searchBox.addEventListener("keyup", (event) => {
          if(event.keyCode==13){
            filterOffers();
          }
      });

    function filterOffers(){
        let searchValue=searchBox.value;
        let arr=commonService.filterOffers(searchValue,offers);
        if(arr.length>0){
            offersList.innerHTML="";
            arr.forEach((offer)=>{
            let obj = new CreateOffer(offer);
          });
        }
    }
      
    addOfferButton.addEventListener("click", () => {
        showDialog(addOfferDialog);
    });

    document.querySelector("#addOffer .close-icon").addEventListener("click", () => {
        hideDialog(addOfferDialog);
    });

    document.querySelector("#editOffer .close-icon").addEventListener("click", () => {
        const editDialog=document.querySelector("#editOffer");
        hideDialog(editDialog);
    });

    document.querySelector("#showOffer .close-icon").addEventListener("click", () => {
        const showOfferDialog=document.querySelector("#showOffer");
        hideDialog(showOfferDialog);
    });


    function showDialog(node){
        offersAround.classList.remove("showDiv");
		node.classList.remove("hideDiv");
        offersAround.classList.add("hideDiv");
		node.classList.add("showDiv");
    }

    function hideDialog(node){
        offersAround.classList.remove("hideDiv");
		node.classList.remove("showDiv");
        offersAround.classList.add("showDiv");
        node.classList.add("hideDiv");       
    }

}

export default initMainView;