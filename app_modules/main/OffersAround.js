import CreateOffer from "utilities/offer";
import dialog from "utilities/dialog";
// import 'css/reset.css';
// import 'main/OffersAround.css';
 import 'css/font-awesome.css';
// import 'registration/Registration.css';
var offers = 0;
window.onload = function () {
  /*var location=document.getElementsByClassName("location"),locationName="";
	navigator.geolocation.getCurrentPosition(function(data){
	location[0].innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
});*/

 for(let i=0;i<2;i++){
   var obj = new CreateOffer("two jeans at 300rs", "k r puram"+i);
   obj.init();
 }


  const menuIcon = document.querySelectorAll(".fa-bars")[0],
        menu = document.querySelectorAll(".menu-list")[0],
        registerIcon = document.querySelectorAll("#register")[0],
        loginIcon = document.querySelectorAll("#login")[0],
        logoutIcon = document.querySelectorAll("#logout")[0],
        addOfferIcon = document.querySelectorAll("#addoffer")[0];

    
logoutIcon.style.display="none";
addOfferIcon.style.display="none";
  menuIcon.addEventListener("click", function () {
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


  document.querySelectorAll("main")[0].addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "fa fa-bars");
    }
    if (menu.className.indexOf("show-menu") != -1) {
      menu.setAttribute("class", "menu-list hide-menu");
    }
  });

  document.querySelectorAll("#register")[0].addEventListener("click", function () {
    this.dialog = new dialog({
      title: "User Registration",
      templateUrl: "app_modules/registration/Registration.html"
    });
    this.dialog.init();
  });

}
