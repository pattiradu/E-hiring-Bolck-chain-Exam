// working files of my project


// import React, { useEffect, useState } from "react";
// import { useContract } from "../utils/contract";

// const ViewJobs = () => {
//     const { getContract } = useContract();
//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const contract = await getContract();
//                 const blockchainJobs = await contract.getAllJobs();

//                 // Get jobs from sessionStorage
//                 const sessionJobs = JSON.parse(sessionStorage.getItem("postedJobs")) || [];

//                 // Combine both
//                 const combinedJobs = [...blockchainJobs, ...sessionJobs];

//                 // Optional: remove duplicates
//                 const uniqueJobs = combinedJobs.filter(
//                     (job, index, self) =>
//                         index ===
//                         self.findIndex((j) => j.title === job.title && j.description === job.description)
//                 );

//                 setJobs(uniqueJobs);
//             } catch (err) {
//                 console.error("Error fetching jobs:", err);

//                 // Fallback to sessionStorage only
//                 const sessionJobs = JSON.parse(sessionStorage.getItem("postedJobs")) || [];
//                 setJobs(sessionJobs);
//             }
//         };

//         fetchJobs();
//     }, [getContract]);

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-primary mb-4">Posted Jobs</h2>

//             {jobs.length > 0 ? (
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>Job-ID</th>
//                                 <th>Job Title</th>
//                                 <th>Description</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {jobs.map((job, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{job.title}</td>
//                                     <td>{job.description}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center">No jobs available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewJobs;







// import React, { useEffect, useState } from "react";
// import { useContract } from "../utils/contract";

// const ViewJobs = () => {
//     const { getContract } = useContract();
//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const contract = await getContract();
//                 const data = await contract.getAllJobs(); // Ensure this function exists in your smart contract
//                 setJobs(data);
//             } catch (err) {
//                 console.error("Error fetching jobs:", err);
//             }
//         };
//         fetchJobs();
//     }, [getContract]);

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center text-primary mb-4">Posted Jobs</h2>
            
//             {jobs.length > 0 ? (
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Job Title</th>
//                                 <th>Description</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {jobs.map((job, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{job.title}</td>
//                                     <td>{job.description}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-center">No jobs available.</p>
//             )}
//         </div>
//     );
// };

// export default ViewJobs;





// testing file for the project



// components/JobsPosted.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractFile from "../utils/EHiringSystem.json";

const contractABI = contractFile.abi;
const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

const JobsPosted = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const jobIds = await contract.methods.getAllJobs().call();

        const jobData = await Promise.all(
          jobIds.map(async (jobId) => {
            const job = await contract.methods.jobs(jobId).call();
            return {
              id: job.jobId,
              title: job.title,
              description: job.description,
              postedBy: job.postedBy,
              isActive: job.isActive,
            };
          })
        );

        setJobs(jobData);
      }
    };

    loadJobs();
  }, []);

  return (
    <div>
      <h2>Jobs Posted</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong><br />
            {job.description}<br />
            Posted By: {job.postedBy}<br />
            Status: {job.isActive ? "Active" : "Inactive"}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsPosted;
