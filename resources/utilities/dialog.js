"use strict;"

class Dialog {

  constructor(params) {
    this.params = params;
    this.init();
  }

  init() {
    // getting template using ajax call
    const request = new XMLHttpRequest();
    let response = ""

    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        response = this.responseText;
        render();
      }
    }

    request.open("GET", this.params.templateUrl, true);
    request.send();

    // rendering the template with given parameters in dialog
    let render = () => {
      let template = `<section class="offer-details-dialog">
                            <div class="offer-dialog-header">
                               <span><h8>${this.params.title}</h8></span>
                               <span ><i class="fa fa-window-close close-dialog" aria-hidden="true"></i></span>
                            </div>
                            ${response}
                            </section>`,
        keys = Object.keys(this.params),
        dialog = document.createElement("div"),
        parent = document.querySelectorAll(".offersAround")[0];

      keys.forEach((e) => {
        template = template.replace("{{params." + e + "}}", this.params[e]);
      });

      dialog.innerHTML = template;
      parent.appendChild(dialog);
      this.initializeEventHandlers(dialog,parent);
    }
  }

  initializeEventHandlers(dialog,parent) {
    dialog.addEventListener("click", (event) => {
      let target = event.target;
      if (target.className.indexOf("close-dialog") != -1) {
        parent.removeChild(dialog);
      }
    });
  }

}

export { Dialog }

