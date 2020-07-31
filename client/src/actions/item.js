import { 
  ITEM_POST_SUCCESS, 
  ITEM_POST_FAIL, 
  SET_ITEMS, 
  SET_ITEMS_FAIL 
} from "./types";
import { setAlert } from "./alert";
import api from "../utils/api";
import axios from "axios";
import { arrayBufferToBase64 } from '../utils/utils';
import { SLOTS_WIDTH, SLOTS_HEIGHT } from '../contants';


// get items

export const getItems = () => async dispath => {
  try {
    const res = await api.get('/items');
    const base64Flag = 'data:image/jpeg;base64,';

    const decodedItems = res.data.data.map(item => {
      const imageStr = arrayBufferToBase64(item.image.data.data);
      item.image = base64Flag + imageStr;
      return item;
    });
    const slotsMatrix = Array(SLOTS_HEIGHT).fill(null).map(()=>Array(SLOTS_WIDTH).fill(null));
    console.log(slotsMatrix)

    decodedItems.forEach(element => {
      // busy slot
      console.log(element.slot.row, element.slot.column);
      slotsMatrix[element.slot.row][element.slot.column] = 1;
    });

    dispath({ 
      type: SET_ITEMS,
      payload: { items: decodedItems, slots: slotsMatrix }
    })
  } catch (err) {
    console.error(err);
  }
}

// post item
export const postItem = (item) => async (dispath) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post("/api/v1/items", item, config);
    dispath({ type: ITEM_POST_SUCCESS });
  } catch (err) {
    console.log(err);
  }
};
