'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

interface Contract {
  _id: string;
  contractName: string;
  startDate: string;
  endDate: string;
  summary: string;
  parties: string[];
  terms: string[];
  consequences: string[];
  filePath: string;
  createdAt: string;
  user: string;
}

export default function ContractDetailPage() {
    const { id } = useParams() as { id: string };
  const [contract, setContract] = useState<Contract | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/summary/${id}`);
        const data = await res.json();
        console.log(data);
        setContract(data);
      } catch (error) {
        console.error('Error fetching contract:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContract();
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (!contract) return <p>Contract not found</p>;

  return (
    <div className={styles.body}>
      <div className={styles.pdf}>
      <embed
        src={`http://localhost:8000/api/pdf/${contract._id}`}
        type="application/pdf"
        width="100%"
        height="600px"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.searchDef}>
          <div className={styles.defTitle}>
            <h1>Contract Details</h1>
          </div>

          <div className={styles.search}>
            <div className={styles.searchBar}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBar}
                placeholder="Search terms..."
              />
            </div>
            <button className={styles.searchButton}>Search</button>
          </div>

          <div className={styles.definitions}>
            <h3>Important Clauses</h3>
            <ul>
              {contract.terms
                .filter((term) =>
                  term.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
            </ul>

            <h3>Consequences</h3>
            <ul>
              {contract.consequences.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>

            <h3>Involved Parties</h3>
            <ul>
              {contract.parties.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.summary}>
          <h1>Summary</h1>
          <p className={styles.summaryBox}>{contract.summary}</p>
        </div>
      </div>
    </div>
  );
}