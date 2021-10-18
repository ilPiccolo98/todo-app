/* eslint-disable import/first */
import React from "react";
jest.mock("../activities/initialActivities", () => {
  return () => [];
});
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import App from "../App";
import activitiesStore from "../activities/activitiesStore";

const renderAppActivity = () => {
  return render(
    <Provider store={activitiesStore}>
      <App />
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

const getRowDataCells = (table, index) => {
  const idCellData = table.childNodes[index].childNodes[0];
  const nameCellData = table.childNodes[index].childNodes[1];
  const descriptionCellData = table.childNodes[index].childNodes[2];
  const statusCellData = table.childNodes[index].childNodes[3];
  return {
    idCellData,
    nameCellData,
    descriptionCellData,
    statusCellData,
  };
};

describe("testing App when adding a new activity", () => {
  it("should add an activity as first item into the table", () => {
    const component = renderAppActivity();
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
        value: "activity1",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity1",
      },
    });
    fireEvent.click(statusCheckboxAddActivity);
    fireEvent.click(insertButtonAddActivity);
    const table = component.getByTestId("table-body");
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(table, 1);
    expect(idCellData.textContent).toBe("1");
    expect(nameCellData.textContent).toBe("activity1");
    expect(descriptionCellData.textContent).toBe("activity1");
    expect(statusCellData.textContent).toBe("true");
    expect(component).toMatchSnapshot();
  });

  it("should add an activity as second item into the table", () => {
    const component = renderAppActivity();
    const insertButtonApp = component.getByTestId("insert-button-app");
    fireEvent.click(insertButtonApp);
    const {
      nameFieldAddActivity,
      descriptionFieldAddActivity,
      insertButtonAddActivity,
    } = getAddTaskFormFields(component);
    fireEvent.change(nameFieldAddActivity, {
      target: {
        value: "activity2",
      },
    });
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity2",
      },
    });
    fireEvent.click(insertButtonAddActivity);
    const table = component.getByTestId("table-body");
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(table, 2);
    expect(idCellData.textContent).toBe("2");
    expect(nameCellData.textContent).toBe("activity2");
    expect(descriptionCellData.textContent).toBe("activity2");
    expect(statusCellData.textContent).toBe("false");
    expect(component).toMatchSnapshot();
  });

  it("shouldn't add an activity with the name field blank", () => {
    const component = renderAppActivity();
    const insertButtonApp = component.getByTestId("insert-button-app");
    fireEvent.click(insertButtonApp);
    const { descriptionFieldAddActivity, insertButtonAddActivity } =
      getAddTaskFormFields(component);
    fireEvent.change(descriptionFieldAddActivity, {
      target: {
        value: "activity2",
      },
    });
    fireEvent.click(insertButtonAddActivity);
    const table = component.getByTestId("table-body");
    expect(table.childElementCount).toBe(3);
    expect(component).toMatchSnapshot();
  });
});
