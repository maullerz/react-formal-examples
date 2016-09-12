const CLEAR_VALIDATION_ERRORS = 'CLEAR_VALIDATION_ERRORS';
const SET_VALIDATION_ERRORS = 'SET_VALIDATION_ERRORS';
const ADD_VALIDATION_ERROR_FROM_API = 'ADD_VALIDATION_ERROR_FROM_API';


export function clearValidationErrors() {
  return {
    type: CLEAR_VALIDATION_ERRORS,
  };
}

export function setValidationErrors(value) {
  return {
    type: SET_VALIDATION_ERRORS,
    errors: value,
  };
}

export function addValidationErrorFromApi(field, msg) {
  return {
    type: ADD_VALIDATION_ERROR_FROM_API,
    errField: field,
    errMsg: msg,
  };
}


const initialState = {
  errors: null,
};


function castValidationErrors(formalErrors) {
  const errObj = {};

  if (formalErrors.name === 'ValidationError') {
    formalErrors.inner.forEach(err => {
      errObj[err.path] = err.message;
    });
  } else {
    Object.keys(formalErrors).forEach(key => {
      errObj[key] = formalErrors[key][0].message;
    });
  }

  return errObj;
}

function addValErrorFromApi(errors, action) {
  const result = Object.assign({}, errors);
  result[action.errField] = action.errMsg;
  return result;
}


export default function (state = initialState, action) {
  switch (action.type) {

    case CLEAR_VALIDATION_ERRORS:
      return {
        ...state,
        errors: null,
      };

    case SET_VALIDATION_ERRORS:
      return {
        ...state,
        errors: castValidationErrors(action.errors),
      };

    case ADD_VALIDATION_ERROR_FROM_API:
      return {
        ...state,
        errors: addValErrorFromApi(state.errors, action),
      };

    default:
      return state;
  }
}
