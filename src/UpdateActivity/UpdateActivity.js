import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActivity } from "../store/activitiesReducer";

const UpdateActivity = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  const isIdExisting = (id, activities) => {
    const idFound = activities.filter(
      (item) => parseInt(item.id) === parseInt(id)
    );
    return idFound.length ? true : false;
  };

  const handleChangeIdField = (e) => {
    e.preventDefault();
    setId(e.target.value);
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
    if (
      id.length !== 0 &&
      name.length !== 0 &&
      description.length !== 0 &&
      isIdExisting(id, activities)
    ) {
      dispatch(
        updateActivity({
          id,
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
        <label htmlFor="id">Id</label>
        <input
          type="text"
          pattern="[0-9]*"
          id="id"
          name="id"
          placeholder="Id"
          onChange={handleChangeIdField}
          data-testid="id-field-update-activity"
          value={id}
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChangeNameField}
          data-testid="name-field-update-activity"
          value={name}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleChangeDescriptionField}
          data-testid="description-field-update-activity"
          value={description}
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <input
          type="checkbox"
          id="status"
          name="status"
          onChange={handleChangeStatusCheckbox}
          data-testid="status-checkbox-update-activity"
          checked={status}
        />
      </div>
      <input
        type="submit"
        value="Update"
        data-testid="update-button-update-activity"
      />
    </form>
  );
};

export default UpdateActivity;
