import { commonService } from "utilities/common/commonService";
import {obj as ajax } from 'utilities/xhr/ajax';
import {CreateOffer} from 'utilities/Offer/offer';

import "css/OffersAround.css";

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
      commonService.showOffers();
    },(err)=>{
      localStorage.setItem("location","unknown");
      showOffers();
      console.log(err);
    });
    initializeHandlers();
}

function showOffers(){
  let offersList=document.querySelector("#offersList");
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
              alert("session timeout.please login again")
              console.error(JSON.parse(err));
          });
}

function initializeHandlers(){
 // initializing event handlers
  
    const logoutIcon = document.querySelector("#logout"),
    addOfferIcon = document.querySelector("#addOffer"),
    searchBox = document.querySelector("#searchBox"),
    searchButton = document.querySelector("#searchButton");
    
    searchButton.addEventListener("click", () => {
        let searchValue=searchBox.value;
        commonService.filterOffers(searchValue);
      });

      searchBox.addEventListener("keyup", (event) => {
          if(event.keyCode==13){
            let searchValue=searchBox.value;
            commonService.filterOffers(searchValue);
          }
      });

      
      addOfferIcon.addEventListener("click", () => {
          hideMenu();
          document.cookie="token=77";
          commonService.clearScreen();
      });

      addOfferIcon.addEventListener("click", () => {
          let dialog = OA.injector.get("dialog");
          if(dialog.isOpened()){
            dialog.closeDialog();
          } 
          let addOfferWidget= new AddOffer();
          addOfferWidget.renderPage().then(()=>{
            dialog.init("Add Offer",addOfferWidget.dom);
            addOfferWidget.initializeHandlers();
            hideMenu();
          },()=>{
            console.log("error while creating login widget")
          });  
      });
}

export default initMainView;