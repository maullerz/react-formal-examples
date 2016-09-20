import apiRequest from '../api';

const ITEM_GET = 'ITEM_GET';
const ITEM_GET_SUCCESS = 'ITEM_GET_SUCCESS';
const ITEM_GET_FAILURE = 'ITEM_GET_FAILURE';

const ITEM_UPDATE = 'ITEM_UPDATE';
const ITEM_UPDATE_SUCCESS = 'ITEM_UPDATE_SUCCESS';
const ITEM_UPDATE_FAILURE = 'ITEM_UPDATE_FAILURE';


export function getItemData(id) {
  const params = id ? { id } : null;
  return dispatch => apiRequest('get', 'items/get',
    [ITEM_GET, ITEM_GET_SUCCESS, ITEM_GET_FAILURE], dispatch,
    params
  );
}

export function itemUpdate(id, data) {
  const params = { id, data };
  return dispatch => apiRequest('post', 'items/update',
    [ITEM_UPDATE, ITEM_UPDATE_SUCCESS, ITEM_UPDATE_FAILURE], dispatch,
    params
  );
}


const initialState = {
  item: {},
  itemLoading: true,
  itemLoaded: false,
  itemErrors: [],
};


export default function (state = initialState, action) {
  console.log('action:', action);
  switch (action.type) {

    case ITEM_GET:
      return {
        ...state,
        item: {},
        itemLoading: true,
        itemLoaded: false,
        itemErrors: [],
      };

    case ITEM_GET_SUCCESS:
      return {
        ...state,
        item: action.result.data,
        itemLoading: false,
        itemLoaded: true,
      };

    case ITEM_GET_FAILURE:
      return {
        ...state,
        item: {},
        itemLoading: false,
        itemLoaded: false,
        itemErrors: action.errors,
      };


    case ITEM_UPDATE:
      return {
        ...state,
        updateLoading: true,
        updateLoaded: false,
        updateErrors: [],
      };

    case ITEM_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateLoaded: true,
      };

    case ITEM_UPDATE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateLoaded: false,
        updateErrors: action.errors,
      };

    default:
      return state;
  }
}

