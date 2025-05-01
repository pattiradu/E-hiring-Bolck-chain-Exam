import React from "react";
import { useWeb3 } from "../context/Web3Context";

const ConnectWallet = () => {
    const { connectWallet, isConnected } = useWeb3();

    return (
        <div className="d-flex justify-content-end mb-3">
            <button
                className={`btn ${isConnected ? "btn-outline-success" : "btn-primary"}`}
                onClick={connectWallet}
                disabled={isConnected}
            >
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
            </button>
        </div>
    );
};

export default ConnectWallet;
