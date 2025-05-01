import React, { useEffect, useState } from "react";
import { useContract } from "../utils/contract";

const ViewJobs = () => {
    const { getContract } = useContract();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const contract = await getContract();
                const data = await contract.getAllJobs(); // Ensure this function exists in your smart contract
                setJobs(data);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };
        fetchJobs();
    }, [getContract]);

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Posted Jobs</h2>
            
            {jobs.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Job Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{job.title}</td>
                                    <td>{job.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No jobs available.</p>
            )}
        </div>
    );
};

export default ViewJobs;
