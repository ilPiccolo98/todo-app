import { React } from "react";

const Body = (props) => {
  return props.activities.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.status ? "true" : "false"}</td>
    </tr>
  ));
};

export default Body;
