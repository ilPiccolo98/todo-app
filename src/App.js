import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import TableActivities from "./TableActivities/TableActivities";
import AddActivity from "./AddActivity/AddActivity";
import "./App.css";
import UpdateActivity from "./UpdateActivity/UpdateActivity";
import DeleteActivity from "./DeleteActivity/DeleteActivity";

function App() {
  return (
    <BrowserRouter>
      <TableActivities />
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
        <Route exact path="/add-activity" render={() => <AddActivity />} />
        <Route
          exact
          path="/update-activity"
          render={() => <UpdateActivity />}
        />
        <Route
          exact
          path="/delete-activity"
          render={() => <DeleteActivity />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
