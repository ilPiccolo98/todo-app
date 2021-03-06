import React from "react";
import { Formik, Form, Field } from "formik";
import {
  deleteActivity,
  activitiesSelector,
} from "../activities/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";

const DeleteActivity = () => {
  const dispatch = useDispatch();
  const activities = useSelector(activitiesSelector);

  const isIdExisting = (id, activities) => {
    const idFound = activities.filter((item) => {
      return parseInt(item.id) === parseInt(id);
    });
    return idFound.length !== 0;
  };

  const handleSubmit = (values) => {
    if (isIdExisting(values.id, activities)) {
      dispatch(deleteActivity(values.id));
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
