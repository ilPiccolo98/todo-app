/* eslint-disable import/first */
import React from "react";
jest.mock("../../activities/initialActivities", () => {
  return () => [
    {
      id: 1,
      name: "shopping",
      description: "buy some stuff",
      status: false,
    },
  ];
});
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import DeleteActivity from "../DeleteActivity";
import activitiesStore from "../../activities/activitiesStore";
import * as actions from "../../activities/activitiesReducer";

const renderDeleteActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <DeleteActivity />
    </Provider>
  );
};

const getDeleteActvityFormComponents = (component) => {
  const idFieldDeleteActivity = component.getByTestId(
    "id-field-delete-activity"
  );
  const deleteButtonDeleteActivity = component.getByTestId(
    "delete-button-delete-activity"
  );
  return { idFieldDeleteActivity, deleteButtonDeleteActivity };
};

describe("testing DeleteActivity component", () => {
  it("should call the deleteActivity action with id=1 after pressed button", async () => {
    const component = renderDeleteActivity();
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);
    const deleteActivitySpy = jest.spyOn(actions, "deleteActivity");
    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "1",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    expect(deleteActivitySpy).toHaveBeenCalledWith("1");
    expect(component).toMatchSnapshot();
  });

  it("shouldn't call the deleteActivity action with id=10 after pressed the delete button", async () => {
    const component = renderDeleteActivity();
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);
    const deleteActivitySpy = jest.spyOn(actions, "deleteActivity");
    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "10",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    expect(deleteActivitySpy).not.toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
