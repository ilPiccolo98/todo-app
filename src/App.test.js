import React from "react";
import App from "./App";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("updating activity", () => {
  const component = render(<App test="updating" />);
  const updateButtonApp = component.getByTestId("update-button-app");
  fireEvent.click(updateButtonApp);
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
  expect(idFieldUpdateActivity.value).toBe("");
  expect(nameFieldUpdateActivity.value).toBe("");
  expect(descriptionFieldUpdateActivity.value).toBe("");
  expect(statusCheckboxUpdateActivity.checked).toBe(false);
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
  fireEvent.click(updateButtonUpdateActivity);
  const idTd2 = component.getByTestId("td-id-2");
  const nameTd2 = component.getByTestId("td-name-2");
  const descriptionTd2 = component.getByTestId("td-description-2");
  const statusTd2 = component.getByTestId("td-status-2");
  expect(idTd2.textContent).toBe("2");
  expect(nameTd2.textContent).toBe("updated name");
  expect(descriptionTd2.textContent).toBe("updated description");
  expect(statusTd2.textContent).toBe("true");
});

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
  const idNewActivity = component.getByTestId("td-id-4");
  const nameNewActivity = component.getByTestId("td-name-4");
  const descriptionNewActivity = component.getByTestId("td-description-4");
  const statusNewActivity = component.getByTestId("td-status-4");
  expect(idNewActivity.textContent).toBe("4");
  expect(nameNewActivity.textContent).toBe("name new activity");
  expect(descriptionNewActivity.textContent).toBe("description new activity");
  expect(statusNewActivity.textContent).toBe("true");
});

test("deleting activity", () => {
  const component = render(<App />);
  const deleteButtonApp = component.getByTestId("delete-button-app");
  fireEvent.click(deleteButtonApp);
  const idFieldDeleteActivity = component.getByTestId(
    "id-field-delete-activity"
  );
  const deleteButtonDeleteActivity = component.getByTestId(
    "delete-button-delete-activity"
  );
  expect(idFieldDeleteActivity.value).toBe("");
  fireEvent.change(idFieldDeleteActivity, {
    target: {
      value: "1",
    },
  });
  expect(idFieldDeleteActivity.value).toBe("1");
  fireEvent.click(deleteButtonDeleteActivity);
  const tableBody = component.getByTestId("table-body");
  expect(tableBody.childElementCount).toBe(3);
});

test("deleting all the activities and add a new one", () => {
  const component = render(<App />);
  const deleteButtonApp = component.getByTestId("delete-button-app");
  fireEvent.click(deleteButtonApp);
  const idFieldDeleteActivity = component.getByTestId(
    "id-field-delete-activity"
  );
  const deleteButtonDeleteActivity = component.getByTestId(
    "delete-button-delete-activity"
  );
  fireEvent.change(idFieldDeleteActivity, {
    target: {
      value: "1",
    },
  });
  fireEvent.click(deleteButtonDeleteActivity);
  fireEvent.change(idFieldDeleteActivity, {
    target: {
      value: "2",
    },
  });
  fireEvent.click(deleteButtonDeleteActivity);
  fireEvent.change(idFieldDeleteActivity, {
    target: {
      value: "3",
    },
  });
  fireEvent.click(deleteButtonDeleteActivity);
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
