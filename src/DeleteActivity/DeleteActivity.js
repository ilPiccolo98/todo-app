import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { DELETE } from "../store/actions";

const DeleteActivity = (props) => {
  const isIdExisting = (id, activities) => {
    const idFound = activities.filter((item) => {
      return parseInt(item.id) === parseInt(id);
    });
    return idFound.length ? true : false;
  };

  const handleSubmit = (values) => {
    if (isIdExisting(values.id, props.activities)) {
      props.deleteActivity(values.id);
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

const mapStateToProps = (stateActivities) => {
  return {
    activities: stateActivities.slice(0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteActivity: (id) => dispatch({ type: DELETE, id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteActivity);
