import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import TableActivities from "./TableActivities/TableActivities";
import AddActivity from "./AddActivity/AddActivity";
import "./App.css";
import { useState } from "react";
import UpdateActivity from "./UpdateActivity/UpdateActivity";
import DeleteActivity from "./DeleteActivity/DeleteActivity";

function App() {
  const [activities, setActivities] = useState([
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
  ]);
  return (
    <BrowserRouter>
      <TableActivities activities={activities} setActivities={setActivities} />
      <div className="buttons-panel">
        <Link to="/add-activity">
          <input
            data-testid="insert-button-app"
            type="button"
            value="Insert activity"
          />
        </Link>
        <Link to="/update-activity">
          <input
            type="button"
            value="Update activity"
            data-testid="update-button-app"
          />
        </Link>
        <Link to="/delete-activity">
          <input
            data-testid="delete-button-app"
            type="button"
            value="Delete activity"
          />
        </Link>
      </div>
      <Switch>
        <Route
          exact
          path="/add-activity"
          render={() => (
            <AddActivity
              activities={activities}
              setActivities={setActivities}
            />
          )}
        />
        <Route
          exact
          path="/update-activity"
          render={() => (
            <UpdateActivity
              activities={activities}
              setActivities={setActivities}
            />
          )}
        />
        <Route
          exact
          path="/delete-activity"
          render={() => (
            <DeleteActivity
              activities={activities}
              setActivities={setActivities}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
