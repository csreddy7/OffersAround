"use strict;"

class Dialog {

  constructor(params) {
    this.params = params;
    this.parent = document.querySelectorAll(".offersAround")[0];
    this.init();
  }

  init() {
    // getting dialog template using ajax call
    let firstPromise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", "resources/utilities/Dialog/dialog.html", true);
      request.onload = () => resolve(request.responseText);
      request.onerror = () => reject(request.statusText);
      request.send();
    });

    firstPromise.then((response) => {
     return  renderDialogTemplate(response);
    }, (error) => {
      console.error("error while loading dialog template");
    }).then((dialog) => {
      let secondPromise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", this.params.templateUrl, true);
        request.onload = () => resolve(request.responseText);
        request.onerror = () => reject(request.statusText);
        request.send();
      });
      secondPromise.then((dialogContent) => {
        renderDialogContent(dialog, dialogContent);
      }, (error) => {
        console.error("error while loading dialog content template");
      })
    });

    // rendering the dialog template
    let renderDialogTemplate = (dialogTemplate) => {
      let dialog = document.createElement("div");
      dialog.innerHTML = dialogTemplate;
      this.parent.appendChild(dialog);
      return dialog;
    }

    // rendering the dialog template with given parameters and content
    let renderDialogContent = (dialog, dialogContent) => {
      let keys = Object.keys(this.params);
      keys.forEach((e) => {
        dialogContent = dialogContent.replace("{{params." + e + "}}", this.params[e]);
      });
      dialog.querySelectorAll(".dialog-title")[0].innerHTML = this.params.title;
      dialog.querySelectorAll(".dialog-content")[0].innerHTML = dialogContent;
      this.initializeEventHandlers(dialog);
    }
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

