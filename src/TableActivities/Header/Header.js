import { React } from "react";

const Header = () => {
  const headers = ["Id", "Name", "Description", "Status"];

  return (
    <tr>
      {headers.map((text) => (
        <th key={text}>{text}</th>
      ))}
    </tr>
  );
};

export default Header;
