import { 
  ITEM_POST_SUCCESS, 
  ITEM_POST_FAIL,
  SET_ITEMS,
  SET_ITEMS_FAIL,
  ITEM_UPDATE_QUANT,
  ITEM_UPDATE_FAIL
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
        items: [...state.items, payload],
        posted: true
      };
    case SET_ITEMS:
      return {
        ...state,
        items: payload.items,
        slots: payload.slots
      }
    case ITEM_UPDATE_QUANT: 
      return {
        ...state,
        items: state.items.map(item => {
          if(item._id === payload.itemId) {
            return {...item, quantity: payload.quantity}
          }
          return item;
        })
      }
    default:
      return state;
  }
}