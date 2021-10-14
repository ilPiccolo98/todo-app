import React from "react";
import App from "../../App";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

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

const getRowDataCells = (table, index) => {
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

describe("UpdateActivity component", () => {
  test("should show UpdateActivity form empty after pressed the update button", () => {
    const component = render(<App test="updating" />);
    const updateButtonApp = component.getByTestId("update-button-app");
    fireEvent.click(updateButtonApp);
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
    } = getUpdateActivityFormComponents(component);

    expect(idFieldUpdateActivity.value).toBe("");
    expect(nameFieldUpdateActivity.value).toBe("");
    expect(descriptionFieldUpdateActivity.value).toBe("");
    expect(statusCheckboxUpdateActivity.checked).toBe(false);
  });

  it("should let you type data into the UpdateActivity form", () => {
    const component = render(<App test="updating" />);
    const updateButtonApp = component.getByTestId("update-button-app");
    fireEvent.click(updateButtonApp);
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
    } = getUpdateActivityFormComponents(component);

    fireEvent.change(idFieldUpdateActivity, {
      target: {
        value: "2",
      },
    });
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "updated name",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "updated description",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);

    expect(idFieldUpdateActivity.value).toBe("2");
    expect(nameFieldUpdateActivity.value).toBe("updated name");
    expect(descriptionFieldUpdateActivity.value).toBe("updated description");
    expect(statusCheckboxUpdateActivity.checked).toBe(true);
  });

  it("should let you update an activity by using the UpdateActivity form", () => {
    const component = render(<App test="updating" />);
    const updateButtonApp = component.getByTestId("update-button-app");
    fireEvent.click(updateButtonApp);
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateActivityFormComponents(component);

    fireEvent.change(idFieldUpdateActivity, {
      target: {
        value: "2",
      },
    });
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "updated name",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "updated description",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);
    fireEvent.click(updateButtonUpdateActivity);
    const tableBody = component.getByTestId("table-body");
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(tableBody, 2);
    expect(idCellData.textContent).toBe("2");
    expect(nameCellData.textContent).toBe("updated name");
    expect(descriptionCellData.textContent).toBe("updated description");
    expect(statusCellData.textContent).toBe("true");
  });

  it("shouldn't let you update a not existing activity", () => {
    const component = render(<App test="updating" />);
    const updateButtonApp = component.getByTestId("update-button-app");
    fireEvent.click(updateButtonApp);
    const {
      idFieldUpdateActivity,
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      statusCheckboxUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateActivityFormComponents(component);
    fireEvent.change(idFieldUpdateActivity, {
      target: {
        value: "10",
      },
    });
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "updated name",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "updated description",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);
    fireEvent.click(updateButtonUpdateActivity);
    const tableBody = component.getByTestId("table-body");
    for (let i = 1; i <= 3; ++i) {
      const { idCellData, nameCellData, descriptionCellData } = getRowDataCells(
        tableBody,
        i
      );
      expect(idCellData.textContent).not.toBe("10");
      expect(nameCellData.textContent).not.toBe("updated name");
      expect(descriptionCellData.textContent).not.toBe("updated description");
    }
  });
});
