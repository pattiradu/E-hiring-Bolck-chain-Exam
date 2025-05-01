import React, { useEffect, useState } from "react";
import { useContract } from "../utils/contract";

const ViewOffers = () => {
    const { getContract } = useContract();
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const contract = await getContract();
                const data = await contract.getAllOffers(); // Smart contract must expose this
                setOffers(data);
            } catch (err) {
                console.error("Error fetching offers:", err);
            }
        };
        fetchOffers();
    }, [getContract]);

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Offers Provided</h2>
            
            {offers.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Candidate</th>
                                <th>Job ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map((offer, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{offer.candidate}</td>
                                    <td>{offer.jobId}</td>
                                    <td>{offer.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No offers available.</p>
            )}
        </div>
    );
};

export default ViewOffers;
