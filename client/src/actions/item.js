import { 
  ITEM_POST_SUCCESS, 
  SET_ITEMS, 
  ITEM_UPDATE_QUANT,
  ITEM_DELETED,
} from "./types";
import { setAlert } from "./alert";
import api from "../utils/api";
import axios from "axios";
import { arrayBufferToBase64 } from '../utils/utils';
import { SLOTS_WIDTH, SLOTS_HEIGHT } from '../contants';


function getDecodedImage(img) {
  const base64Flag = 'data:image/jpeg;base64,';
  const imageStr = arrayBufferToBase64(img);
  const image = base64Flag + imageStr;
  return image;
}

// get items

export const getItems = () => async dispatch => {
  try {
    const res = await api.get('/items');

    const decodedItems = res.data.data.map(item => {
      item.image = getDecodedImage(item.image.data.data);
      return item;
    });
    const slotsMatrix = Array(SLOTS_HEIGHT).fill(null).map(()=>Array(SLOTS_WIDTH).fill(null));

    decodedItems.forEach(element => {
      // busy slot
      slotsMatrix[element.slot.row][element.slot.column] = element;
    });

    dispatch({ 
      type: SET_ITEMS,
      payload: { items: decodedItems, slots: slotsMatrix }
    })
  } catch (err) {
    console.error(err);
  }
}

// post item
export const postItem = (item) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post("/api/v1/items", item, config);
    const decodedImage = getDecodedImage(res.data.data.image.data.data/*.data*/); // .data

    return dispatch({ 
      type: ITEM_POST_SUCCESS,
      payload: {...res.data.data, image: decodedImage }
     });
  } catch (err) {
    const errors = err.response && err.response.data.errors;

    if(errors) {
      errors.forEach(error => 
        dispatch(setAlert(error.msg, 'danger'))
      );
    }
  }
};

// add quantity

export const updateItemQuant = ({ itemId, quantity }) => async dispatch => {
  try {
    await api.put(`/items/${itemId}`, { quantity });
    dispatch({ 
      type: ITEM_UPDATE_QUANT,
      payload: { itemId, quantity }
    });
  } catch (err) {
    const errors = err.response && err.response.data.errors;
    if(errors) {
      errors.forEach(error => 
        dispatch(setAlert(error.msg, 'danger')))
    };
  }
}

export const deleteItem = ({ itemId }) => async dispatch => {
  try {
    await api.delete(`/items/${itemId}`);
    dispatch({
      type: ITEM_DELETED,
      payload: { itemId }
    })
  } catch (err) {
    const errors = err.response && err.response.data.errors;

    if(errors) {
      errors.forEach(error => 
        dispatch(setAlert(error.msc, 'danger')))
    };
  }
}
