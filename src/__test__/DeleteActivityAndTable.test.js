import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import DeleteActivity from "../DeleteActivity/DeleteActivity";
import TableActivities from "../TableActivities/TableActivities";
import activitiesStore from "../activities/activitiesStore";

const renderTableActivities = () => {
  return render(
    <Provider store={activitiesStore}>
      <TableActivities />
    </Provider>
  );
};

const renderDeleteActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <DeleteActivity />
    </Provider>
  );
};

const getLengthTable = (table) => {
  return table.getByTestId("table-body").childElementCount;
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

describe("testing DeleteActivity and TableActivities together", () => {
  it("should delete the last activity", async () => {
    const componentDeleteActivity = renderDeleteActivity();
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(componentDeleteActivity);
    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "3",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    const table = renderTableActivities();
    expect(getLengthTable(table)).toBe(3);
  });
});
