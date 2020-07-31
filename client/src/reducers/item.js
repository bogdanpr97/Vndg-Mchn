import { 
  ITEM_POST_SUCCESS, 
  ITEM_POST_FAIL,
  SET_ITEMS,
  SET_ITEMS_FAIL,
} from '../actions/types';

const initialState = {
  posted: false,
  loading: true,
  items: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ITEM_POST_SUCCESS:
      return  {
        ...state,
        posted: true
      };
    case SET_ITEMS:
      return {
        ...state,
        items: payload.items,
        slots: payload.slots
      }
    default:
      return state;
  }
}