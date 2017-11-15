import { Dialog } from "utilities/Dialog/dialog";
import { login }  from "login/loginWidget";
import { Registration }  from "registration/Registration";
import { AddOffer }  from "main/AddOffer";
import { commonService } from "utilities/common/commonService";
window.onload = function () {

  const menuIcon = document.querySelectorAll(".fa-bars")[0],
    menu = document.querySelectorAll(".menu-list")[0],
    registerIcon = document.querySelectorAll("#register")[0],
    loginIcon = document.querySelectorAll("#login")[0],
    logoutIcon = document.querySelectorAll("#logout")[0],
    addOfferIcon = document.querySelectorAll("#addoffer")[0],
    main = document.querySelectorAll("main")[0],
    register = document.querySelectorAll("#register")[0],
    loginLink = document.querySelectorAll("#login")[0],
    addOffer = document.querySelectorAll("#addoffer")[0],
    logout = document.querySelectorAll("#logout")[0],
    searchBox = document.querySelectorAll("#searchBox")[0],
    searchButton = document.querySelectorAll("#searchButton")[0],
    offersList=document.querySelectorAll("#offersList")[0],
    favIcon=document.querySelector("#favourite");

    let locationObj=null;

  let init=function(){
    let userId=localStorage.getItem("userName");
    if(userId==="null"){
     commonService.showInValidUserActions();
    }else{
      commonService.showValidUserActions();
    }
    initializeHandlers();
    commonService.showOffers();
    commonService.getLocation().then((res)=>{
      locationObj=res;
      let titleArray=document.querySelectorAll(".location-title");
      titleArray.forEach((e)=>{
        e.innerHTML="Offers Around "+locationObj.short_name;
      });
      console.log("locationName---->",locationObj.short_name);
    },(err)=>{
      console.log(err)
    });
  }

  let initializeHandlers =function(){
      // initializing event handlers
      menuIcon.addEventListener("click", () => {
        if (menuIcon.className.indexOf("rotate-menu") != -1) {
          menuIcon.setAttribute("class", "fa fa-bars");
        } else {
          menuIcon.setAttribute("class", "fa fa-bars rotate-menu");
        }
        if (menu.className.indexOf("show-menu") == -1) {
          menu.setAttribute("class", "menu-list show-menu");
        } else {
          menu.setAttribute("class", "menu-list hide-menu");
        }
      });


      main.addEventListener("click", () => {
        hideMenu();
      });

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


      let hideMenu = () =>{
        if (menuIcon.className.indexOf("rotate-menu") != -1) {
          menuIcon.setAttribute("class", "fa fa-bars");
        }
        if (menu.className.indexOf("show-menu") != -1) {
          menu.setAttribute("class", "menu-list hide-menu");
        }
      }
      register.addEventListener("click", () => {
          let dialog = new Dialog({
            title: "User Registration"
          });
          let registrationWidget= new Registration();
          registrationWidget.renderPage().then(()=>{
            dialog.init(registrationWidget.dom);
            registrationWidget.initializeHandlers();
            hideMenu();
          },()=>{
            console.log("error while creating login widget")
          });
      });

      loginLink.addEventListener("click", () => {
          let dialog = new Dialog({
            title: "Login"
          });
          let loginWidget= new login();
          loginWidget.renderPage().then(()=>{
            dialog.init(loginWidget.dom);
            loginWidget.initializeHandlers();
            hideMenu();
          },()=>{
            console.log("error while creating login widget")
          });
      });


      logout.addEventListener("click", () => {
          hideMenu();
          document.cookie="token=77";
          commonService.clearScreen();
      });

      addOffer.addEventListener("click", () => {
         let dialog = new Dialog({
            title: "Add Offer"
          });
          let addOfferWidget= new AddOffer();
          addOfferWidget.renderPage().then(()=>{
            dialog.init(addOfferWidget.dom);
            addOfferWidget.initializeHandlers();
            hideMenu();
          },()=>{
            console.log("error while creating login widget")
          });  
      });

      favIcon.addEventListener("click", () => {
        commonService.showFavourites();
     });
  }

  init();
}



  /*location code
  var location=document.getElementsByClassName("location"),locationName="";
	navigator.geolocation.getCurrentPosition(function(data){
	location[0].innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
});*/
