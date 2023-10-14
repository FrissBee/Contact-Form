'use strict';
(() => {
  const template = document.createElement('template');

  template.innerHTML = /* html */ `
  <style>
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

    .section-contact-form {
      position: relative;
      width: 100%;
      padding: 20px;
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
      font-size: 1rem;
      font-weight: 400;
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

    .text-center {
      text-align: center;
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

    .error-message{
      color: red;
    }

    .invalid-mail{
      font-size: 12px;
      color: red;
      font-style: italic;
      background-color: #ffffff;
      padding: 4px;
      width: 200px;
      margin-top: 8px;
    }

    .display-block {
      display: block;
    }

    .display-none {
      display: none;
    }
  </style>

  <section class="section-contact-form border border-radius">
    <form method="post">
      <div class="text-center margin-bottom">
        <h2 part="h2-tag" class="contact-title"></h2>
      </div>
      <div class="text-center margin-bottom">
        <p part="p-tag" class="contact-subtitle"></p>
      </div>
      <div class="margin-bottom">
        <input part="input-tag" type="text" class="input-style border border-radius input-name" name="name" placeholder="" required />
      </div>
      <div class="margin-bottom">
        <input part="input-tag" type="email" class="input-style border border-radius input-email" name="email" placeholder="" required />
        <div class="invalid-mail border-radius display-none">
        </div>
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
      <div class="text-center">
        <button part="button-tag" type="submit" class="border border-radius btn-submit"></button>
      </div>
    </form>
  </section>
  `;

  class ContactForm extends HTMLElement {
    // #mailPath => Change the relative path to "contact-form.php" here if necessary:
    #mailPath = './inc/contact-form.php';
    // #defaultSettings => Change the default values here if desired:
    #defaultSettings = {
      bgColor: '#f7f7f7',
      textColor: '#262626',
      title: 'Contact',
      subtitle: '',
      namePlaceholder: 'Your name',
      mailPlaceholder: 'Your eMail',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your message',
      btnColor: '#d6d6d6',
      btnText: 'Send',
      btnTextColor: '#262626',
      successMessage: 'Thank you! Your message has been sent.',
      errorMessage: 'Something went wrong. The mail could not be sent.',
      mailSignature: 'A message from ' + document.location.host,
      invalidMail: 'Invalid mail address',
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

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(template.content.cloneNode(true));
      this.#selectDomElements();
      this.#setDefaultSettings();
    }

    static get observedAttributes() {
      return [
        'mail-path',
        'bg-color',
        'text-color',
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
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'mail-path') this.#mailPath = newValue;
      else if (name === 'bg-color') this.#DOM.sectionContactForm.style.backgroundColor = newValue;
      else if (name === 'text-color') this.#DOM.title.style.color = this.#DOM.subtitle.style.color = newValue;
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
    }

    connectedCallback() {
      this.#DOM.inputName.addEventListener('input', (e) => (this.#INPUTS.name = e.currentTarget.value));
      this.#DOM.inputEmail.addEventListener('input', (e) => (this.#INPUTS.mail = e.currentTarget.value));
      this.#DOM.inputSubject.addEventListener('input', (e) => (this.#INPUTS.subject = e.currentTarget.value));
      this.#DOM.inputMessage.addEventListener('input', (e) => (this.#INPUTS.message = e.currentTarget.value));
      this.#DOM.btnSubmit.addEventListener('click', (e) => this.#onSendButton(e));
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
    }

    #setDefaultSettings() {
      this.#DOM.sectionContactForm.style.backgroundColor = this.#defaultSettings.bgColor;
      this.#DOM.title.style.color = this.#defaultSettings.textColor;
      this.#DOM.subtitle.style.color = this.#defaultSettings.textColor;
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
