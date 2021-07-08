import { debouncer, validator } from './common.js'

document.addEventListener('DOMContentLoaded', () => {
  let isDuplicated = true;
  const $checkDuplicateButton = document.querySelector('#check-duplicate-button');
  const { addValidate, checkValid, checkAll } = validator();
  const debouncedValidator = debouncer(checkValid, 250);
  const debouncedCheckAll = debouncer(() => {
    const $next = document.querySelector('#next');
    if(checkAll()) {
      $next.removeAttribute('disabled');
    } else {
      $next.setAttribute('disabled', 'disabled');
    }
  }, 300)

  /* mail */
  const $mail = document.querySelector('#mail');
  addValidate(/[\w._%+-]+@[\w.-]+[.][a-z]{2,}$/, true, '메일 형식을 지켜주세요.', $mail);
  addValidate(() => {
    if (isDuplicated) {
      $checkDuplicateButton.style.color = 'var(--black)';
    } else {
      console.log($checkDuplicateButton)
      $checkDuplicateButton.style.color = 'var(--dark-grey)';
    }
    return isDuplicated;
  }, false, '중복 확인을 해주세요', $mail);

  const checkDuplicateMail = async () => {
    const response = await fetch(`/join/hasDuplicate?mail=${$mail.value}`);
    const result = await response.json();
    isDuplicated = result;
    const $message = document.querySelector('.input__mail + .error-msg');
    const $check = document.querySelector('.input__mail .fa-check');
    if (!isDuplicated) {
      $message.style.display = '';
      $check.style.color = 'var(--primary)';
    } else {
      $message.textContent = '중복된 이름입니다.';
      $message.style.display = 'block';
      $check.style.color = 'var(--dark-grey)';
    }
  }

  /* nickname */
  const $nickname = document.querySelector('#nickname');
  addValidate(/\w{2}/, true, '별명은 최소 2글자 이상입니다', $nickname);

  /* password */
  const $password = document.querySelector('#password');
  addValidate(/\w.{8}/, true, '비밀번호는 8글자 이상 입력해주세요', $password)
  addValidate(/(?=.*\d)(?=.*[a-z])/, true, '비밀번호는 영어 소문자, 숫자를 포함해주세요', $password);

  /* birthday */
  const checkMonthAndDay = ($birthday) => {
    const [ _, month, day ] = ($birthday.value.split('.').map(Number));
    // 2월 31일 같은 문제가 발생할 수 있음. 
    return (month >= 1 && month <= 12) && (day >= 1 || day <= 31);
  }
  const $birthday = document.querySelector('#birthday');
  addValidate(/^\d{4}[.]\d{2}[.]\d{2}$/, true, '2021.07.05 형식으로 입력해주세요', $birthday);
  addValidate(() => checkMonthAndDay($birthday), true, '날짜 형식이 잘못되었습니다.', $birthday);

  const $joinForm = document.querySelector('.join-form');

  $mail.addEventListener('input', (e) => {
    isDuplicated = true;
  })
    
  $joinForm.addEventListener('input', (e) => {
    const $remove = e.target.closest('.input-field').querySelector('.fa-times-circle');
    const $message = e.target.closest('.input-wrapper').querySelector('.error-msg');
    const $check = e.target.closest('.input-wrapper').querySelector('.fa-check');
    const $input = e.target.closest('input');
    if ($input.value.length > 0) {
      $remove.style.display = 'block';
    } else {
      $remove.style.display = '';
    }

    const validHandler = () => {
      $message.style.display = '';
      $check.style.color = 'var(--primary)';
    }

    const invalidHandler = (message) => {
      $message.textContent = message;
      $message.style.display = 'block';
      $check.style.color = 'var(--dark-grey)';
    }

    debouncedValidator(e, validHandler, invalidHandler);
    debouncedCheckAll();
  });

  $joinForm.addEventListener('click', (e) => {
    const $button = e.target.closest('.input-field__overlap > button');
    if ($button) {
      $button.parentElement.previousElementSibling.value = '';
      e.target.closest('.input-wrapper').querySelector('.error-msg').style.display = '';
      e.target.closest('.input-wrapper').querySelector('.fa-check').style.color = 'var(--dark-grey)';
    }
  });

  $joinForm.addEventListener('focusin', (e) => {
    const $inputField = e.target.closest('.input-field');
    if (!$inputField) return;
    const $remove = $inputField.querySelector('button > i')
    if($remove) {
      $remove.style.display = 'block'
    }
  })

  $joinForm.addEventListener('focusout', (e) => {
    const $inputField = e.target.closest('.input-field');
    if (!$inputField) return;
    const $remove = $inputField.querySelector('button > i')
    if($remove) {
      $remove.style.display = '';
    }
  })

  $checkDuplicateButton.addEventListener('click', checkDuplicateMail);
});