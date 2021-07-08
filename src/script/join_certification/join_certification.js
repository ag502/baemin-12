import { debouncer, validator } from '../common.js';

document.addEventListener('DOMContentLoaded', () => {
  const $phone = document.querySelector('#phone');
  const $message = document.querySelector('.error-msg');
  const $resetBtn = document.querySelector('#reset-btn');
  const $validCheck = document.querySelector('.fa-check');

  const { addValidate, checkValid } = validator();
  addValidate(/\d{3}-\d{4}-\d{4}/, true, '올바르지 않은 형식입니다.', $phone, $message);

  const validHandler = () => {
    $message.style.display = '';
    $validCheck.style.display = 'inline';
  };

  const invalidHandler = (message) => {
    $message.textContent = message;
    $message.style.display = 'block';
    $validCheck.style.display = 'none';
  };

  function phoneNumber(value) {
    value = value.replace(/[^0-9]/g, '');
    return value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
  }

  const debouncedValidator = debouncer(checkValid, 250);
  document.querySelector('.join-form').addEventListener('input', async (e) => {
    const $phoneInput = e.target.closest('#phone');
    if ($phoneInput) {
      const { value } = $phoneInput;
      if (value.length !== 0) {
        $resetBtn.style.display = 'inline';
      }
      $phoneInput.value = phoneNumber(value);
    }
    await debouncedValidator(e, validHandler, invalidHandler);
  });

  $resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $phoneNumInput.value = '';
    $resetBtn.style.display = 'none';
    $validCheck.style.display = 'none';
  });
});
