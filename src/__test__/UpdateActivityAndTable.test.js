import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import UpdateActivity from "../UpdateActivity/UpdateActivity";
import TableActivities from "../TableActivities/TableActivities";
import activitiesStore from "../activities/activitiesStore";

const renderTableActivities = () => {
  return render(
    <Provider store={activitiesStore}>
      <TableActivities />
    </Provider>
  );
};

const renderUpdateActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <UpdateActivity />
    </Provider>
  );
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

describe("testing UpdateActivity and TableActivities together", () => {
  it("should update the second activity in the table", () => {
    const componentUpdateActivity = renderUpdateActivity();
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateActivityFormComponents(componentUpdateActivity);
    fireEvent.change(idFieldUpdateActivity, {
      target: {
        value: "2",
      },
    });
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "activity",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "activity",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);
    fireEvent.click(updateButtonUpdateActivity);
    const componentTableActivities = renderTableActivities();
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(componentTableActivities, 2);
    expect(idCellData.textContent).toBe("2");
    expect(nameCellData.textContent).toBe("activity");
    expect(descriptionCellData.textContent).toBe("activity");
    expect(statusCellData.textContent).toBe("true");
  });
});
