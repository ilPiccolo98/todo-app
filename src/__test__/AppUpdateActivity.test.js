import React from "react";
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

describe("testing App when updating a new activity", () => {
  it("shouldn't update an activity with the id field blank", () => {
    const component = renderAppActivity();
    const updateButtonApp = component.getByTestId("update-button-app");
    fireEvent.click(updateButtonApp);
    const {
      nameFieldUpdateActivity,
      descriptionFieldUpdateActivity,
      updateButtonUpdateActivity,
    } = getUpdateActivityFormComponents(component);
    fireEvent.change(nameFieldUpdateActivity, {
      target: {
        value: "activity updated",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "activity updated",
      },
    });
    fireEvent.click(updateButtonUpdateActivity);
    const table = component.getByTestId("table-body");
    for (let i = 0; i !== table.childElementCount; ++i) {
      const { nameCellData, descriptionCellData } = getRowDataCells(table, i);
      expect(nameCellData.textContent).not.toBe("activity updated");
      expect(descriptionCellData.textContent).not.toBe("activity updated");
    }
    expect(component).toMatchSnapshot();
  });

  it("shouldn't update an not existing activity", () => {
    const component = renderAppActivity();
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
        value: "activity updated",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "activity updated",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);
    fireEvent.click(updateButtonUpdateActivity);
    const table = component.getByTestId("table-body");
    for (let i = 0; i !== table.childElementCount; ++i) {
      const { nameCellData, descriptionCellData } = getRowDataCells(table, i);
      expect(nameCellData.textContent).not.toBe("activity updated");
      expect(descriptionCellData.textContent).not.toBe("activity updated");
    }
    expect(component).toMatchSnapshot();
  });

  it("should update the activity with id 2", () => {
    const component = renderAppActivity();
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
        value: "activity updated",
      },
    });
    fireEvent.change(descriptionFieldUpdateActivity, {
      target: {
        value: "activity updated",
      },
    });
    fireEvent.click(statusCheckboxUpdateActivity);
    fireEvent.click(updateButtonUpdateActivity);
    const table = component.getByTestId("table-body");
    const { idCellData, nameCellData, descriptionCellData, statusCellData } =
      getRowDataCells(table, 2);
    expect(idCellData.textContent).toBe("2");
    expect(nameCellData.textContent).toBe("activity updated");
    expect(descriptionCellData.textContent).toBe("activity updated");
    expect(statusCellData.textContent).toBe("true");
    expect(component).toMatchSnapshot();
  });
});
