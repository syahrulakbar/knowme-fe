const experienceState = {
  id: "",
  certificateById: {},
};

const experienceReducer = (state = experienceState, action) => {
  switch (action.type) {
    case "UPDATE_CERTIFICATE":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_CERTIFICATE_ID":
      return {
        ...state,
        certificateById: action.payload,
      };

    default:
      return state;
  }
};
export default experienceReducer;
