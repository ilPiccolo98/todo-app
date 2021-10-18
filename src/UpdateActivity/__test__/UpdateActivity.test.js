import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import UpdateActivity from "../UpdateActivity";
import activitiesStore from "../../activities/activitiesStore";
import * as actions from "../../activities/activitiesReducer";

const renderUpdateActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <UpdateActivity />
    </Provider>
  );
};

const getUpdateActivityFormComponents = (component) => {
  const idFieldUpdateActivity = component.getByTestId(
    "id-field-update-activity"
  );
  const nameFieldUpdateActivity = component.getByTestId(
    "name-field-update-activity"
  );
  const descriptionFieldUpdateActivity = component.getByTestId(
    "description-field-update-activity"
  );
  const statusCheckboxUpdateActivity = component.getByTestId(
    "status-checkbox-update-activity"
  );
  const updateButtonUpdateActivity = component.getByTestId(
    "update-button-update-activity"
  );
  return {
    idFieldUpdateActivity,
    nameFieldUpdateActivity,
    descriptionFieldUpdateActivity,
    statusCheckboxUpdateActivity,
    updateButtonUpdateActivity,
  };
};

describe("testing UpdateActivity component", () => {
  it("should call the updateActivity action with { id=1, name=updated, description=update, status=true } as parameters after pressed the updated button", () => {
    const component = renderUpdateActivity();
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateActivityFormComponents(component);
    const updateActivitySpy = jest.spyOn(actions, "updateActivity");
    fireEvent.change(idFieldUpdateActivity, {
      target: {
        value: "1",
      },
    });
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "updated",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "updated",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);
    fireEvent.click(updateButtonUpdateActivity);
    expect(updateActivitySpy).toHaveBeenCalledWith({
      id: "1",
      name: "updated",
      description: "updated",
      status: true,
    });
    expect(component).toMatchSnapshot();
  });

  it("should call the updateActivity action with { id=20, name=updated, description=update, status=false } as parameters after pressed the updated button", () => {
    const component = renderUpdateActivity();
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateActivityFormComponents(component);
    const updateActivitySpy = jest.spyOn(actions, "updateActivity");
    fireEvent.change(idFieldUpdateActivity, {
      target: {
        value: "20",
      },
    });
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "updated",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "updated",
      },
    });
    fireEvent.click(updateButtonUpdateActivity);
    expect(updateActivitySpy).not.toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
