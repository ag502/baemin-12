const debouncer = (callback, delay) => {
  let timer = undefined;
  
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    
    timer = setTimeout(callback, delay, ...params);
  }
}

const validator = () => {
  const map = new Map();

  const addValidate = (regExp, match, message, $target, $message) => {
    if (!map.get($target)) {
      map.set($target, { $message, valids: [] });
    }
    
    map.get($target).valids.push({ regExp, match, message });
  };
  
  const checkValid = ({target}) => {
    const $input = target.closest('.input-field > input')
    if (!map.has($input)) return;

    const { $message, valids} = map.get($input);
    if (valids) {
      const value = $input.value;

      const invalid = valids.find(valid => {
        const regExp = new RegExp(valid.regExp);
        return regExp.test(value) !== valid.match;
      });

      if (invalid) {
        $message.textContent = invalid.message;
        $message.style.display = 'block';
      } else {
        $message.style.display = '';
      }
    }
  }

  return { addValidate, checkValid };
};

export { debouncer, validator };