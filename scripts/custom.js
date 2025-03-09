class HelloWorld extends HTMLElement {
    constructor() {
        super();
        console.log("Hello world!");
    }
    // Element functionality written in here
  }
customElements.define("hello-world", HelloWorld);