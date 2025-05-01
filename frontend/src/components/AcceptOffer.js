import React from "react";
import { useContract } from "../utils/contract";

const AcceptOffer = () => {
    const { getContract } = useContract();

    const acceptOffer = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.acceptOffer();
            await tx.wait();
            alert("Offer accepted.");
        } catch (err) {
            console.error(err);
            alert("Failed to accept offer. Please try again.");
        }
    };

    return (
        <div className="card shadow-sm p-3 mb-4">
            <h4 className="card-title text-success">Accept Job Offer</h4>
            <p className="text-muted">Click the button below to accept your job offer.</p>
            <button className="btn btn-success" onClick={acceptOffer}>
                Accept Offer
            </button>
        </div>
    );
};

export default AcceptOffer;
