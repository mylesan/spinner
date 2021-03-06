class Spinner {

  constructor(obj) {

     this.settings = {
        entry: obj.entry,
        elm: document.querySelector(obj.entry) || document.querySelector('body'),
        spinnerColor: obj.spinnerColor || '#5394b4',
        loaderColor: obj.loaderColor || '#5394b4',
        percentColor: obj.percentColor || '#5394b4',
        logoColor: obj.logoColor || '#5394b4',
        type: obj.type ? obj.type : 'default'
     };
  }

  create() {

    const logoElm = this.settings.type === 'logo' ? `<div class="anim-bounce"><div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 31 32">
      <path fill="${this.settings.logoColor}" d="M12.198 0.225c-0.88 0-1.566 0.457-2.062 1.264-0.879-0.959-1.978-1.414-3.463-1.414-3.686 0-6.738 3.002-6.738 7.037 0 4.164 3.024 7.015 6.571 7.015 1.486 0 2.751-0.531 3.629-1.515 0.468 0.956 1.1 1.387 2.062 1.387 1.458 0 2.145-0.957 2.145-2.902v-7.995c0-1.941-0.66-2.877-2.145-2.877zM7.163 9.733c-1.512 0-2.738-1.228-2.738-2.74 0-1.515 1.227-2.74 2.738-2.74 1.515 0 2.741 1.225 2.741 2.74 0 1.512-1.226 2.74-2.741 2.74zM24.247 0c-4.264 0-7.344 2.977-7.344 7.113 0 4.137 3.080 7.115 7.344 7.115 4.29 0 7.314-2.978 7.314-7.115s-3.023-7.113-7.314-7.113zM24.262 9.95c-1.513 0-2.739-1.226-2.739-2.74 0-1.512 1.227-2.739 2.739-2.739 1.514 0 2.741 1.227 2.741 2.739-0 1.514-1.226 2.74-2.741 2.74zM29.247 17.972l-0.131-0.003-3.51 0.003c-0.523 0-0.958 0.384-1.036 0.885l-0.002 0.005c-0.319 1.812-1.16 3.403-2.528 4.77-1.786 1.786-3.945 2.677-6.487 2.677-2.536 0-4.697-0.891-6.481-2.677-1.376-1.375-2.22-2.977-2.535-4.8-0.090-0.489-0.518-0.861-1.033-0.861l-0.082-0.003-3.558 0.003c-0.58 0-1.050 0.47-1.050 1.049 0 0.030 0.002 0.061 0.005 0.090v0.004c0.393 3.287 1.797 6.139 4.214 8.556 2.887 2.887 6.393 4.329 10.519 4.329 4.129 0 7.637-1.442 10.523-4.329 2.418-2.418 3.824-5.272 4.216-8.559l0-0c0.002-0.030 0.003-0.060 0.003-0.090 0-0.58-0.469-1.050-1.049-1.050z"></path>
    </svg>
    </div></div>` : ``;
    const loaderElm = this.settings.type === 'loader' ? `<div class="loader" style="color: ${this.settings.loaderColor};"></div>` : ``;
    const percentElm = this.settings.type === 'percent' ? `<div class="percent" style="color: ${this.settings.percentColor};"></div>` : ``;

    let spinnerElm = document.createElement("div");

    spinnerElm.innerHTML = `
    <div class="animation">
      <div class="spinner" style="border-color: ${this.settings.spinnerColor};">
      </div>
      ${logoElm}
      ${percentElm}
      ${loaderElm}
    </div>`;

    if(navigator.appVersion.indexOf("MSIE 9.")!=-1) {
      this.fallBack();
    } else {
      if(this.settings.type === 'percent') {
        this.increment(spinnerElm)
      } else {
        this.settings.elm.insertBefore(spinnerElm, this.settings.elm.childNodes[0]);
      }
    }

  }

  destroy(entry) {
    if (entry.nodeType === 1) {
      entry.innerHTML = "";
    } else {
      let elm = document.querySelector(entry);
      elm.innerHTML = "";
    }
  } 

  increment(spinnerElm) {

    this.settings.elm.insertBefore(spinnerElm, this.settings.elm.childNodes[0]);

    let prog = spinnerElm.querySelector('.percent');
    let percentage = 0;
    let i = setInterval(() => {
      percentage++;
      percentage = Math.min(percentage, 100);
      prog.innerText = `${percentage}%`;
      if(percentage === 100){
          clearInterval(i);
          this.destroy(this.settings.elm);
      }
    }, 100);
  }

  fallBack() {
    this.settings.elm.innerHTML = `
    <div class="fallback-spinner"><img src="http://www.shopfashionisland.com/images/spinner.gif" /></div>`;
  }

}

export default Spinner;
