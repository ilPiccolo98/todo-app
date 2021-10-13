import React from "react";
import App from "../../App";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("deleting activity", async () => {
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
  expect(idFieldDeleteActivity.value).toBe("");
  await waitFor(() => {
    fireEvent.change(idFieldDeleteActivity, {
      target: {
        value: "1",
      },
    });
  });
  expect(idFieldDeleteActivity.value).toBe("1");
  await waitFor(() => {
    fireEvent.click(deleteButtonDeleteActivity);
  });
  const tableBody = component.getByTestId("table-body");
  expect(tableBody.childElementCount).toBe(3);
});

test("deleting activity with id field blak", async () => {
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
  expect(idFieldDeleteActivity.value).toBe("");
  await waitFor(() => {
    fireEvent.click(deleteButtonDeleteActivity);
  });
  const tableBody = component.getByTestId("table-body");
  expect(tableBody.childElementCount).toBe(4);
});

test("deleting a not existing activity", async () => {
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
  expect(idFieldDeleteActivity.value).toBe("");
  await waitFor(() => {
    fireEvent.change(idFieldDeleteActivity, {
      target: {
        value: "10",
      },
    });
  });
  expect(idFieldDeleteActivity.value).toBe("10");
  await waitFor(() => {
    fireEvent.click(deleteButtonDeleteActivity);
  });
  const tableBody = component.getByTestId("table-body");
  expect(tableBody.childElementCount).toBe(4);
});
