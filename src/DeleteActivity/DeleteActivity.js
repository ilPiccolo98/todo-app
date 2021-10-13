import React from "react";
import { copyArray } from "../Utilities/Utilities";
import { Formik, Form, Field } from "formik";

const DeleteActivity = (props) => {
  const isIdExisting = (id, activities) => {
    const idFound = activities.filter((item) => {
      return parseInt(item.id) === parseInt(id);
    });
    return idFound.length ? true : false;
  };

  const deleteActivity = (activities, id) => {
    let position = -1;
    for (let i = 0; i !== activities.length; ++i) {
      if (parseInt(id) === parseInt(activities[i].id)) position = i;
    }
    activities.splice(position, 1);
  };

  const handleSubmit = (values) => {
    if (isIdExisting(values.id, props.activities)) {
      const activitiesCopy = copyArray(props.activities);
      deleteActivity(activitiesCopy, values.id);
      props.setActivities(activitiesCopy);
    }
  };

  return (
    <Formik initialValues={{ id: "" }} onSubmit={handleSubmit}>
      {(values) => (
        <Form>
          <div>
            <label htmlFor="id">Id</label>
            <Field
              data-testid="id-field-delete-activity"
              type="text"
              id="id"
              name="id"
              placeholder="Id"
              patterm="[0-9]*"
            />
          </div>
          <input
            data-testid="delete-button-delete-activity"
            type="submit"
            value="Delete"
          />
        </Form>
      )}
    </Formik>
  );
};

export default DeleteActivity;
