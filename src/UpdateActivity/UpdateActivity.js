import React, { useState } from "react";
import { copyArray } from "../Utilities/Utilities";

const UpdateActivity = (props) => {
  const [id, setId] = useState("1");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const isIdExisting = (id, activities) => {
    const idFound = activities.filter(
      (item) => parseInt(item.id) === parseInt(id)
    );
    return idFound.length ? true : false;
  };

  const updateActivity = (activities, updatedActivity) => {
    for (let i = 0; i !== activities.length; ++i) {
      if (parseInt(activities[i].id) === parseInt(updatedActivity.id))
        activities[i] = updatedActivity;
    }
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
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      id.length !== 0 &&
      name.length !== 0 &&
      description.length !== 0 &&
      isIdExisting(id, props.activities)
    ) {
      console.log("it exists");
      const activitiesCopy = copyArray(props.activities);
      updateActivity(activitiesCopy, {
        id,
        name,
        description,
        status,
      });
      props.setActivities(activitiesCopy);
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
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <input
          type="checkbox"
          id="status"
          name="status"
          onChange={handleChangeStatusCheckbox}
        />
      </div>
      <input type="submit" value="Update" />
    </form>
  );
};

export default UpdateActivity;
