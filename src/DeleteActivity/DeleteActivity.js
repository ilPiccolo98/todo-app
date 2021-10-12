import React from "react";
import { Formik, Field, Form } from "formik";
import initialValues from "./InitialValues/InitialValues";
import validation from "./Validation/Validation";
import { copyArray } from "../Utilities/Utilities";

const DeleteActivity = (props) => {
  const isIdExisting = (id, activities) => {
    const idFound = activities.filter((item) => {
      return item.id === id;
    });
    return idFound.length ? true : false;
  };

  const getPositionActivity = (id, activities) => {
    for (let i = 0; i !== activities.length; ++i) {
      if (activities[i].id === id) return i;
    }
    return -1;
  };

  const deleteActivity = (activities, positionActivityToDelete) => {
    activities.splice(positionActivityToDelete, 1);
  };

  const handleSubmit = (values) => {
    if (isIdExisting(values.id, props.activities)) {
      const activitiesCopy = copyArray(props.activities);
      const positionActivityToDelete = getPositionActivity(
        values.id,
        activitiesCopy
      );
      deleteActivity(activitiesCopy, positionActivityToDelete);
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
          <input type="submit" value="Delete" />
        </Form>
      )}
    </Formik>
  );
};

export default DeleteActivity;
