import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./activitiesReducer";

const storeActivities = configureStore({
  reducer: {
    activities: activitiesReducer,
  },
});

export default storeActivities;
