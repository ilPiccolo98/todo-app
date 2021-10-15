import * as actionTypes from "./actions";

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

const deleteActivity = (activities, id) => {
  let position = -1;
  for (let i = 0; i !== activities.length; ++i) {
    if (parseInt(id) === parseInt(activities[i].id)) {
      position = i;
    }
  }
  const copyActivities = activities.slice(0);
  copyActivities.splice(position, 1);
  return copyActivities;
};

const getIdNewActivity = (activities) => {
  return activities.length ? activities[activities.length - 1].id + 1 : 1;
};

const addActivity = (activities, newActivity) => {
  const copyActivities = activities.slice(0);
  newActivity.id = getIdNewActivity(copyActivities);
  copyActivities.push(newActivity);
  return copyActivities;
};

const updateActivity = (activities, updatedActivity) => {
  const copyActivities = activities.slice(0);
  for (let i = 0; i !== copyActivities.length; ++i) {
    if (parseInt(copyActivities[i].id) === parseInt(updatedActivity.id)) {
      copyActivities[i] = updatedActivity;
    }
  }
  return copyActivities;
};

const activitiesReducer = (activities = initialActivities, action) => {
  switch (action.type) {
    case actionTypes.DELETE:
      return deleteActivity(activities, action.id);
    case actionTypes.ADD:
      return addActivity(activities, action.newActivity);
    case actionTypes.UPDATE:
      return updateActivity(activities, action.updatedActivity);
    default:
      return activities;
  }
};

export default activitiesReducer;
