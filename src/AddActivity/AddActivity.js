import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActivity } from "../activities/activitiesReducer";

const AddActivity = (props) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const getIdNewActivity = (activities) => {
    return activities.length ? activities[activities.length - 1].id + 1 : 1;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length !== 0 && description.length !== 0) {
      dispatch(
        addActivity({
          id: getIdNewActivity(activities),
          name,
          description,
          status,
        })
      );
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
