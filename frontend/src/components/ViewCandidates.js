import React, { useEffect, useState } from "react";
import { useContract } from "../utils/contract";

const ViewCandidates = () => {
    const { getContract } = useContract();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const contract = await getContract();
                const data = await contract.getAllCandidates(); // Ensure this function exists in your smart contract
                setCandidates(data);
            } catch (err) {
                console.error("Error fetching candidates:", err);
            }
        };
        fetchCandidates();
    }, [getContract]);

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Registered Candidates</h2>
            
            {candidates.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Education</th>
                                <th>Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.education}</td>
                                    <td>{candidate.experience}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No candidates available.</p>
            )}
        </div>
    );
};

export default ViewCandidates;
