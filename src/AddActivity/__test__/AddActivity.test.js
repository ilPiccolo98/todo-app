/* eslint-disable import/first */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import AddActivity from "../AddActivity";
import activitiesStore from "../../activities/activitiesStore";
import {
  activitiesSelector,
  addActivity,
} from "../../activities/activitiesSlice";

jest.mock("../../activities/activitiesSlice", () => {
  const original = jest.requireActual("../../activities/activitiesSlice");
  return {
    __esModule: true,
    ...original,
    activitiesSelector: jest.fn(),
    addActivity: jest.fn((payload) => {
      return {
        type: "activities/addActivity",
        payload,
      };
    }),
  };
});

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
    addActivity.mockReset().mockImplementation((payload) => {
      return {
        type: "activities/addActivity",
        payload,
      };
    });
  });
  it("should not add an activity with name field blank", () => {
    activitiesSelector.mockReset().mockReturnValue([]);
    const component = renderAddActivity();
    const {
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    expect(addActivity).not.toHaveBeenCalled();
  });

  it("should add the first activity with { id=1, name=activity, description=activity, status=true }", () => {
    activitiesSelector.mockReset().mockReturnValue([]);
    const component = renderAddActivity();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
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
    expect(addActivity).toHaveBeenCalledWith({
      id: 1,
      name: "activity",
      description: "activity",
      status: true,
    });
  });

  it("should add the second activity with { id=2, name=activity2, description=activity2, status=false }", () => {
    activitiesSelector.mockReset().mockReturnValue([
      {
        id: 1,
        name: "shopping",
        description: "buy some stuff",
        status: false,
      },
    ]);
    const component = renderAddActivity();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
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
    expect(addActivity).toHaveBeenCalledWith({
      id: 2,
      name: "activity2",
      description: "activity2",
      status: false,
    });
  });
});
