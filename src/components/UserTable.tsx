"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

//for UserTables, all of this is unneccessary and should be implemented through backend I just need this to see 
//what the table looks like


type Contract = {
  _id: string;
  contractName: string;
  startDate: string;
  endDate: string;
};

// const contracts: Contract[] = [
//   { contractName: "Yo", startDate: "00-00-0000", endDate: "00-00-0000", moreInfo: "N/A" },
//   { contractName: "Yo1", startDate: "00-00-0000", endDate: "00-00-0000", moreInfo: "N/A" },
//   { contractName: "Yo2", startDate: "00-00-0000", endDate: "00-00-0000", moreInfo: "N/A" },
  
// ];

const UserTable: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/contracts");
        const data = await res.json();
        setContracts(data);
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
    };

    fetchContracts();
  }, []);
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>Contract Name</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Start Date</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>End Date</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>More Info</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract) => (
          <tr key={contract._id}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{contract.contractName}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{contract.startDate}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{contract.endDate}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <Link href={`/contracts/${contract._id}`}>
                <button style={{ padding: "6px 12px", cursor: "pointer" }}>More Info</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;