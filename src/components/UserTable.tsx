import React from "react";

//for UserTables, all of this is unneccessary and should be implemented through backend I just need this to see 
//what the table looks like

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Rose", email: "charlie@example.com" },
];

const UserTable: React.FC = () => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.id}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.name}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;