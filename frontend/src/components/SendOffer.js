import React, { useState } from "react";
import { useContract } from "../utils/contract";

const SendOffer = () => {
    const { getContract } = useContract();
    const [jobId, setJobId] = useState("");
    const [candidateAddress, setCandidateAddress] = useState("");

    const sendOffer = async () => {
        if (!jobId || !candidateAddress) {
            alert("Please fill in both Job ID and Candidate Address.");
            return;
        }

        try {
            const contract = await getContract();
            const tx = await contract.sendOffer(jobId, candidateAddress);
            await tx.wait();

            // Store offer details in sessionStorage
            const existingOffers = JSON.parse(sessionStorage.getItem("jobOffers")) || [];
            const newOffer = { jobId, candidateAddress, status: "Sent" }; // You can expand with more details like timestamp
            sessionStorage.setItem("jobOffers", JSON.stringify([...existingOffers, newOffer]));

            alert("Offer sent successfully.");
            setJobId("");
            setCandidateAddress("");
        } catch (err) {
            console.error(err);
            alert("Failed to send offer.");
        }
    };

    return (
        <div className="card shadow-sm p-4 mb-4">
            <h4 className="card-title text-primary mb-3">Send Job Offer</h4>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Job ID"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Candidate Address"
                    value={candidateAddress}
                    onChange={(e) => setCandidateAddress(e.target.value)}
                />
            </div>

            <button className="btn btn-warning" onClick={sendOffer}>
                Send Offer
            </button>
        </div>
    );
};

export default SendOffer;






// import React, { useState } from "react";
// import { useContract } from "../utils/contract";

// const SendOffer = () => {
//     const { getContract } = useContract();
//     const [jobId, setJobId] = useState("");
//     const [candidateAddress, setCandidateAddress] = useState("");

//     const sendOffer = async () => {
//         if (!jobId || !candidateAddress) {
//             alert("Please fill in both Job ID and Candidate Address.");
//             return;
//         }

//         try {
//             const contract = await getContract();
//             const tx = await contract.sendOffer(jobId, candidateAddress);
//             await tx.wait();
//             alert("Offer sent successfully.");
//             setJobId("");
//             setCandidateAddress("");
//         } catch (err) {
//             console.error(err);
//             alert("Failed to send offer.");
//         }
//     };

//     return (
//         <div className="card shadow-sm p-4 mb-4">
//             <h4 className="card-title text-primary mb-3">Send Job Offer</h4>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Job ID"
//                     value={jobId}
//                     onChange={(e) => setJobId(e.target.value)}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Candidate Address"
//                     value={candidateAddress}
//                     onChange={(e) => setCandidateAddress(e.target.value)}
//                 />
//             </div>

//             <button className="btn btn-warning" onClick={sendOffer}>
//                 Send Offer
//             </button>
//         </div>
//     );
// };

// export default SendOffer;
