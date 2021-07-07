import { debouncer, validator } from './common.js'

document.addEventListener('DOMContentLoaded', () => {
  const { addValidate, checkValid } = validator();
  
  const $phone = document.querySelector('#phone');
  const $message = $phone.parentElement.parentElement.children[2];
  addValidate('000-000', true, '전화번호를 제대로 입력해주세요', $phone, $message);

  const debouncedValidator = debouncer(checkValid, 250);
  document.querySelector('.join-form').addEventListener('keyup', debouncedValidator);
});
