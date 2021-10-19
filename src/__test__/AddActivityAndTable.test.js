import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import AddActivity from "../AddActivity/AddActivity";
import TableActivities from "../TableActivities/TableActivities";
import activitiesStore from "../activities/activitiesStore";

const renderTableActivities = () => {
  return render(
    <Provider store={activitiesStore}>
      <TableActivities />
    </Provider>
  );
};

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

const getRowDataCells = (tableActivities, index) => {
  const table = tableActivities.getByTestId("table-body");
  const row = table.childNodes[index];
  const idCellData = row.childNodes[0];
  const nameCellData = row.childNodes[1];
  const descriptionCellData = row.childNodes[2];
  const statusCellData = row.childNodes[3];
  return {
    idCellData,
    nameCellData,
    descriptionCellData,
    statusCellData,
  };
};

describe("testing AddActivity and TableActivities together", () => {
  it("should add a the first activity into the table", () => {
    const componentAddActivity = renderAddActivity();
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(componentAddActivity);
    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "activity1",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity1",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    const componentTable = renderTableActivities();
    fireEvent.click(insertButtonAddActivity);
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(componentTable, 4);
    expect(idCellData.textContent).toBe("4");
    expect(nameCellData.textContent).toBe("activity1");
    expect(descriptionCellData.textContent).toBe("activity1");
    expect(statusCellData.textContent).toBe("true");
    expect(componentAddActivity).toMatchSnapshot();
    expect(componentTable).toMatchSnapshot();
  });
});
