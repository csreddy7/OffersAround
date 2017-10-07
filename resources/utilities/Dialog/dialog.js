"use strict;"

class Dialog {
  constructor(params) {
    this.params = params;
    this.parent = document.querySelectorAll(".offersAround")[0];
  }

  init(dialogContent) {
    var dialogTemplate=`<section class="offer-details-dialog">
                            <div class="offer-dialog-header">
                                <span><h8 class="dialog-title">${this.params.title}</h8></span>
                                <span><i class="fa fa-window-close close-dialog" aria-hidden="true"></i></span>
                            </div>
                            <div class="dialog-content"></div>
                        </section>`;
    let dialog = document.createElement("div");
    dialog.innerHTML = dialogTemplate;
    this.parent.appendChild(dialog);
    dialog.querySelectorAll(".dialog-content")[0].appendChild(dialogContent);
    this.initializeEventHandlers(dialog);
  }

  initializeEventHandlers(dialog) {
    dialog.addEventListener("click", (event) => {
      let target = event.target;
      if (target.className.indexOf("close-dialog") != -1) {
        this.parent.removeChild(dialog);
      }
    });
  }

}

export { Dialog }

