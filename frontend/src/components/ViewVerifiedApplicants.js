import React, { useEffect, useState } from "react";
import { useContract } from "../utils/contract";

const ViewVerifiedApplicants = () => {
    const { getContract } = useContract();
    const [verified, setVerified] = useState([]);

    useEffect(() => {
        const fetchVerified = async () => {
            try {
                const contract = await getContract();
                const data = await contract.getVerifiedApplicants(); // Smart contract must expose this
                setVerified(data);
            } catch (err) {
                console.error("Error fetching verified applicants:", err);
            }
        };
        fetchVerified();
    }, [getContract]);

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Verified Applicants</h2>
            
            {verified.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {verified.map((applicant, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{applicant.name}</td>
                                    <td>{applicant.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No verified applicants available.</p>
            )}
        </div>
    );
};

export default ViewVerifiedApplicants;
