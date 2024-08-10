'use strict';

// Select the Contact Form...
const demoContactForm = document.querySelector('contact-form.demo');
// ... and set the attribute(s) with the "setAttribute()" method.
demoContactForm.setAttribute('text-color', '#a61616');
demoContactForm.setAttribute('bg-color', 'transparent');
demoContactForm.setAttribute('btn-color', '#a61616');
demoContactForm.setAttribute('btn-text-color', '#ffffff');
demoContactForm.setAttribute('contact-subtitle', 'We are looking forward to your message.');
demoContactForm.setAttribute('container-padding', '0'); // no padding (default: 20px)
demoContactForm.setAttribute('icon-color', '#a61616');
demoContactForm.setAttribute('bg-color-icons', '#e3e3e3');
demoContactForm.setAttribute('bg-border', '0');
demoContactForm.setAttribute('bg-border-radius', '0');
// ... and so on...

// With subject field as input:select
const demoSubjectSelect = document.querySelector('.input-select');
// NOTE: whitespaces must be replaced with "%20"
const options = [
  { value: 'IT%20support', text: 'IT support' },
  { value: 'Customer%20invoices', text: 'Customer invoices' },
  { value: 'Hardware%20problem', text: 'Hardware problem' },
  { value: 'Software%20problem', text: 'Software problem' },
];
demoSubjectSelect.setOptions(options);

// Layout icons with subject field as input:select
const demoSubjectSelectIcon = document.querySelector('.input-select-icon');
const optionsIcon = [
  { value: 'IT%20support', text: 'IT support' },
  { value: 'Customer%20invoices', text: 'Customer invoices' },
  { value: 'Hardware%20problem', text: 'Hardware problem' },
  { value: 'Software%20problem', text: 'Software problem' },
];
demoSubjectSelectIcon.setOptions(optionsIcon);

// If the value of the `select`-tag is required outside, it can be read as follows:
console.log(demoSubjectSelectIcon.selectSubject.value);

// Or set:
// demoSubjectSelectIcon.selectSubject.value = 'Hardware%20problem';
