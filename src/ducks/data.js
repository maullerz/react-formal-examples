import apiRequest from '../api';

const ITEM_GET = 'ITEM_GET';
const ITEM_GET_SUCCESS = 'ITEM_GET_SUCCESS';
const ITEM_GET_FAILURE = 'ITEM_GET_FAILURE';


export function getItemData(id) {
  const params = id ? { id } : null;
  return dispatch => apiRequest('get', 'items/get',
    [ITEM_GET, ITEM_GET_SUCCESS, ITEM_GET_FAILURE], dispatch,
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

    default:
      return state;
  }
}

