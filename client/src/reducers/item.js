import { 
  ITEM_POST_SUCCESS, 
  SET_ITEMS,
  ITEM_UPDATE_QUANT,
  ITEM_DELETED
} from '../actions/types';
import { addIndex, map, update } from 'ramda'
const mapIndexed = addIndex(map);

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
        slots: mapIndexed((item, index) => {
          if(payload.slot.row !== index) return item;
          return update(payload.slot.column, payload, item);
        })(state.slots),
        posted: true
      };
    case SET_ITEMS:
      return {
        ...state,
        items: payload.items,
        loading: false,
        slots: payload.slots
      }
    case ITEM_UPDATE_QUANT: 
      return {
        ...state,
        slots: map(row => {
          const a = map(item => {
            if(item && item._id === payload.itemId) return {...item, quantity: payload.quantity}
            return item;
          })(row);
          return a;
        })(state.slots)
      };
    case ITEM_DELETED:
      return {
        ...state,
        slots: map(row => {
          const a = map(item => {
            if(item && item._id === payload.itemId) return null;
            return item;
          })(row);
          return a;
        })(state.slots)
      }
    default:
      return state;
  }
}