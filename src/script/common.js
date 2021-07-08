const debouncer = (callback, delay) => {
  let timer = undefined;
  return (...params) => {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      timer = setTimeout(() => {
        resolve(callback(...params));
      }, delay);
    });
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

    const { valids } = map.get($input);
    if (valids) {
      if ($input.value.length === 0) {
        return null;
      }
      const invalid = getInvalid(valids, $input.value);

      invalid ? invalidHandler(invalid.message) : validHandler();
    } else {
      validHandler();
    }
  };

  const getInvalid = (valids, value) => {
    return valids.find(valid => {
      if (typeof valid.regExp === 'function') {
        return valid.regExp() !== valid.match;
      }
      const regExp = new RegExp(valid.regExp);
      return regExp.test(value) !== valid.match;
    });
  }

  const checkAll = () => {
    const results = [];
    map.forEach((mapValue, key) => results.push(getInvalid(mapValue.valids, key.value)));
    return results.every(result => !result);
  }
  return { addValidate, checkValid, checkAll };
};
export { debouncer, validator };
