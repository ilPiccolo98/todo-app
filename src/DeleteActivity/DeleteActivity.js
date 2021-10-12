import React, { useState } from "react";
import { copyArray } from "../Utilities/Utilities";

const DeleteActivity = (props) => {
  const [id, setId] = useState(1);

  const handleChangeIdField = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const isIdExisting = (id, activities) => {
    console.log(activities);
    const idFound = activities.filter((item) => {
      return parseInt(item.id) === parseInt(id);
    });
    return idFound.length ? true : false;
  };

  const getPositionActivity = (id, activities) => {
    for (let i = 0; i !== activities.length; ++i) {
      if (parseInt(activities[i].id) === parseInt(id)) {
        return i;
      }
    }
    return -1;
  };

  const deleteActivity = (activities, positionActivityToDelete) => {
    activities.splice(positionActivityToDelete, 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isIdExisting(id, props.activities)) {
      const activitiesCopy = copyArray(props.activities);
      const positionActivityToDelete = getPositionActivity(id, activitiesCopy);
      deleteActivity(activitiesCopy, positionActivityToDelete);
      props.setActivities(activitiesCopy);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">Id</label>
        <input
          data-testid="id-field-delete-activity"
          type="text"
          id="id"
          name="id"
          placeholder="Id"
          onChange={handleChangeIdField}
        />
      </div>
      <input
        data-testid="delete-button-delete-activity"
        type="submit"
        value="Delete"
      />
    </form>
  );
};

export default DeleteActivity;
