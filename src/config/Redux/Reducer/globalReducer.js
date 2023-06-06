const initialState = {
  token: "",
  account: {},
  isUpdate: false,
  showModal: false,
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
    case "SET_UPDATE":
      return {
        ...state,
        isUpdate: action.payload,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
};
export default globalReducer;
