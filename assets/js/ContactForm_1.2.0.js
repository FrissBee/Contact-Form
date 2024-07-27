'use strict';
(() => {
  const template = document.createElement('template');

  const styleStr = /* html */ `<style>
    h2 {
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: normal;
    }

    .border {
      border: 1px solid #ced4da;
    }

    .border-radius {
      border-radius: 0.25rem;
    }
    
    .border-radius-right {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    .section-contact-form {
      position: relative;
      width: 100%;
      justify-content: center;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    .input-style {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: inherit;
      line-height: 1.5;
      color: #212529;
      background-color: #fff;
      background-clip: padding-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-family: inherit;
      font-weight: normal;
    }

    .input-style:focus {
      outline: 2px solid #84d1f4;
    }

    textarea {
      resize: vertical;
      font-family: inherit;
    }

    button.btn-submit {
      display: inline-block;
      font-weight: inherit;
      line-height: inherit;
      color: #212529;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: inherit;
      font-family: inherit;
    }

    button:hover {
      opacity: .8;
    }

    .margin-bottom {
      margin-bottom: 10px;
    }

    .success-message, .error-message {
      text-align: center;
      color: green;
      background-color: #ffffff;
      width: 100%;
      margin-top: 20px;
      padding: 8px 0;
    }

    .success-message {
      color: green;
    }

    .error-message {
      color: red;
    }

    .invalid-mail {
      color: red;
      font-style: italic;
      background-color: #ffffff;
      padding: 4px;
      margin-top: 4px;
      margin-bottom: 8px;
    }

    .display-block {
      display: block;
    }

    .display-none {
      display: none;
    }

    .icon-style {
      width: 20px;
      height: 20px;
    }

    .d-flex {
      display: flex;
    }

    .icon-container {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      text-align: center;
      align-items: center;
      padding: .5rem .75rem .1rem;
      border-bottom: 1px solid #ced4da;
      border-left: 1px solid #ced4da;
      border-top: 1px solid #ced4da;
      -webkit-box-align: center;
      display: -webkit-box;
    }
  </style>`;

  const defaultHTML = /* html */ `
  <section class="section-contact-form">
    <form method="post">
      <div class="margin-bottom">
        <h2 part="h2-tag" class="contact-title"></h2>
      </div>
      <div class="margin-bottom">
        <p part="p-tag" class="contact-subtitle"></p>
      </div>
      <div class="margin-bottom">
        <input part="input-tag" type="text" class="input-style border border-radius input-name" name="name" placeholder="" required />
      </div>
      <div class="margin-bottom">
        <input part="input-tag" type="email" class="input-style border border-radius input-email" name="email" placeholder="" required />
        <div class="invalid-mail border-radius display-none"></div>
      </div>
      <div class="margin-bottom">
        <input part="input-tag" type="text" class="input-style border border-radius input-subject" name="subject" placeholder="" required />
      </div>
      <div class="margin-bottom">
        <textarea part="textarea-tag" class="input-style border border-radius input-message" name="message" placeholder="" rows="4" required></textarea>
      </div>
      <div class="success-message border border-radius margin-bottom display-none">
      </div>
      <div class="error-message border border-radius margin-bottom display-none">
      </div>
      <div class="container-btn-submit">
        <button part="button-tag" type="submit" class="border border-radius btn-submit"></button>
      </div>
    </form>
  </section>
  `;

  const iconsHTML = /* html */ `
  <section class="section-contact-form">
    <form method="post">
      <div class="margin-bottom">
        <h2 part="h2-tag" class="contact-title"></h2>
      </div>
      <div class="margin-bottom">
        <p part="p-tag" class="contact-subtitle"></p>
      </div>
      <div class="margin-bottom d-flex">
        <div class="icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
          </svg>
        </div>
        <input part="input-tag" type="text" class="input-style border border-radius-right input-name" name="name" placeholder="" required />
      </div>
      <div class="margin-bottom">
        <div class="d-flex">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
            </svg>
          </div>
          <input part="input-tag" type="email" class="input-style border border-radius-right input-email" name="email" placeholder="" required />
        </div>
        <div class="invalid-mail border-radius-right display-none"></div>
      </div>
      <div class="margin-bottom d-flex">
        <div class="icon-container"><svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></div>
        <input part="input-tag" type="text" class="input-style border border-radius-right input-subject" name="subject" placeholder="" required />
      </div>
      <div class="margin-bottom d-flex">
        <div class="icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
          </svg>
        </div>
        <textarea part="textarea-tag" class="input-style border border-radius-right input-message" name="message" placeholder="" rows="4" required></textarea>
      </div>
      <div class="success-message border border-radius-right margin-bottom display-none"></div>
      <div class="error-message border border-radius-right margin-bottom display-none"></div>
      <div class="container-btn-submit">
        <button part="button-tag" type="submit" class="border border-radius btn-submit"></button>
      </div>
    </form>
  </section>`;

  const defaultDesign = styleStr + defaultHTML;
  const iconsDesign = styleStr + iconsHTML;

  class ContactForm extends HTMLElement {
    // #mailPath => Change the relative path to "contact-form.php" here if necessary:
    #mailPath = './inc/contact-form.php';
    // #defaultSettings => Change the default values here if desired:
    #defaultSettings = {
      bgColor: '#f7f7f7',
      bgBorder: '1px solid #ced4da',
      bgBorderRadius: '0.25rem',
      textColor: '#262626',
      textAlign: 'center',
      title: 'Contact',
      subtitle: '',
      namePlaceholder: 'Your name',
      mailPlaceholder: 'Your Email address',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your message',
      btnColor: '#d6d6d6',
      btnText: 'Send',
      btnTextColor: '#262626',
      successMessage: 'Thank you! Your message has been sent.',
      errorMessage: 'Something went wrong. The mail could not be sent.',
      mailSignature: 'A message from ' + document.location.host,
      invalidMail: 'Invalid mail address',
      btnAlign: 'left',
      containerPadding: '20px',
      iconFill: 'inherit',
      bgColorIcons: '#e9ecef',
      textName: '',
      textEmail: '',
      textSubject: '',
      textMessage: '',
    };
    #root = null;
    #DOM = {};
    #INPUTS = {
      name: '',
      mail: '',
      subject: '',
      message: '',
    };
    #borderColor = '#ced4da';
    #requiredBorderColor = '2px solid #fc0505';
    #isIcon = false;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'open' });
      this.#setLayout();
      this.#root.appendChild(template.content.cloneNode(true));
      this.#selectDomElements();
      this.#setDefaultSettings();
    }

    connectedCallback() {
      this.#DOM.inputName.addEventListener('input', (e) => (this.#INPUTS.name = e.currentTarget.value));
      this.#DOM.inputEmail.addEventListener('input', (e) => (this.#INPUTS.mail = e.currentTarget.value));
      this.#DOM.inputSubject.addEventListener('input', (e) => (this.#INPUTS.subject = e.currentTarget.value));
      this.#DOM.inputMessage.addEventListener('input', (e) => (this.#INPUTS.message = e.currentTarget.value));
      this.#DOM.btnSubmit.addEventListener('click', (e) => this.#onSendButton(e));
    }

    static get observedAttributes() {
      return [
        'mail-path',
        'bg-color',
        'bg-border',
        'bg-border-radius',
        'text-color',
        'text-align',
        'contact-title',
        'contact-subtitle',
        'name-placeholder',
        'mail-placeholder',
        'subject-placeholder',
        'message-placeholder',
        'btn-color',
        'btn-text',
        'btn-text-color',
        'success-message',
        'error-message',
        'mail-signature',
        'invalid-mail',
        'btn-align',
        'container-padding',
        'icon-color',
        'bg-color-icons',
        'text-name',
        'text-email',
        'text-subject',
        'text-message',
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'mail-path') this.#mailPath = newValue;
      else if (name === 'bg-color') this.#DOM.sectionContactForm.style.backgroundColor = newValue;
      else if (name === 'bg-border') this.#DOM.sectionContactForm.style.border = newValue;
      else if (name === 'bg-border-radius') this.#DOM.sectionContactForm.style.borderRadius = newValue;
      else if (name === 'text-color') this.#DOM.title.style.color = this.#DOM.subtitle.style.color = newValue;
      else if (name === 'text-align') this.#DOM.title.style.textAlign = this.#DOM.subtitle.style.textAlign = newValue;
      else if (name === 'contact-title') this.#DOM.title.textContent = newValue;
      else if (name === 'contact-subtitle') this.#DOM.subtitle.textContent = newValue;
      else if (name === 'name-placeholder') this.#DOM.inputName.placeholder = newValue;
      else if (name === 'mail-placeholder') this.#DOM.inputEmail.placeholder = newValue;
      else if (name === 'subject-placeholder') this.#DOM.inputSubject.placeholder = newValue;
      else if (name === 'message-placeholder') this.#DOM.inputMessage.placeholder = newValue;
      else if (name === 'btn-color') this.#DOM.btnSubmit.style.backgroundColor = newValue;
      else if (name === 'btn-text') this.#DOM.btnSubmit.textContent = newValue;
      else if (name === 'btn-text-color') this.#DOM.btnSubmit.style.color = newValue;
      else if (name === 'success-message') this.#DOM.successMessage.textContent = newValue;
      else if (name === 'error-message') this.#DOM.errorMessage.textContent = newValue;
      else if (name === 'mail-signature') this.#defaultSettings.mailSignature = newValue;
      else if (name === 'invalid-mail') this.#DOM.invalidMail.textContent = newValue;
      else if (name === 'btn-align') this.#DOM.containerBtnSubmit.style.textAlign = newValue;
      else if (name === 'container-padding') this.#DOM.sectionContactForm.style.padding = newValue;
      else if (name === 'icon-color') this.#setColorIcons(newValue);
      else if (name === 'bg-color-icons') this.#setContainerBgColorIcons(newValue);
      else if (name === 'text-name') this.#DOM.inputName.value = newValue;
      else if (name === 'text-email') this.#DOM.inputEmail.value = newValue;
      else if (name === 'text-subject') this.#DOM.inputSubject.value = newValue;
      else if (name === 'text-message') this.#DOM.inputMessage.value = newValue;
    }

    #setLayout() {
      if (this.hasAttribute('layout-name')) {
        if (this.getAttribute('layout-name') === 'icons') {
          this.#isIcon = true;
          template.innerHTML = iconsDesign;
        } else {
          template.innerHTML = defaultDesign;
        }
      } else {
        template.innerHTML = defaultDesign;
      }
    }

    #selectDomElements() {
      this.#DOM.sectionContactForm = this.#root.querySelector('.section-contact-form');
      this.#DOM.title = this.#root.querySelector('.contact-title');
      this.#DOM.subtitle = this.#root.querySelector('.contact-subtitle');
      this.#DOM.inputName = this.#root.querySelector('.input-name');
      this.#DOM.inputEmail = this.#root.querySelector('.input-email');
      this.#DOM.inputSubject = this.#root.querySelector('.input-subject');
      this.#DOM.inputMessage = this.#root.querySelector('.input-message');
      this.#DOM.btnSubmit = this.#root.querySelector('.btn-submit');
      this.#DOM.successMessage = this.#root.querySelector('.success-message');
      this.#DOM.errorMessage = this.#root.querySelector('.error-message');
      this.#DOM.invalidMail = this.#root.querySelector('.invalid-mail');
      this.#DOM.containerBtnSubmit = this.#root.querySelector('.container-btn-submit');
      if (this.#isIcon === true) {
        this.#DOM.svgIcons = this.#root.querySelectorAll('svg.icon-style');
        this.#DOM.iconContainer = this.#root.querySelectorAll('.icon-container');
      }
      this.#DOM.inputName = this.#root.querySelector('[name="name"]');
      this.#DOM.inputEmail = this.#root.querySelector('[name="email"]');
      this.#DOM.inputSubject = this.#root.querySelector('[name="subject"]');
      this.#DOM.inputMessage = this.#root.querySelector('[name="message"]');
    }

    #setDefaultSettings() {
      this.#DOM.sectionContactForm.style.backgroundColor = this.#defaultSettings.bgColor;
      this.#DOM.sectionContactForm.style.border = this.#defaultSettings.bgBorder;
      this.#DOM.sectionContactForm.style.borderRadius = this.#defaultSettings.bgBorderRadius;
      this.#DOM.title.style.color = this.#defaultSettings.textColor;
      this.#DOM.subtitle.style.color = this.#defaultSettings.textColor;
      this.#DOM.title.style.textAlign = this.#defaultSettings.textAlign;
      this.#DOM.subtitle.style.textAlign = this.#defaultSettings.textAlign;
      this.#DOM.title.textContent = this.#defaultSettings.title;
      this.#DOM.subtitle.textContent = this.#defaultSettings.subtitle;
      this.#DOM.inputName.placeholder = this.#defaultSettings.namePlaceholder;
      this.#DOM.inputEmail.placeholder = this.#defaultSettings.mailPlaceholder;
      this.#DOM.inputSubject.placeholder = this.#defaultSettings.subjectPlaceholder;
      this.#DOM.inputMessage.placeholder = this.#defaultSettings.messagePlaceholder;
      this.#DOM.btnSubmit.style.backgroundColor = this.#defaultSettings.btnColor;
      this.#DOM.btnSubmit.textContent = this.#defaultSettings.btnText;
      this.#DOM.btnSubmit.style.color = this.#defaultSettings.btnTextColor;
      this.#DOM.successMessage.textContent = this.#defaultSettings.successMessage;
      this.#DOM.errorMessage.textContent = this.#defaultSettings.errorMessage;
      this.#DOM.invalidMail.textContent = this.#defaultSettings.invalidMail;
      this.#DOM.containerBtnSubmit.style.textAlign = this.#defaultSettings.btnAlign;
      this.#DOM.sectionContactForm.style.padding = this.#defaultSettings.containerPadding;
      this.#setColorIcons(this.#defaultSettings.iconFill);
      this.#setContainerBgColorIcons(this.#defaultSettings.bgColorIcons);
      this.#DOM.inputName.value = this.#defaultSettings.textName;
      this.#DOM.inputEmail.value = this.#defaultSettings.textEmail;
      this.#DOM.inputSubject.value = this.#defaultSettings.textSubject;
      this.#DOM.inputMessage.value = this.#defaultSettings.textMessage;
    }

    #setColorIcons(newValue) {
      if (this.#isIcon === true) this.#DOM.svgIcons.forEach((elem) => (elem.style.fill = newValue));
    }

    #setContainerBgColorIcons(newValue) {
      if (this.#isIcon === true) this.#DOM.iconContainer.forEach((elem) => (elem.style.backgroundColor = newValue));
    }

    #onSendButton(e) {
      e.preventDefault();
      this.#sendMail();
    }

    async #sendMail() {
      const name = this.#INPUTS.name;
      const email = this.#INPUTS.mail;
      const subject = this.#INPUTS.subject;
      const message = this.#INPUTS.message;
      const mailSignature = this.#defaultSettings.mailSignature;
      const checkValues = this.#checkAllInputsValues();
      const checkMail = this.#validateMailInput(email);

      if (checkMail === false) {
        this.#showInvalidMail(true);
      } else if (checkValues === true && checkMail === true) {
        const params = {
          action: 'send-email',
          name: name,
          mail: email,
          subject: subject,
          message: message,
          mailSignature: mailSignature,
        };

        await fetch(this.#mailPath, {
          method: 'POST',
          body: JSON.stringify(params),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response === true) {
              this.#clearAllInputsValues();
              this.#clearAllInputsBorders();
              this.#resetINPUTS();
              this.#showInvalidMail(false);
              this.#DOM.successMessage.classList.add('display-block');
              this.#DOM.successMessage.classList.remove('display-none');
              this.#setTimeoutForSuccessMessage();
            } else {
              this.#showErrorMessage(true);
            }
          })
          .catch((error) => {
            this.#showErrorMessage(true);
            console.log(error);
          });
      }
    }

    #checkAllInputsValues() {
      this.#clearAllInputsBorders();
      this.#showInvalidMail(false);
      this.#showErrorMessage(false);
      let checked = true;

      if (this.#INPUTS.name.trim() === '') {
        this.#DOM.inputName.style.outline = this.#requiredBorderColor;
        checked = false;
      }

      if (this.#INPUTS.subject.trim() === '') {
        this.#DOM.inputSubject.style.outline = this.#requiredBorderColor;
        checked = false;
      }

      if (this.#INPUTS.message.trim() === '') {
        this.#DOM.inputMessage.style.outline = this.#requiredBorderColor;
        checked = false;
      }

      return checked;
    }

    #validateMailInput(mail) {
      const expression =
        /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

      return expression.test(String(mail).toLowerCase());
    }

    #clearAllInputsValues() {
      this.#DOM.inputName.value = '';
      this.#DOM.inputEmail.value = '';
      this.#DOM.inputSubject.value = '';
      this.#DOM.inputMessage.value = '';
    }

    #clearAllInputsBorders() {
      this.#DOM.inputName.style.outline = this.#borderColor;
      this.#DOM.inputEmail.style.outline = this.#borderColor;
      this.#DOM.inputSubject.style.outline = this.#borderColor;
      this.#DOM.inputMessage.style.outline = this.#borderColor;
    }

    #resetINPUTS() {
      this.#INPUTS.name = '';
      this.#INPUTS.mail = '';
      this.#INPUTS.subject = '';
      this.#INPUTS.message = '';
    }

    #showInvalidMail(onOff) {
      if (onOff === false) {
        this.#DOM.invalidMail.classList.add('display-none');
        this.#DOM.invalidMail.classList.remove('display-block');
      } else {
        this.#DOM.invalidMail.classList.add('display-block');
        this.#DOM.invalidMail.classList.remove('display-none');
        this.#DOM.inputEmail.style.outline = this.#requiredBorderColor;
      }
    }

    #showErrorMessage(onOff) {
      if (onOff === false) {
        this.#DOM.errorMessage.classList.add('display-none');
        this.#DOM.errorMessage.classList.remove('display-block');
      } else {
        this.#DOM.errorMessage.classList.add('display-block');
        this.#DOM.errorMessage.classList.remove('display-none');
      }
    }

    #setTimeoutForSuccessMessage() {
      setTimeout(() => {
        this.#DOM.successMessage.classList.add('display-none');
        this.#DOM.successMessage.classList.remove('display-block');
      }, 3000);
    }
  }

  customElements.define('contact-form', ContactForm);
})();
