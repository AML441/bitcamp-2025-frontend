'use client';

import React from "react";
import Link from "next/link";
import { useState } from 'react';
//comment here
type Contract = {
  _id: string;
  contractName: string;
  startDate: string;
  endDate: string;
};

interface UserTableProps {
  contracts: Contract[];
}

const UserTable: React.FC<UserTableProps> = ({ contracts }) => {
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  if (!Array.isArray(contracts)) return <p>No contracts found.</p>;
  
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>Delete</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Contract Name</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Start Date</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>End Date</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>More Info</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract) => (
          <tr key={contract._id}>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}> <button>❌</button></td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{contract.contractName}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{contract.startDate}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{contract.endDate}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <Link href={`/contracts/${contract._id}`}>
                <button  
                  onMouseEnter={() => setHoveredButtonId(contract._id)}
                  onMouseLeave={() => setHoveredButtonId(null)}
                  style={{
                    display: "block",
                    padding: "6px 12px",
                    cursor: "pointer",
                    backgroundColor: hoveredButtonId === contract._id ? "#ff6a4d" : "#f89880",
                    textAlign: "center",
                    margin: "auto",
                    fontSize: "1rem",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "25px",
                    transition: "background-color 0.3s ease",
                    fontFamily: "'Courier New', Courier, monospace",
                    fontWeight: "bold",
                    border: "none",
                    color: "white",
                  }}>
                  More Info
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
