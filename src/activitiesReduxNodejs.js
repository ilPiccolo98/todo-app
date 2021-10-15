const redux = require("redux");

// initial activities
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

// Reducer
const rootReducer = (activities = initialActivities, action) => {
  const copyActivities = activities.slice();
  if (action.type === "PUSH") {
    copyActivities.push(action.activity);
  } else if (action.type === "POP") {
    copyActivities.pop();
  }
  return copyActivities;
};

// Store
const store = redux.createStore(rootReducer);
console.log(store.getState());

//Subscription
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

// Dispatch
store.dispatch({
  type: "PUSH",
  activity: {
    id: 4,
    name: "name activity",
    description: "description activity",
    status: true,
  },
});

store.dispatch({
  type: "POP",
});

console.log("state", store.getState());
