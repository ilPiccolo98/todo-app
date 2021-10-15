import { React, useState } from "react";
import { connect } from "react-redux";
import { ADD } from "../store/actions";

const AddActivity = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleChangeNameField = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleChangeDescriptionField = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleChangeStatusCheckbox = (e) => {
    setStatus(e.target.checked);
  };

  const createNewActivity = (name, description, status) => {
    return {
      name,
      description,
      status,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length !== 0 && description.length !== 0) {
      props.addNewActivity(createNewActivity(name, description, status));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label data-testid="name-label-add-activity" htmlFor="name">
          Name
        </label>
        <input
          data-testid="name-field-add-activity"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChangeNameField}
          value={name}
        />
      </div>
      <div>
        <label
          data-testid="description-label-add-activity"
          htmlFor="description"
        >
          Description
        </label>
        <input
          data-testid="description-field-add-activity"
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleChangeDescriptionField}
          value={description}
        />
      </div>
      <div>
        <label data-testid="status-label-add-activity" htmlFor="status">
          Status
        </label>
        <input
          data-testid="status-checkbox-add-activity"
          type="checkbox"
          id="status"
          name="status"
          onChange={handleChangeStatusCheckbox}
          checked={status}
        />
      </div>
      <div>
        <input
          data-testid="insert-button-add-activity"
          type="submit"
          id="submit"
          name="submit"
          value="Insert"
        />
      </div>
    </form>
  );
};

const mapStateToProps = (stateActivities) => {
  return {
    activities: stateActivities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewActivity: (newActivity) => dispatch({ type: ADD, newActivity }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity);
