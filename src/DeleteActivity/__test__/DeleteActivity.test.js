import React from "react";
import App from "../../App";
import { fireEvent, render, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const mockedActivities = jest.fn();
mockedActivities.mockReturnValue([]);
jest.mock("../../activities", () => mockedActivities());
/* () => [
  {
    id: 1,
    name: "shopping",
    description: "buy some stuff",
    status: false,
  },
  {
    id: 2,
    name: "have fun with my dog",
    description: "take my dog for a walk and have fun with it",
    status: true,
  },
]);*/

const getDeleteActvityFormComponents = (component) => {
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

describe("DeleteActivity Component", () => {
  beforeEach(() => {
    mockedActivities.mockReset().mockReturnValue([
      {
        id: 1,
        name: "shopping",
        description: "buy some stuff",
        status: false,
      },
      {
        id: 2,
        name: "have fun with my dog",
        description: "take my dog for a walk and have fun with it",
        status: true,
      },
    ]);
  });
  it("should show the DeleteActivity form empty after pressed the delete button", async () => {
    const component = render(<App />);
    const deleteButtonApp = component.getByTestId("delete-button-app");
    act(() => {
      fireEvent.click(deleteButtonApp);
    });

    const { idFieldDeleteActivity } = getDeleteActvityFormComponents(component);

    expect(idFieldDeleteActivity.value).toBe("");
    expect(component).toMatchSnapshot();
  });

  it("should let you type data into the form after pressed the delete button", async () => {
    const component = render(<App />);
    const deleteButtonApp = component.getByTestId("delete-button-app");
    await waitFor(() => {
      fireEvent.click(deleteButtonApp);
    });

    const { idFieldDeleteActivity } = getDeleteActvityFormComponents(component);

    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "1",
        },
      });
    });
    expect(idFieldDeleteActivity.value).toBe("1");
    expect(component).toMatchSnapshot();
  });

  it("should let you delete an activity using the DeleteActivity component", async () => {
    const component = render(<App />);
    const deleteButtonApp = component.getByTestId("delete-button-app");
    await waitFor(() => {
      fireEvent.click(deleteButtonApp);
    });

    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);

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
    const tableBody = component.getByTestId("table-body");
    const { idCellData } = getRowDataCells(tableBody, 1);
    expect(idCellData.textContent).not.toBe("1");
    expect(component).toMatchSnapshot();
  });

  it("shouldn't let you delete an activity with id field blank", async () => {
    const component = render(<App />);
    const deleteButtonApp = component.getByTestId("delete-button-app");
    // expect(component.queryByText("false")).toBeNull();
    await waitFor(() => {
      fireEvent.click(deleteButtonApp);
    });

    const { deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);

    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    const tableBody = component.getByTestId("table-body");
    expect(tableBody.childElementCount).toBe(4);
    expect(component).toMatchSnapshot();
  });

  it("shouldn't delete a not existing activity", async () => {
    const component = render(<App />);
    const deleteButtonApp = component.getByTestId("delete-button-app");
    await waitFor(() => {
      fireEvent.click(deleteButtonApp);
    });

    const { idFieldDeleteActivity, deleteButtonDeleteActivity } =
      getDeleteActvityFormComponents(component);

    await waitFor(() => {
      fireEvent.change(idFieldDeleteActivity, {
        target: {
          value: "20",
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(deleteButtonDeleteActivity);
    });
    const tableBody = component.getByTestId("table-body");
    expect(tableBody.childElementCount).toBe(4);
    expect(component).toMatchSnapshot();
  });
});
