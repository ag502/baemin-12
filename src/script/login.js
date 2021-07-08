const $idInput = document.querySelector('.id-input');
const $pwInput = document.querySelector('.pw-input');
const $submitBtn = document.querySelector('.login-btn');
const $idRequire = document.querySelector('.id-require');
const $pwRequire = document.querySelector('.pw-require');
const $undefined = document.querySelector('.id-undefined');

const checkValidate = () => {
  const [id, pw] = [$idInput.value, $pwInput.value];

  if (id.length === 0 || pw.length === 0) {
    return false;
  }
  return true;
};

const toggleRequireErrorMsg = (isShow) => {
  if (isShow) {
    $idRequire.style.display = 'block';
    $pwRequire.style.display = 'block';
  } else {
    $idRequire.style.display = 'none';
    $pwRequire.style.display = 'none';
  }
};

const toggleUndefinedErrorMsg = (isError) => {
  if (isError) {
    $undefined.style.display = 'block';
  } else {
    $undefined.style.display = 'none';
  }
};

$submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const canSubmit = checkValidate();
  toggleUndefinedErrorMsg(false);

  if (!canSubmit) {
    toggleRequireErrorMsg(true);
    return;
  }
  toggleRequireErrorMsg(false);

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: $idInput.value, password: $pwInput.value }),
  }).then((res) => {
    if (res.status === 401) {
      toggleRequireErrorMsg(false);
      toggleUndefinedErrorMsg(true);
      return;
    }
    window.location.replace('/');
  });
});

$idInput.addEventListener('change', (e) => {
  const canSubmit = checkValidate();
});
