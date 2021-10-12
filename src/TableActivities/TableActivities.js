import { React } from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";

const TableActivities = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <Header />
          <Body
            activities={props.activities}
            setActivities={props.setActivities}
          />
        </tbody>
      </table>
    </div>
  );
};

export default TableActivities;
