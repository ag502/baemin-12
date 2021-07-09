document.addEventListener('DOMContentLoaded', () => {
  let isNumberValid = false;

  const creatRandNumber = () => {
    return Math.floor(Math.random() * (10000 - 1000)) + 1000;
  };

  const buttonToggle = ($target, isActivated) => {
    if (isActivated) {
      $target.classList.remove('text-grey');
      $target.classList.add('text-primary');
    } else {
      $target.classList.remove('text-primary');
      $target.classList.add('text-grey');
    }
  };

  const $randNumInput = document.querySelector('#certification');
  const $phoneNumInput = document.querySelector('#phone');
  const $reqNumberBtn = document.querySelector('#request-number');
  const $reReqNumberBtn = document.querySelector('#re-request');
  const $nextPageBtn = document.querySelector('#next');
  const $timer = document.querySelector('#timer');

  let validTimer = null;
  let validSetTimer = null;

  const renderTime = () => {
    let time = 5;

    validTimer = setInterval(() => {
      const min = parseInt(time / 60);
      const sec = time % 60;

      $timer.innerText = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
      time--;

      if (time < 0) {
        $nextPageBtn.removeAttribute('href');
        buttonToggle($nextPageBtn, false);
        clearInterval(validTimer);
      }
    }, 1000);

    isNumberValid = true;
    $randNumInput.value = creatRandNumber();
    $nextPageBtn.setAttribute('href', '/join/userinfo');
    buttonToggle($nextPageBtn, true);
  };

  $reqNumberBtn.addEventListener('click', (e) => {
    if ($phoneNumInput.value.length === 13) {
      $reqNumberBtn.disabled = true;

      if (validSetTimer || validTimer) {
        clearTimeout(validSetTimer);
        clearInterval(validTimer);
      }
      validSetTimer = setTimeout(() => {
        renderTime();
        $reqNumberBtn.style.display = 'none';
        $reReqNumberBtn.style.display = 'inline';
      }, 2000);
    }
  });

  $reReqNumberBtn.addEventListener('click', (e) => {
    if ($phoneNumInput.value.length === 13) {
      $reReqNumberBtn.disabled = true;
      buttonToggle($reReqNumberBtn, false);

      $nextPageBtn.removeAttribute('href');
      buttonToggle($nextPageBtn, false);
      $timer.innerText = '';

      if (validSetTimer || validTimer) {
        clearTimeout(validSetTimer);
        clearInterval(validTimer);
      }

      validSetTimer = setTimeout(() => {
        renderTime();
        $reReqNumberBtn.disabled = false;
        buttonToggle($reReqNumberBtn, true);
      }, 2000);
    }
  });
});
