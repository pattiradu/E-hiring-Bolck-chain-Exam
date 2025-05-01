import React, { useState } from "react";
import { useContract } from "../utils/contract";

const VerifyCandidate = () => {
    const { getContract } = useContract();
    const [address, setAddress] = useState("");

    const verify = async () => {
        if (!address) {
            alert("Please enter the candidate's address.");
            return;
        }

        try {
            const contract = await getContract();
            const tx = await contract.verifyCandidate(address);
            await tx.wait();
            alert("Candidate verified successfully.");
            setAddress(""); // Reset address field
        } catch (err) {
            console.error(err);
            alert("Verification failed.");
        }
    };

    return (
        <div className="card shadow-sm p-4 mb-4">
            <h4 className="card-title text-primary mb-3">Verify Candidate</h4>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Candidate Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <button className="btn btn-info" onClick={verify}>
                Verify
            </button>
        </div>
    );
};

export default VerifyCandidate;
