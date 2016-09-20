// import superagent from 'superagent';
import { addValidationErrorFromApi } from './ducks/form';


const API_FAIL_RESULT = {
  result: false,
  error: 'API requests fails 50% of time. You were unlucky.'
}

const VALIDATION_FAIL_RESULT = {
  result: false,
  field: 'name',
  error: 'INVALID_NAME: API validation failed on %SOME_RULE%'
}

const SUCCESS_RESULT = {
  result: true,
  data: {
    id: 1,
    name: 'Name of the Game!',
    title: 'Title'
  }
}

const processRequest = (params, resolve, reject) => {
  return () => {
    // 1. show API failed behavior
    const apiFail = Math.random() < 0.1;
    if (false && apiFail) return reject(API_FAIL_RESULT);

    // 2. Fail on server validation
    const validationFail = Math.random() < 0.5;
    if (validationFail) return reject(VALIDATION_FAIL_RESULT);

    return resolve(SUCCESS_RESULT);
  }
}


// simulate async call to backend
const request = (params) => {
  return new Promise(
    (resolve, reject) => setTimeout(processRequest(params, resolve, reject), 700)
  );
}


export default function apiRequest(method, operation, types, dispatch, formData) {

  const EVENT_STARTED = types[0];
  const EVENT_SUCCESS = types[1];
  const EVENT_FAILED = types[2];

  dispatch({ type: EVENT_STARTED, params: formData });

  request()
    .then(result => {
      console.log('response data:', result.data);
      dispatch({ type: EVENT_SUCCESS, result })
    })
    .catch(result => {
      console.error('api error:', result.error);
      dispatch({ type: EVENT_FAILED, errors: [result.error] })
      if (result.field) {
        dispatch(addValidationErrorFromApi(result.field, result.error));
      }
    });

  //////////// example usage of api with superagent ////////////
  //
  // const request = superagent[method](url).withCredentials();
  // request.accept('application/json');
  // if (formData) {
  //   const params = someFormDataPreparation(formData);
  //   request.type('form').send(params);
  // }
  // request.end((err, res) => {
  //   if (err) {
  //     dispatch({ type: NOTIFICATION, errText: 'Something went wrong!')); // В данный момент сервер недоступен
  //     dispatch({ type: EVENT_FAILED, errText: err.text, error });
  //   } else {
  //     const response = someApiResponseParsing(res);
  //     if (someCheckForResponseSuccess(response)) {
  //       dispatch({ type: EVENT_SUCCESS, result: response });
  //     } else {
  //       dispatch({ type: EVENT_FAILED, errors: [error], response });
  //     }
  //   }
  // });
}
