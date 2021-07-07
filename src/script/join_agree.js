document.addEventListener('DOMContentLoaded', () => {
    const $selectAll = document.querySelector('#select-all');

    const getAllCheckboxes = () => {
        return [...document.querySelectorAll('.agree__items input')];
    }

    const checkAgreeClosure = () => {
        const $checkboxes = getAllCheckboxes();
        const $nextButton = document.querySelector('#next-button');

        return () => {
            const $unchecked = $checkboxes.filter($checkbox => !$checkbox.checked);

            $selectAll.checked = $unchecked.length === 0;

            if($unchecked.length > 0) {
                const $needCheckbox = $unchecked.find($checkbox => !$checkbox.classList.contains('optional'));
                if ($needCheckbox) {
                    $nextButton.classList.remove('active');
                    $nextButton.setAttribute('disabled', 'disabled');
                    return;
                }  
            } 

            $nextButton.classList.add('active');
            $nextButton.removeAttribute('disabled');
        }
    }

    const checkAgree = checkAgreeClosure();

    const toggleClosure = () => {
        const $checkboxes = getAllCheckboxes();
        
        return () => {
            $checkboxes.forEach($checkbox => {
                $checkbox.checked = $selectAll.checked;
            })
            checkAgree();
        }
    }

    $selectAll.addEventListener('change', toggleClosure());
    document.querySelector('.agree__items').addEventListener('change', checkAgree);
});