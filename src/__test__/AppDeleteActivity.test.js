import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import App from "../App";
import activitiesStore from "../activities/activitiesStore";

const renderAppActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <App />
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

describe("testing App when deleting a new activity", () => {
  it("shouldn't delete a not existing activity", async () => {
    const component = renderAppActivity();
    const deleteButtonApp = component.getByTestId("delete-button-app");
    fireEvent.click(deleteButtonApp);
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);
    await waitFor(() =>
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "10",
        },
      })
    );
    await waitFor(() => fireEvent.click(deleteButtonDeleteActivity));
    const table = component.getByTestId("table-body");
    expect(table.childElementCount).toBe(4);
    expect(component).toMatchSnapshot();
  });

  it("should delete the existing activity with id 2", async () => {
    const component = renderAppActivity();
    const deleteButtonApp = component.getByTestId("delete-button-app");
    fireEvent.click(deleteButtonApp);
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);
    await waitFor(() =>
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "2",
        },
      })
    );
    await waitFor(() => fireEvent.click(deleteButtonDeleteActivity));
    const table = component.getByTestId("table-body");
    expect(table.childElementCount).toBe(3);
    expect(component).toMatchSnapshot();
  });
});
