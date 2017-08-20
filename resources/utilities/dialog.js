"use strict;"
 export default function dialog(params) {
  this.params = params;
  this.init = function() {
    var request = new XMLHttpRequest(),
      response = "",
      _this = this;
    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        response = this.responseText;
        render();
      }
    }
    request.open("GET", this.params.templateUrl, true);
    request.send();

    function render() {
      var template = '<section class="offer-details-dialog">' +
        '<div class="offer-dialog-header"><span><h8>' + _this.params.title + '</h8></span><span ><i class="fa fa-window-close close-dialog" aria-hidden="true"></i></span></div>'+response+'</section>';
      var keys = Object.keys(params);
      keys.forEach(function(e) {
        template = template.replace("{{params." + e + "}}", params[e]);
      });

      var offer = document.createElement("div"),
        parent = document.querySelectorAll(".offersAround")[0];
      offer.innerHTML = template;
      parent.appendChild(offer);
      offer.addEventListener("click", function() {
        var target = event.target;
        if (target.className.indexOf("close-dialog") != -1) {
          +
          parent.removeChild(offer);
        }
      });
    }
  }
}
