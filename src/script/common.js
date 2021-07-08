const debouncer = (callback, delay) => {
  let timer = undefined;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = setTimeout(callback, delay, ...params);
  };
};
const validator = () => {
  const map = new Map();
  const addValidate = (regExp, match, message, $target) => {
    if (!map.get($target)) {
      map.set($target, { valids: [] });
    }
    map.get($target).valids.push({ regExp, match, message });
  };
  const checkValid = (e, validHandler, invalidHandler) => {
    const $input = e.target.closest('.input-field > input');
    if (!map.has($input)) {
      validHandler();
      return;
    }
    const { $message, valids } = map.get($input);
    if (valids) {
      const value = $input.value;
      if (value.length === 0) {
        // $message.style.display = '';
        validHandler();
        return;
      }
      const invalid = valids.find((valid) => {
        if (typeof valid.regExp === 'function') {
          return valid.regExp() !== valid.match;
        }
        const regExp = new RegExp(valid.regExp);
        return regExp.test(value) !== valid.match;
      });
      invalid ? invalidHandler(invalid.message) : validHandler();
    } else {
      validHandler();
    }
  };
  return { addValidate, checkValid };
};
export { debouncer, validator };
