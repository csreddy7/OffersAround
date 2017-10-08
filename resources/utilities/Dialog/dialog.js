"use strict;"

class Dialog {
  constructor(params) {
    this.params = params;
    this.dialog=null;
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
    this.dialog = document.createElement("div");
    this.dialog.innerHTML = dialogTemplate;
    this.parent.appendChild(this.dialog);
    this.dialog.querySelectorAll(".dialog-content")[0].appendChild(dialogContent);
    this.initializeEventHandlers();
  }

  initializeEventHandlers() {
    this.dialog.addEventListener("click", (event) => {
      let target = event.target;
      if (target.className.indexOf("close-dialog") != -1) {
        this.closeDialog();
      }
    });

    document.addEventListener("close-dialog",(e)=>{
      this.closeDialog();
    },false);
  }

  closeDialog(){
    this.parent.removeChild(this.dialog);
  }
}

export { Dialog }

