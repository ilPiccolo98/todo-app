import { configureStore } from "@reduxjs/toolkit";
import activitiesSlice from "./activitiesSlice";

const storeActivities = configureStore({
  reducer: {
    activities: activitiesSlice,
  },
});

export default storeActivities;
