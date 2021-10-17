import { createSlice } from "@reduxjs/toolkit";

const initialActivities = [
  {
    id: 1,
    name: "shopping",
    description: "buy some stuff",
    status: false,
  },
  {
    id: 2,
    name: "have fun with my dog",
    description: "take my dog for a walk and have fun with it",
    status: true,
  },
  {
    id: 3,
    name: "work out",
    description: "work out a little bit with weights and barbells",
    status: false,
  },
];

const getIdNewActivity = (activities) => {
  return activities.length ? activities[activities.length - 1].id + 1 : 1;
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState: initialActivities,
  reducers: {
    addActivity: (state, action) => {
      action.payload.id = getIdNewActivity(state);
      state.push(action.payload);
    },

    deleteActivity: (state, action) => {
      let position = -1;
      for (let i = 0; i !== state.length; ++i) {
        if (parseInt(action.payload) === parseInt(state[i].id)) {
          position = i;
        }
      }
      state.splice(position, 1);
    },

    updateActivity: (state, action) => {
      for (let i = 0; i !== state.length; ++i) {
        if (parseInt(state[i].id) === parseInt(action.payload.id)) {
          state[i] = action.payload;
        }
      }
    },
  },
});

export const { addActivity, updateActivity, deleteActivity } =
  activitiesSlice.actions;
export default activitiesSlice.reducer;
