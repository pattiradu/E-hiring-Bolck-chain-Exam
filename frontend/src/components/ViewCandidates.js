import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractFile from "../utils/EHiringSystem.json";

const contractABI = contractFile.abi;
const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // Replace with your deployed address

const AllCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const loadCandidates = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Ask user to connect wallet

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const candidateAddresses = await contract.methods.getAllCandidates().call();

          const candidateData = await Promise.all(
            candidateAddresses.map(async (addr) => {
              const details = await contract.methods.viewCandidate(addr).call();
              return {
                address: addr,
                fullName: details[0],
                email: details[1],
                education: details[2],
                experience: details[3],
                isVerified: details[4],
                isEmployee: details[5],
              };
            })
          );

          setCandidates(candidateData);
        } catch (err) {
          console.error("Error loading candidates:", err);
        }
      }
    };

    loadCandidates();
  }, []);

  return (
    <div>
      <h2>All Registered Candidates</h2>
      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>
              <strong>Name:</strong> {candidate.fullName}<br />
              <strong>Email:</strong> {candidate.email}<br />
              <strong>Education:</strong> {candidate.education}<br />
              <strong>Experience:</strong> {candidate.experience}<br />
              <strong>Verified:</strong> {candidate.isVerified ? "Yes" : "No"}<br />
              <strong>Employee:</strong> {candidate.isEmployee ? "Yes" : "No"}<br />
              <strong>Address:</strong> {candidate.address}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCandidates;









// import React, { useEffect, useState } from "react";

// const ViewCandidates = () => {
//     const [candidates, setCandidates] = useState([]);

//     useEffect(() => {
//         const stored = JSON.parse(sessionStorage.getItem("candidates")) || [];
//         setCandidates(stored);
//     }, []);

//     return (
//         <div className="card shadow-sm p-4">
//             <h4 className="card-title text-primary mb-3">Registered Candidates</h4>

//             {candidates.length === 0 ? (
//                 <p>No candidates found in session.</p>
//             ) : (
//                 <table className="table table-bordered table-hover">
//                     <thead className="table-light">
//                         <tr>
//                             <th>Number</th>
//                             <th>Full Name</th>
//                             <th>Email</th>
//                             <th>Education</th>
//                             <th>Experience</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {candidates.map((c, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{c.name}</td>
//                                 <td>{c.email}</td>
//                                 <td>{c.education}</td>
//                                 <td>{c.experience}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default ViewCandidates;
