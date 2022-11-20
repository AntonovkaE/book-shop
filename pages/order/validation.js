const stringChecking = new RegExp('\^[A-z]+$', '')
const flatNumberChecking = new RegExp('\^[1-9-0]+$', '')
const streetChecking  = new RegExp('[a-z1-9]', 'gi')
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage.length ? errorMessage : 'The field is invalid';
    errorElement.classList.add('form__input-error_active');
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }
};

const checkInputContent = (inputElement) => {
  if (inputElement.classList.contains('stringInput')) {
    return stringChecking.test(inputElement.value)
  } else if (inputElement.classList.contains('stringAndNumbersInput')) {
    return streetChecking.test(inputElement.value)
  } else if (inputElement.classList.contains('flatNumberInput')) {
    if (inputElement.value[0] === '0' || inputElement.value[0] === '-') {
      return  false
    }
    return flatNumberChecking.test(inputElement.value)
  }
  return true
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid || !checkInputContent(inputElement)) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const ButtonElement = formElement.querySelector('.form__submit')
  toggleButtonState(inputList, ButtonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, ButtonElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit_inactive');
    buttonElement.disabled = false;
  }
};
enableValidation();
