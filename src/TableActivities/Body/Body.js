import { React } from "react";

const Body = (props) => {
  return props.activities.map((item) => (
    <tr key={item.id}>
      <td data-testid={"td-id-" + item.id}>{item.id}</td>
      <td data-testid={"td-name-" + item.id}>{item.name}</td>
      <td data-testid={"td-description-" + item.id}>{item.description}</td>
      <td data-testid={"td-status-" + item.id}>{item.status.toString()}</td>
    </tr>
  ));
};

export default Body;
