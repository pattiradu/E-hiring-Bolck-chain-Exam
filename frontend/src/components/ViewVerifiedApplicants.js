// import React, { useEffect, useState } from "react";
// import { useContract } from "../utils/contract";

// const ViewVerifiedApplicants = () => {
//     const { getContract } = useContract();
//     const [verified, setVerified] = useState([]);

//     useEffect(() => {
//         const fetchVerified = async () => {
//             const sessionVerified = JSON.parse(sessionStorage.getItem("verifiedCandidates")) || [];

//             try {
//                 const contract = await getContract();
//                 const blockchainVerified = await contract.getVerifiedApplicants(); // This should return array

//                 // Combine session + blockchain data
//                 const allVerified = [
//                     ...blockchainVerified,
//                     ...sessionVerified.map(v => ({
//                         name: v.name || "N/A",
//                         email: v.email || "N/A",
//                         address: v.address,
//                     }))
//                 ];

//                 // Optional: remove duplicates by address
//                 const uniqueVerified = allVerified.filter(
//                     (person, index, self) =>
//                         index === self.findIndex(p => p.address === person.address)
//                 );

//                 setVerified(uniqueVerified);
//             } catch (err) {
//                 console.error("Error fetching verified applicants:", err);
//                 // Fallback to session data only
//                 const fallbackData = sessionVerified.map(v => ({
//                     name: v.name || "N/A",
//                     email: v.email || "N/A",
//                     address: v.address,
//                 }));
//                 setVerified(fallbackData);
//             }
//         };

//         fetchVerified();
//     }, [getContract]);

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-primary mb-4">Verified Applicants</h2>

//             {verified.length > 0 ? (
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>candidatE-ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Address</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {verified.map((applicant, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{applicant.name}</td>
//                                     <td>{applicant.email}</td>
//                                     <td>{applicant.address}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center">No verified applicants available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewVerifiedApplicants;







// import React, { useEffect, useState } from "react";
// import { useContract } from "../utils/contract";

// const ViewVerifiedApplicants = () => {
//     const { getContract } = useContract();
//     const [verified, setVerified] = useState([]);

//     useEffect(() => {
//         const fetchVerified = async () => {
//             try {
//                 const contract = await getContract();
//                 const data = await contract.getVerifiedApplicants(); // Smart contract must expose this
//                 setVerified(data);
//             } catch (err) {
//                 console.error("Error fetching verified applicants:", err);
//             }
//         };
//         fetchVerified();
//     }, [getContract]);

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-primary mb-4">Verified Applicants</h2>
            
//             {verified.length > 0 ? (
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {verified.map((applicant, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{applicant.name}</td>
//                                     <td>{applicant.email}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center">No verified applicants available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewVerifiedApplicants;



import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractFile from "../utils/EHiringSystem.json";

const contractABI = contractFile.abi;
const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // Replace with your actual contract address

const VerifiedCandidates = () => {
  const [verifiedCandidates, setVerifiedCandidates] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();

        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);

        const candidateAddresses = await contractInstance.methods
          .getVerifiedCandidates()
          .call();

        const candidateData = await Promise.all(
          candidateAddresses.map(async (address) => {
            const data = await contractInstance.methods
              .viewCandidate(address)
              .call();
            return {
              address,
              fullName: data[0],
              email: data[1],
              education: data[2],
              experience: data[3],
              isVerified: data[4],
              isEmployee: data[5],
            };
          })
        );

        setVerifiedCandidates(candidateData);
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []);

  return (
    <div>
      <h2>Verified Candidates</h2>
      <ul>
        {verifiedCandidates.map((candidate, index) => (
          <li key={index}>
            <strong>{candidate.fullName}</strong> ({candidate.email})<br />
            Education: {candidate.education}<br />
            Experience: {candidate.experience}<br />
            Employee Status: {candidate.isEmployee ? "Hired" : "Not Hired"}<br />
            Address: {candidate.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerifiedCandidates;
