const skillState = {
  id: "",
  skill: [],
  skillById: {},
  isUpdate: false,
};

const skillReducer = (state = skillState, action) => {
  switch (action.type) {
    case "SET_SKILL":
      return {
        ...state,
        skill: action.payload,
      };
    case "UPDATE_SKILL":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_SKILL_ID":
      return {
        ...state,
        skillById: action.payload,
      };

    default:
      return state;
  }
};
export default skillReducer;
