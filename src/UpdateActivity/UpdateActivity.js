import React from "react";
import { Formik, Field, Form } from "formik";
import initialValues from "./InitialValues/InitialValues";
import validation from "./Validation/Validation";
import { copyArray } from "../Utilities/Utilities";

const UpdateActivity = (props) => {
  const isIdExisting = (id, activities) => {
    const idFound = activities.filter((item) => item.id === id);
    return idFound.length ? true : false;
  };

  const updateActivity = (activities, updatedActivity) => {
    for (let i = 0; i !== activities.length; ++i) {
      if (activities[i].id === updatedActivity.id)
        activities[i] = updatedActivity;
    }
  };

  const handleSubmit = (values) => {
    if (isIdExisting(values.id, props.activities)) {
      console.log("it exists");
      const activitiesCopy = copyArray(props.activities);
      updateActivity(activitiesCopy, values);
      props.setActivities(activitiesCopy);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {(values) => (
        <Form>
          <div>
            <label htmlFor="id">Id</label>
            <Field type="text" id="id" name="id" placeholder="Id" />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" placeholder="Name" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <Field type="checkbox" id="status" name="status" />
          </div>
          <input type="submit" value="Update" />
        </Form>
      )}
    </Formik>
  );
};

export default UpdateActivity;
