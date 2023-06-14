const projectState = {
  id: "",
  projectById: {},
};

const projectReducer = (state = projectState, action) => {
  switch (action.type) {
    case "UPDATE_PROJECT":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_PROJECT_ID":
      return {
        ...state,
        projectById: action.payload,
      };

    default:
      return state;
  }
};
export default projectReducer;
