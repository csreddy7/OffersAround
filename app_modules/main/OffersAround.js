import CreateOffer from "utilities/offer";
import dialog from "utilities/dialog";
import 'main/OffersAround.css';
import 'css/font-awesome.css';
import 'registration/Registration.css';
var offers = 0;
window.onload = function () {
  /*var location=document.getElementsByClassName("location"),locationName="";
	navigator.geolocation.getCurrentPosition(function(data){
	location[0].innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
});*/

  var obj = new CreateOffer("two jeans at 300rs", "k r puram");
  obj.init();


  var menuIcon = document.getElementById("menu-icon"),
    menu = document.getElementById("offer-menu");

  menuIcon.addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "menu-icon");
    } else {
      menuIcon.setAttribute("class", "menu-icon rotate-menu");
    }
    if (menu.className.indexOf("show-menu") == -1) {
      menu.setAttribute("class", "offer-menu show-menu");
    } else {
      menu.setAttribute("class", "offer-menu hide-menu");
    }
  });


  document.getElementsByClassName("main-content")[0].addEventListener("click", function () {
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "menu-icon");
    }
    if (menu.className.indexOf("show-menu") != -1) {
      menu.setAttribute("class", "offer-menu hide-menu");
    }
  });

  document.getElementById("register").addEventListener("click", function () {
    this.dialog = new dialog({
      title: "User Registration",
      templateUrl: "Registration.html"
    });
    this.dialog.init();
  });

}
