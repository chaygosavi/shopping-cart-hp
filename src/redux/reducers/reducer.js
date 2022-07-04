const INIT_STATE = {
  cart: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const itemIdx = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIdx >= 0) state.cart[itemIdx].qnty += 1;
      else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          cart: [...state.cart, temp],
        };
      }

    case "DELETE_CART":
      const data = state.cart.filter((ele) => ele.id !== action.payload);
      return {
        ...state,
        cart: data,
      };

    case "REMOVE_ITEM":
      const idx = state.cart.findIndex((item) => item.id === action.payload.id);
      if (state.cart[idx].qnty >= 1) {
        const deleteItem = (state.cart[idx].qnty -= 1);
        return {
          ...state,
          cart: [...state.cart],
        };
      }
      if (state.cart[idx].qnty === 1) {
        const data = state.cart.filter((ele) => ele.id !== action.payload.id);
        return {
          ...state,
          cart: data,
        };
      }

    default:
      return state;
  }
};
