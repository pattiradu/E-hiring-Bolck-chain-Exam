import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers"; // ✅ Correct import for ethers v6

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const initProvider = async () => {
            if (window.ethereum) {
                try {
                    const ethProvider = new BrowserProvider(window.ethereum); // ✅ Correct usage
                    setProvider(ethProvider);
                } catch (error) {
                    console.error("Failed to initialize provider:", error);
                }
            } else {
                alert("Please install MetaMask.");
            }
        };
        initProvider();
    }, []);

    const connectWallet = async () => {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            setIsConnected(true);
        } catch (err) {
            console.error("Wallet connection failed:", err);
        }
    };

    return (
        <Web3Context.Provider value={{ provider, isConnected, connectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
