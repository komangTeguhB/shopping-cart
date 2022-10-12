import { ActionType, GlobalStateInterface } from './types';

const initialState = {
  interactions: [],
  carts: [],
}

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
  switch (action.type) {
    case "SET_INTERACTIONS":
      return {
        ...state,
        interactions: action.value,
      };
    case "SET_CART":
      return {
        ...state,
        carts: action.value,
      };
    case "PURGE_STATE":
      return initialState;
    default:
      return state;
  }
};

export default Reducer;