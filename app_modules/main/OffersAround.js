import { login }  from "login/loginWidget";
import { Registration }  from "registration/Registration";
import { AddOffer }  from "main/AddOffer";
import { commonService } from "utilities/common/commonService";
import { Injector } from "utilities/common/injector";
import 'main/OffersAround.css';
import 'css/font-awesome.css';


window.OA={
  "injector":new Injector()
 };

window.onload = function () {

  const menuIcon = document.querySelector(".fa-bars"),
    menu = document.querySelector(".menu-list"),
    registerIcon = document.querySelector("#register"),
    loginIcon = document.querySelector("#login"),
    logoutIcon = document.querySelector("#logout"),
    addOfferIcon = document.querySelector("#addoffer"),
    main = document.querySelector("main"),
    register = document.querySelector("#register"),
    loginLink = document.querySelector("#login"),
    addOffer = document.querySelector("#addoffer"),
    logout = document.querySelector("#logout"),
    searchBox = document.querySelector("#searchBox"),
    searchButton = document.querySelector("#searchButton"),
    offersList=document.querySelector("#offersList"),
    favIcon=document.querySelector("#favourite");

    let hideMenu = () =>{
      if (menuIcon.classList.contains("rotate-menu")) {
          menuIcon.setAttribute("class", "fa fa-bars");
      }
      if (menu.classList.contains("show-menu")) {
          menu.setAttribute("class", "menu-list hide-menu");
      }
    }

    let locationObj=null;
    let userId=localStorage.getItem("userId");
    if(userId){
      commonService.showValidUserActions();
    }else{
      commonService.showInValidUserActions();
    }
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
      commonService.showOffers();
      console.log(err);
    });
    
  // initializing event handlers
  menuIcon.addEventListener("click", () => {
    if (menuIcon.classList.contains("rotate-menu")) {
      menuIcon.setAttribute("class", "fa fa-bars");
    } else {
      menuIcon.setAttribute("class", "fa fa-bars rotate-menu");
    }
    if (!menu.classList.contains("show-menu")) {
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

  register.addEventListener("click", () => {
    let dialog = OA.injector.get("dialog");
    if(dialog.isOpened()){
      dialog.closeDialog();
    } 
    let registrationWidget= new Registration();
      registrationWidget.renderPage().then(()=>{
        dialog.init( "User Registration",registrationWidget.dom);
        registrationWidget.initializeHandlers();
        hideMenu();
      },()=>{
        console.log("error while creating login widget")
      });
  });

  loginLink.addEventListener("click", () => {
      let dialog = OA.injector.get("dialog");
      if(dialog.isOpened()){
        dialog.closeDialog();
      } 
      let loginWidget= new login();
      loginWidget.renderPage().then(()=>{
        dialog.init("Login",loginWidget.dom);
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

  favIcon.addEventListener("click", () => {
    commonService.showFavourites();
 });

 
}




  /*location code
  var location=document.getElementsByClassName("location"),locationName="";
	navigator.geolocation.getCurrentPosition(function(data){
	location.innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
});*/
