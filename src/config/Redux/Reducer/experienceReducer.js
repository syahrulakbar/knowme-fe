const experienceState = {
  id: "",
  experience: [],
  experienceById: {},
  isUpdate: false,
};

const experienceReducer = (state = experienceState, action) => {
  switch (action.type) {
    case "SET_EXPERIENCE":
      return {
        ...state,
        experience: action.payload,
      };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_EXPERIENCE_ID":
      return {
        ...state,
        experienceById: action.payload,
      };

    default:
      return state;
  }
};
export default experienceReducer;
