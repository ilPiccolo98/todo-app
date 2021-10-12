import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import TableActivities from "./TableActivities/TableActivities";
import AddActivity from "./AddActivity/AddActivity";
import "./App.css";
import activitiesJson from "./Activities/Activities.json";
import { useState } from "react";
import UpdateActivity from "./UpdateActivity/UpdateActivity";
import DeleteActivity from "./DeleteActivity/DeleteActivity";

function App() {
  const [activities, setActivities] = useState(activitiesJson);
  return (
    <BrowserRouter>
      <TableActivities activities={activities} setActivities={setActivities} />
      <div className="buttons-panel">
        <Link to="/add-activity">
          <input type="button" value="Insert activity" />
        </Link>
        <Link to="/update-activity">
          <input type="button" value="Update activity" />
        </Link>
        <Link to="/delete-activity">
          <input type="button" value="Delete activity" />
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
