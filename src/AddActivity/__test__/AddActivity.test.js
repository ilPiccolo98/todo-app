/* eslint-disable import/first */
import React from "react";
import initialActivities from "../../activities/initialActivities";
jest.mock("../../activities/initialActivities.js", () => {
  return jest.fn();
});
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import AddActivity from "../AddActivity";
import activitiesStore from "../../activities/activitiesStore";
import * as actions from "../../activities/activitiesReducer";

const renderAddActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <AddActivity />
    </Provider>
  );
};

const getAddTaskFormFields = (component) => {
  const nameFieldAddActivity = component.getByTestId("name-field-add-activity");
  const descriptionFieldAddActivity = component.getByTestId(
    "description-field-add-activity"
  );
  const statusCheckboxAddActivity = component.getByTestId(
    "status-checkbox-add-activity"
  );
  const insertButtonAddActivity = component.getByTestId(
    "insert-button-add-activity"
  );

  return {
    nameFieldAddActivity,
    descriptionFieldAddActivity,
    statusCheckboxAddActivity,
    insertButtonAddActivity,
  };
};

describe("testing AddActivity Component", () => {
  beforeEach(() => {
    initialActivities.mockReset().mockReturnValue([]);
  });
  it("should not add an activity with name field blank", () => {
    const component = renderAddActivity();
    const {
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
    const addActivitySpy = jest.spyOn(actions, "addActivity");
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    expect(addActivitySpy).not.toHaveBeenCalled();
  });

  it("should add the first activity with { id=1, name=activity, description=activity, status=true }", () => {
    const component = renderAddActivity();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
    const addActivitySpy = jest.spyOn(actions, "addActivity");
    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "activity",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    expect(addActivitySpy).toHaveBeenCalledWith({
      id: 1,
      name: "activity",
      description: "activity",
      status: true,
    });
  });

  it("should add the second activity with { id=2, name=activity2, description=activity2 }", () => {
    const component = renderAddActivity();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
    const addActivitySpy = jest.spyOn(actions, "addActivity");
    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "activity2",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity2",
      },
    });
    fireEvent.click(insertButtonAddActivity);
    expect(addActivitySpy).toHaveBeenCalledWith({
      id: 2,
      name: "activity2",
      description: "activity2",
      status: true,
    });
  });
});
