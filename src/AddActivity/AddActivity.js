import { Formik, Form, Field } from "formik";
import { React } from "react";
import initialValues from "./InitialValues/InitialValues";
import validation from "./Validation/Validation";
import { copyArray } from "../Utilities/Utilities";

const AddActivity = (props) => {
  const generateNewActivityId = (activities) => {
    return props.activities[props.activities.length - 1].id + 1;
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

  const handleSubmit = (values) => {
    const newId = generateNewActivityId(props.activities);
    const activitiesCopy = copyArray(props.activities);
    addNewActivity(
      activitiesCopy,
      createNewActivity(newId, values.name, values.description, values.status)
    );
    props.setActivities(activitiesCopy);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" placeholder="Name" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <Field type="checkbox" id="status" name="status" />
          </div>
          <div>
            <input type="submit" id="submit" name="submit" value="Insert" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddActivity;
