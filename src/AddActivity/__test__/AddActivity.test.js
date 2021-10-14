/* eslint-disable jest/valid-title */
import React from "react";
import App from "../../App";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

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

const getDeleteActivityFormFields = (component) => {
  const idFieldDeleteActivity = component.getByTestId(
    "id-field-delete-activity"
  );
  const deleteButtonDeleteActivity = component.getByTestId(
    "delete-button-delete-activity"
  );
  return { idFieldDeleteActivity, deleteButtonDeleteActivity };
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

describe("AddActivity Component", () => {
  it("should show the empty form after the insert button click", () => {
    const component = render(<App />);
    const insertButtonApp = component.getByTestId("insert-button-app");

    fireEvent.click(insertButtonApp);

    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
    } = getAddTaskFormFields(component);

    expect(nameFieldAddActivity.value).toBe("");
    expect(descriptionFieldAddActivity.value).toBe("");
    expect(statusCheckboxAddActivity.checked).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it("should let you type data into the form after pressed insert button", () => {
    const component = render(<App />);
    const insertButtonApp = component.getByTestId("insert-button-app");

    fireEvent.click(insertButtonApp);

    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
    } = getAddTaskFormFields(component);

    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "name new activity",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "description new activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    expect(nameFieldAddActivity.value).toBe("name new activity");
    expect(descriptionFieldAddActivity.value).toBe("description new activity");
    expect(statusCheckboxAddActivity.checked).toBe(true);
  });

  it("should let you insert a new activity", () => {
    const component = render(<App />);
    const insertButtonApp = component.getByTestId("insert-button-app");

    fireEvent.click(insertButtonApp);

    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);

    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "name new activity",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "description new activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    const tableBody = component.getByTestId("table-body");
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(tableBody, tableBody.childElementCount - 1);

    expect(idCellData.textContent).toBe("4");
    expect(nameCellData.textContent).toBe("name new activity");
    expect(descriptionCellData.textContent).toBe("description new activity");
    expect(statusCellData.textContent).toBe("true");
  });

  it("shouldn't let you add an activity with name field blank", () => {
    const component = render(<App />);
    const insertButtonApp = component.getByTestId("insert-button-app");
    fireEvent.click(insertButtonApp);
    const {
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);

    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "description new activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    const tableBody = component.getByTestId("table-body");
    expect(tableBody.childElementCount).toBe(4);
  });

  it("shouldn't let you add an activity with description field blank", () => {
    const component = render(<App />);
    const insertButtonApp = component.getByTestId("insert-button-app");
    fireEvent.click(insertButtonApp);
    const {
      nameFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);

    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "name new activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    const tableBody = component.getByTestId("table-body");
    expect(tableBody.childElementCount).toBe(4);
  });

  it("should delete all the activities and add a new one", async () => {
    const component = render(<App />);
    const deleteButtonApp = component.getByTestId("delete-button-app");
    await waitFor(() => {
      fireEvent.click(deleteButtonApp);
    });
    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActivityFormFields(component);

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
    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "2",
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
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

    const insertButtonApp = component.getByTestId("insert-button-app");
    fireEvent.click(insertButtonApp);
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      statusCheckboxAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);

    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "name new activity",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "description new activity",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);

    const tableBody = component.getByTestId("table-body");

    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(tableBody, 1);

    expect(idCellData.textContent).toBe("1");
    expect(nameCellData.textContent).toBe("name new activity");
    expect(descriptionCellData.textContent).toBe("description new activity");
    expect(statusCellData.textContent).toBe("true");
  });
});
