import { CreateOffer } from "utilities/Offer/offer";
import { Dialog } from "utilities/Dialog/dialog";
import { login }  from "login/loginWidget";
import { Registration }  from "registration/Registration";

var offers = 0;
window.onload = function () {

var http= new XMLHttpRequest();
http.open("GET","/getOffers",true);
http.send();
http.onreadystatechange= ()=>{
	if(http.readyState==XMLHttpRequest.DONE && http.status==200){
		var res=JSON.parse(http.responseText);
		var arr=res.data;
		arr.forEach((e)=>{
			var obj = new CreateOffer(e.title, e.details,e.location);
		});
	}
};
  

  // initializing event handlers
  const menuIcon = document.querySelectorAll(".fa-bars")[0],
    menu = document.querySelectorAll(".menu-list")[0],
    registerIcon = document.querySelectorAll("#register")[0],
    loginIcon = document.querySelectorAll("#login")[0],
    logoutIcon = document.querySelectorAll("#logout")[0],
    addOfferIcon = document.querySelectorAll("#addoffer")[0],
    main = document.querySelectorAll("main")[0],
    register = document.querySelectorAll("#register")[0],
    loginLink = document.querySelectorAll("#login")[0];


  logoutIcon.style.display = "none";
  addOfferIcon.style.display = "none";


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
    if (menuIcon.className.indexOf("rotate-menu") != -1) {
      menuIcon.setAttribute("class", "fa fa-bars");
    }
    if (menu.className.indexOf("show-menu") != -1) {
      menu.setAttribute("class", "menu-list hide-menu");
    }
  });

  register.addEventListener("click", () => {
    	let dialog = new Dialog({
	      title: "User Registration"
	    });
	    let registrationWidget= new Registration();
	    registrationWidget.renderPage().then(()=>{
	    	dialog.init(registrationWidget.dom);
	    	registrationWidget.initializeHandlers();
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
	    },()=>{
	    	console.log("error while creating login widget")
	    });
  });

}



  /*location code
  var location=document.getElementsByClassName("location"),locationName="";
	navigator.geolocation.getCurrentPosition(function(data){
	location[0].innerHTML="Location coordinates:"+data.coords.latitude+","+data.coords.longitude;
});*/
