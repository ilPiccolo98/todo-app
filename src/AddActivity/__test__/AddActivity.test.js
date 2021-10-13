import React from "react";
import App from "../../App";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("inserting new activity", () => {
  const component = render(<App />);
  const insertButtonApp = component.getByTestId("insert-button-app");
  fireEvent.click(insertButtonApp);
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
  expect(nameFieldAddActivity.value).toBe("");
  expect(descriptionFieldAddActivity.value).toBe("");
  expect(statusCheckboxAddActivity.checked).toBe(false);
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
  fireEvent.click(insertButtonAddActivity);
  const tableBody = component.getByTestId("table-body");
  const lastRow = tableBody.childNodes[tableBody.childElementCount - 1];
  const idCellData = lastRow.childNodes[0];
  const nameCellData = lastRow.childNodes[1];
  const descriptionCellData = lastRow.childNodes[2];
  const statusCellData = lastRow.childNodes[3];
  expect(idCellData.textContent).toBe("4");
  expect(nameCellData.textContent).toBe("name new activity");
  expect(descriptionCellData.textContent).toBe("description new activity");
  expect(statusCellData.textContent).toBe("true");
});

test("adding activity with name black", () => {
  const component = render(<App />);
  const insertButtonApp = component.getByTestId("insert-button-app");
  fireEvent.click(insertButtonApp);
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
  expect(nameFieldAddActivity.value).toBe("");
  expect(descriptionFieldAddActivity.value).toBe("");
  expect(statusCheckboxAddActivity.checked).toBe(false);
  fireEvent.change(descriptionFieldAddActivity, {
    target: {
      value: "description new activity",
    },
  });
  fireEvent.click(statusCheckboxAddActivity);
  expect(nameFieldAddActivity.value).toBe("");
  expect(descriptionFieldAddActivity.value).toBe("description new activity");
  expect(statusCheckboxAddActivity.checked).toBe(true);
  fireEvent.click(insertButtonAddActivity);
  const tableBody = component.getByTestId("table-body");
  expect(tableBody.childElementCount).toBe(4);
});

test("adding activity with description black", () => {
  const component = render(<App />);
  const insertButtonApp = component.getByTestId("insert-button-app");
  fireEvent.click(insertButtonApp);
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
  expect(nameFieldAddActivity.value).toBe("");
  expect(descriptionFieldAddActivity.value).toBe("");
  expect(statusCheckboxAddActivity.checked).toBe(false);
  fireEvent.change(nameFieldAddActivity, {
    target: {
      value: "name new activity",
    },
  });
  fireEvent.click(statusCheckboxAddActivity);
  expect(nameFieldAddActivity.value).toBe("name new activity");
  expect(descriptionFieldAddActivity.value).toBe("");
  expect(statusCheckboxAddActivity.checked).toBe(true);
  fireEvent.click(insertButtonAddActivity);
  const tableBody = component.getByTestId("table-body");
  expect(tableBody.childElementCount).toBe(4);
});

test("deleting all the activities and add a new one", async () => {
  const component = render(<App />);
  const deleteButtonApp = component.getByTestId("delete-button-app");
  await waitFor(() => {
    fireEvent.click(deleteButtonApp);
  });
  const idFieldDeleteActivity = component.getByTestId(
    "id-field-delete-activity"
  );
  const deleteButtonDeleteActivity = component.getByTestId(
    "delete-button-delete-activity"
  );
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
  const idNewActivity = component.getByTestId("td-id-1");
  const nameNewActivity = component.getByTestId("td-name-1");
  const descriptionNewActivity = component.getByTestId("td-description-1");
  const statusNewActivity = component.getByTestId("td-status-1");
  expect(idNewActivity.textContent).toBe("1");
  expect(nameNewActivity.textContent).toBe("name new activity");
  expect(descriptionNewActivity.textContent).toBe("description new activity");
  expect(statusNewActivity.textContent).toBe("true");
});
