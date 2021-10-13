import React from "react";
import App from "../../App";
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
  const tableBody = component.getByTestId("table-body");
  const thirdRow = tableBody.childNodes[2];
  const idCellData = thirdRow.childNodes[0];
  const nameCellData = thirdRow.childNodes[1];
  const descriptionCellData = thirdRow.childNodes[2];
  const statusCellData = thirdRow.childNodes[3];
  expect(idCellData.textContent).toBe("2");
  expect(nameCellData.textContent).toBe("updated name");
  expect(descriptionCellData.textContent).toBe("updated description");
  expect(statusCellData.textContent).toBe("true");
});

test("updating a not existing activity", () => {
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
  expect(idFieldUpdateActivity.value).toBe("10");
  expect(nameFieldUpdateActivity.value).toBe("updated name");
  expect(descriptionFieldUpdateActivity.value).toBe("updated description");
  expect(statusCheckboxUpdateActivity.checked).toBe(true);
  fireEvent.click(updateButtonUpdateActivity);
  for (let i = 1; i <= 3; ++i) {
    const idTd = component.getByTestId(`td-id-${i}`);
    const nameTd = component.getByTestId(`td-name-${i}`);
    const descriptionTd = component.getByTestId(`td-description-${i}`);
    expect(idTd.textContent).not.toBe("10");
    expect(nameTd.textContent).not.toBe("updated name");
    expect(descriptionTd.textContent).not.toBe("updated description");
  }
});
