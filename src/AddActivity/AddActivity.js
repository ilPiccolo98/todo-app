import { React, useState } from "react";
import { copyArray } from "../Utilities/Utilities";

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

  const generateNewActivityId = (activities) => {
    return activities[props.activities.length - 1].id + 1;
  };

  const addNewActivity = (activities, newActivity) => {
    activities.push(newActivity);
  };

  const createNewActivity = (id, name, description, status) => {
    return {
      id,
      name,
      description,
      status,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length !== 0 && description.length !== 0) {
      const newId = generateNewActivityId(props.activities);
      const activitiesCopy = copyArray(props.activities);
      addNewActivity(
        activitiesCopy,
        createNewActivity(newId, name, description, status)
      );
      props.setActivities(activitiesCopy);
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

export default AddActivity;
