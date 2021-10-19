import { createSlice } from "@reduxjs/toolkit";
import getInitialActivities from "./initialActivities";

const activitiesSlice = createSlice({
  name: "activities",
  initialState: getInitialActivities(),
  reducers: {
    addActivity: (state, action) => {
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

export const activitiesSelector = (state) => state.activities;

export default activitiesSlice.reducer;
