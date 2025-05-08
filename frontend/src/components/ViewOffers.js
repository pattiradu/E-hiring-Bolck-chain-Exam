// working files of my project


// import React, { useEffect, useState } from "react";
// import { useContract } from "../utils/contract";

// const ViewOffers = () => {
//     const { getContract } = useContract();
//     const [offers, setOffers] = useState([]);

//     useEffect(() => {
//         const fetchOffers = async () => {
//             const sessionOffers = JSON.parse(sessionStorage.getItem("jobOffers")) || [];

//             try {
//                 const contract = await getContract();
//                 const blockchainOffers = await contract.getAllOffers(); // Smart contract must expose this

//                 // Merge blockchain data with sessionStorage data
//                 const combined = [...blockchainOffers, ...sessionOffers];

//                 // Remove duplicates based on jobId
//                 const uniqueOffers = combined.filter(
//                     (offer, index, self) => index === self.findIndex((o) => o.jobId === offer.jobId)
//                 );

//                 setOffers(uniqueOffers);
//             } catch (err) {
//                 console.error("Error fetching offers:", err);

//                 // Fallback to session-only offers
//                 setOffers(sessionOffers);
//             }
//         };

//         fetchOffers();
//     }, [getContract]);

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-primary mb-4">Offers Provided</h2>

//             {offers.length > 0 ? (
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Candidate Address</th>
//                                 <th>Job ID</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {offers.map((offer, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{offer.candidateAddress}</td>
//                                     <td>{offer.jobId}</td>
//                                     <td>{offer.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center">No offers available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewOffers;





// import React, { useEffect, useState } from "react";
// import { useContract } from "../utils/contract";

// const ViewOffers = () => {
//     const { getContract } = useContract();
//     const [offers, setOffers] = useState([]);

//     useEffect(() => {
//         const fetchOffers = async () => {
//             try {
//                 const contract = await getContract();
//                 const data = await contract.getAllOffers(); // Smart contract must expose this
//                 setOffers(data);
//             } catch (err) {
//                 console.error("Error fetching offers:", err);
//             }
//         };
//         fetchOffers();
//     }, [getContract]);

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-primary mb-4">Offers Provided</h2>
            
//             {offers.length > 0 ? (
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Candidate</th>
//                                 <th>Job ID</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {offers.map((offer, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{offer.candidate}</td>
//                                     <td>{offer.jobId}</td>
//                                     <td>{offer.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center">No offers available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewOffers;







// testing file


// components/OffersSent.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractFile from "../utils/EHiringSystem.json";

const contractABI = contractFile.abi;
const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

const OffersSent = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loadOffers = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const offerAddresses = await contract.methods.getAllOffers().call();

        const offerData = await Promise.all(
          offerAddresses.map(async (address) => {
            const offer = await contract.methods.offers(address).call();
            const candidate = await contract.methods.viewCandidate(address).call();
            return {
              candidateAddress: address,
              fullName: candidate[0],
              jobId: offer.jobId,
              isOffered: offer.isOffered,
              isAccepted: offer.isAccepted,
            };
          })
        );

        setOffers(offerData);
      }
    };

    loadOffers();
  }, []);

  return (
    <div>
      <h2>Offers Sent</h2>
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            <strong>{offer.fullName}</strong> ({offer.candidateAddress})<br />
            Job ID: {offer.jobId}<br />
            Offer Status: {offer.isOffered ? "Sent" : "Not Sent"}<br />
            Accepted: {offer.isAccepted ? "Yes" : "No"}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OffersSent;
