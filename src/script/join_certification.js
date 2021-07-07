document.addEventListener('DOMContentLoaded', () => {
    const valids = new Map();
    
    const addValidate(regExp, match, message, $target, $message) {
        if (!valids.get($target)) {
            valids.set($target, []);
        }

        valids.get($target).push({ regExp, match, message, $message })
    }
    
    const $phone = document.querySelector('#phone');
    

});