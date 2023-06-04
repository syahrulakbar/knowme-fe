const initialState = {
  token: "",
  account: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
export default globalReducer;
